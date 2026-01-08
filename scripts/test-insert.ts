/**
 * Test Script - Diagnose Supabase Insert Error
 * Tests database connection and insert operation
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('🔍 Test Configuration:')
console.log('URL:', supabaseUrl)
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING')
console.log()

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

// Create client (same as frontend)
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Test payload (matches ApplicationPayload structure)
const testPayload = {
  personalDetails: {
    firstName: 'Test',
    middleName: 'Debug',
    lastName: 'User',
    email: `test-${Date.now()}@voysus.com`,
    phone: '4162910224',
  },
  address: {
    street: '123 Test St',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M1M1M1',
  },
  privateInfo: {
    dateOfBirth: '1990-01-01',
    eligibleToWork: true,
    criminalRecord: false,
  },
  education: {
    level: 'Bachelor',
    fieldOfStudy: 'Computer Science',
    institution: 'Test University',
    graduationYear: 2020,
  },
  employment: {
    companyName: 'Test Corp',
    position: 'Developer',
    startDate: '2020-01',
    current: true,
    reasonForLeaving: 'N/A',
    jobDuties: 'Testing',
  },
  skills: ['javascript', 'typescript'],
  experience: {
    whyVoysus: 'Testing the application system',
  },
}

async function testDatabaseConnection() {
  console.log('📡 Testing database connection...')

  try {
    // Test 1: Check if table exists (will fail if RLS blocks, but that's expected)
    const { error: selectError } = await supabase
      .from('job_applications')
      .select('id')
      .limit(1)

    if (selectError) {
      console.log('⚠️  SELECT blocked (expected due to RLS):', selectError.message)
    } else {
      console.log('✅ SELECT works (unexpected - RLS should block this)')
    }
  } catch (err) {
    console.error('❌ Connection test error:', err)
  }

  console.log()
}

async function testInsert() {
  console.log('📝 Testing INSERT operation...')
  console.log('Email:', testPayload.personalDetails.email)
  console.log()

  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        payload: testPayload,
        email: testPayload.personalDetails.email,
        status: 'submitted',
        source: 'web',
        version: 'v1.0',
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('❌ INSERT ERROR DETAILS:')
      console.error('Error object type:', typeof error)
      console.error('Error constructor:', error.constructor.name)
      console.error('Error keys:', Object.keys(error))
      console.error()
      console.error('Full error object:')
      console.error(JSON.stringify(error, null, 2))
      console.error()
      console.error('Error properties:')
      console.error('- message:', error.message)
      console.error('- code:', error.code)
      console.error('- details:', error.details)
      console.error('- hint:', error.hint)
      console.error()

      // Test if it's a PostgrestError
      if ('code' in error) {
        console.error('PostgrestError detected')
        console.error('Code:', error.code)
      }

      return false
    }

    if (data) {
      console.log('✅ INSERT successful!')
      console.log('ID:', data.id)
      console.log('Created:', data.created_at)
      console.log()
      console.log('🧹 Cleanup: You can delete this test record with:')
      console.log(`npm run db:delete ${data.id}`)
      return true
    } else {
      console.error('❌ No data returned from insert')
      return false
    }
  } catch (err) {
    console.error('❌ Caught exception:', err)
    if (err instanceof Error) {
      console.error('Exception message:', err.message)
      console.error('Exception stack:', err.stack)
    }
    return false
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('SUPABASE INSERT DIAGNOSTIC TEST')
  console.log('='.repeat(60))
  console.log()

  await testDatabaseConnection()
  const success = await testInsert()

  console.log()
  console.log('='.repeat(60))
  console.log(success ? '✅ TEST PASSED' : '❌ TEST FAILED')
  console.log('='.repeat(60))

  process.exit(success ? 0 : 1)
}

main()
