/**
 * Test RLS Policies with Actual Data
 * Inserts test data using service role, then tests anon access
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const adminClient = createClient(supabaseUrl, serviceRoleKey)
const anonClient = createClient(supabaseUrl, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

async function main() {
  console.log('='.repeat(70))
  console.log('RLS POLICY TEST WITH DATA')
  console.log('='.repeat(70))
  console.log()

  // Step 1: Insert test record using admin (bypasses RLS)
  console.log('📝 Step 1: Inserting test record using admin client...')
  const testEmail = `test-rls-${Date.now()}@voysus.com`
  const { data: insertData, error: insertError } = await adminClient
    .from('job_applications')
    .insert({
      payload: { test: true },
      email: testEmail,
      status: 'submitted',
      source: 'test',
      version: 'v1.0',
    })
    .select('id')
    .single()

  if (insertError) {
    console.error('❌ Failed to insert test record:', insertError.message)
    process.exit(1)
  }

  console.log(`✅ Test record inserted: ${insertData.id}`)
  console.log()

  // Step 2: Try to SELECT using anon client (should be blocked)
  console.log('🔍 Step 2: Testing SELECT with anon client (should be BLOCKED)...')
  const { data: selectData, error: selectError } = await anonClient
    .from('job_applications')
    .select('id')
    .eq('id', insertData.id)
    .single()

  if (selectError) {
    if (selectError.code === 'PGRST116') {
      console.log('✅ SELECT blocked by RLS (correct - returns not found)')
    } else if (selectError.code === '42501') {
      console.log('✅ SELECT blocked by RLS (correct - policy violation)')
    } else {
      console.log('⚠️  SELECT error:', selectError.message, selectError.code)
    }
  } else {
    console.log('❌ SELECT allowed - RLS POLICY NOT WORKING!')
    console.log('   Data returned:', selectData)
  }
  console.log()

  // Step 3: Try to INSERT using anon client (should be allowed)
  console.log('📝 Step 3: Testing INSERT with anon client (should be ALLOWED)...')
  const insertEmail = `test-insert-${Date.now()}@voysus.com`
  const { data: anonInsertData, error: anonInsertError } = await anonClient
    .from('job_applications')
    .insert({
      payload: { test: true },
      email: insertEmail,
      status: 'submitted',
      source: 'test',
      version: 'v1.0',
    })
    .select('id')
    .single()

  if (anonInsertError) {
    console.log('❌ INSERT blocked - RLS POLICY NOT WORKING!')
    console.log('   Error:', anonInsertError.message)
    console.log('   Code:', anonInsertError.code)
  } else {
    console.log('✅ INSERT allowed (correct)')
    console.log('   ID:', anonInsertData.id)
  }
  console.log()

  // Cleanup: Delete test records
  console.log('🧹 Cleanup: Deleting test records...')
  await adminClient.from('job_applications').delete().eq('id', insertData.id)
  if (anonInsertData) {
    await adminClient.from('job_applications').delete().eq('id', anonInsertData.id)
  }
  console.log('✅ Cleanup complete')
  console.log()

  // Summary
  console.log('='.repeat(70))
  const selectOk = selectError !== null
  const insertOk = anonInsertError === null

  if (selectOk && insertOk) {
    console.log('✅ RLS POLICIES WORKING CORRECTLY')
    console.log('='.repeat(70))
    process.exit(0)
  } else {
    console.log('❌ RLS POLICIES NOT CONFIGURED CORRECTLY')
    console.log('='.repeat(70))
    console.log()
    if (!selectOk) {
      console.log('Issue: SELECT should be blocked but is allowed')
    }
    if (!insertOk) {
      console.log('Issue: INSERT should be allowed but is blocked')
    }
    process.exit(1)
  }
}

main()
