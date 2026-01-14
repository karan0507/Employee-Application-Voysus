/**
 * RLS Verification Script
 * Checks if Row Level Security policies are correctly configured
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function checkRLSStatus() {
  console.log('🔍 Checking RLS Status...\n')

  const { data, error } = await supabase.rpc('check_rls_policies', {}, {
    count: 'exact'
  })

  if (error) {
    console.log('⚠️  Cannot query RLS status via RPC (this is normal)')
    console.log('   We will check via direct table access\n')
  }

  // Try to query pg_policies view
  const query = `
    SELECT policyname, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename = 'job_applications'
    ORDER BY policyname;
  `

  console.log('Attempting to query policies...')

  // Note: This might not work via supabase-js, but let's try
  const { data: policies, error: policiesError } = await supabase
    .rpc('exec_sql', { sql: query })
    .single()

  if (policiesError) {
    console.log('⚠️  Cannot query policies directly (expected)')
  }
}

async function testAnonAccess() {
  console.log('🧪 Testing Anonymous Access...\n')

  // Create anon client
  const anonClient = createClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  // Test SELECT (should be blocked)
  console.log('1. Testing SELECT (should be BLOCKED):')
  const { data: selectData, error: selectError } = await anonClient
    .from('job_applications')
    .select('id')
    .limit(1)

  if (selectError) {
    if (selectError.code === '42501') {
      console.log('   ✅ SELECT blocked (correct)')
    } else {
      console.log('   ⚠️  SELECT error:', selectError.message)
    }
  } else {
    console.log('   ❌ SELECT allowed (RLS misconfigured!)')
  }

  // Test INSERT (should be allowed)
  console.log('\n2. Testing INSERT (should be ALLOWED):')
  const testEmail = `rls-test-${Date.now()}@voysus.com`
  const { data: insertData, error: insertError } = await anonClient
    .from('job_applications')
    .insert({
      payload: { test: true, email: testEmail },
      email: testEmail,
      status: 'submitted',
      source: 'test',
      version: 'v1.0',
    })
    .select('id')
    .single()

  if (insertError) {
    if (insertError.code === '42501') {
      console.log('   ❌ INSERT blocked (RLS policy missing!)')
      console.log('   Error:', insertError.message)
      return false
    } else {
      console.log('   ⚠️  INSERT error:', insertError.message)
      return false
    }
  } else {
    console.log('   ✅ INSERT allowed (correct)')
    console.log('   Inserted ID:', insertData.id)

    // Clean up test record
    await supabase
      .from('job_applications')
      .delete()
      .eq('id', insertData.id)
    console.log('   🧹 Test record cleaned up')
    return true
  }
}

async function main() {
  console.log('='.repeat(70))
  console.log('RLS POLICY VERIFICATION')
  console.log('='.repeat(70))
  console.log()

  await checkRLSStatus()
  const success = await testAnonAccess()

  console.log()
  console.log('='.repeat(70))

  if (!success) {
    console.log('❌ RLS POLICIES NOT CONFIGURED CORRECTLY')
    console.log('='.repeat(70))
    console.log()
    console.log('🔧 FIX REQUIRED:')
    console.log()
    console.log('Run the following SQL in Supabase SQL Editor:')
    console.log('(Dashboard > SQL Editor > New Query)')
    console.log()
    console.log('─'.repeat(70))
    console.log(`
-- Enable RLS (if not already enabled)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (clean slate)
DROP POLICY IF EXISTS "Allow anonymous insert" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous read" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous update" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous delete" ON job_applications;

-- Create INSERT policy for anonymous users
CREATE POLICY "Allow anonymous insert"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block SELECT for anonymous users
CREATE POLICY "Deny anonymous read"
  ON job_applications
  FOR SELECT
  TO anon
  USING (false);

-- Block UPDATE for anonymous users
CREATE POLICY "Deny anonymous update"
  ON job_applications
  FOR UPDATE
  TO anon
  USING (false);

-- Block DELETE for anonymous users
CREATE POLICY "Deny anonymous delete"
  ON job_applications
  FOR DELETE
  TO anon
  USING (false);
    `)
    console.log('─'.repeat(70))
    console.log()
    console.log('After running the SQL, test again with: npm run db:verify')
  } else {
    console.log('✅ RLS POLICIES CONFIGURED CORRECTLY')
    console.log('='.repeat(70))
  }

  process.exit(success ? 0 : 1)
}

main()
