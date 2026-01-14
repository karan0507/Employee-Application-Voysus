/**
 * Check Policies Script
 * Queries the actual policies in the database
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

async function checkPolicies() {
  console.log('='.repeat(70))
  console.log('CHECKING RLS POLICIES IN DATABASE')
  console.log('='.repeat(70))
  console.log()

  // Check if RLS is enabled
  const { data: rlsData, error: rlsError } = await supabase
    .rpc('exec_sql', {
      sql: `
        SELECT tablename, rowsecurity
        FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'job_applications';
      `
    })

  if (rlsError) {
    console.log('⚠️  Cannot check RLS status via RPC (trying alternative method)')
  } else {
    console.log('RLS Status:', rlsData)
  }

  // Try to get table info
  const { data: tableInfo, error: tableError } = await supabase
    .from('job_applications')
    .select('id')
    .limit(0)

  if (tableError) {
    console.log('❌ Table access error:', tableError.message)
  } else {
    console.log('✅ Table exists and is accessible')
  }

  console.log()
  console.log('='.repeat(70))
  console.log('RECOMMENDATION')
  console.log('='.repeat(70))
  console.log()
  console.log('Please check in Supabase Dashboard:')
  console.log('1. Go to Authentication > Policies')
  console.log('2. Look for table "job_applications"')
  console.log('3. Check if these policies exist:')
  console.log('   - Allow anonymous insert')
  console.log('   - Deny anonymous read')
  console.log('   - Deny anonymous update')
  console.log('   - Deny anonymous delete')
  console.log()
  console.log('If policies are missing, run the SQL again in SQL Editor')
}

checkPolicies()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Fatal error:', err)
    process.exit(1)
  })
