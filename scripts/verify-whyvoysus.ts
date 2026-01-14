/**
 * Verification Script: Check if "Why Join Voysus" data is being stored in Supabase
 *
 * This script:
 * 1. Fetches recent applications from Supabase
 * 2. Checks if whyVoysus field exists in the payload
 * 3. Displays the results for verification
 *
 * Run: npm run verify:whyvoysus
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyWhyVoysusData() {
  console.log('\n🔍 VERIFYING "WHY JOIN VOYSUS" DATA IN SUPABASE\n')
  console.log('=' .repeat(60))

  try {
    // Fetch recent applications
    const { data: applications, error } = await supabase
      .from('job_applications')
      .select('id, email, created_at, payload')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('❌ Error fetching applications:', error.message)
      return
    }

    if (!applications || applications.length === 0) {
      console.log('\n⚠️  No applications found in database')
      console.log('Submit a test application first to verify data flow.')
      return
    }

    console.log(`\n✅ Found ${applications.length} recent applications\n`)

    // Check each application for whyVoysus field
    let foundCount = 0
    let missingCount = 0

    applications.forEach((app, index) => {
      console.log(`\n[${index + 1}] Application ID: ${app.id}`)
      console.log(`    Email: ${app.email}`)
      console.log(`    Created: ${new Date(app.created_at).toLocaleString()}`)

      // Check if payload exists
      if (!app.payload) {
        console.log('    ❌ No payload found')
        missingCount++
        return
      }

      // Check if experience.whyVoysus exists
      const payload = app.payload as any
      const whyVoysus = payload?.experience?.whyVoysus

      if (whyVoysus) {
        foundCount++
        const wordCount = whyVoysus.trim().split(/\s+/).filter((w: string) => w.length > 0).length
        console.log(`    ✅ whyVoysus: FOUND (${wordCount} words)`)
        console.log(`    📝 Content: "${whyVoysus.substring(0, 100)}${whyVoysus.length > 100 ? '...' : ''}"`)
      } else {
        missingCount++
        console.log('    ❌ whyVoysus: MISSING')

        // Debug: Check what's in the experience object
        if (payload.experience) {
          console.log('    📋 Experience object keys:', Object.keys(payload.experience))
        } else {
          console.log('    ⚠️  No experience object in payload')
        }
      }
    })

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('\n📊 SUMMARY:')
    console.log(`   Total applications checked: ${applications.length}`)
    console.log(`   ✅ whyVoysus found: ${foundCount}`)
    console.log(`   ❌ whyVoysus missing: ${missingCount}`)

    if (missingCount > 0) {
      console.log('\n⚠️  ACTION REQUIRED:')
      console.log('   Some applications are missing "whyVoysus" data.')
      console.log('   Possible causes:')
      console.log('   1. Applications submitted before this field was added')
      console.log('   2. Form validation allowing empty submissions')
      console.log('   3. Store not updating properly on step 7')
      console.log('\n   Recommendations:')
      console.log('   1. Check lib/store/application-store.ts updateExperience()')
      console.log('   2. Verify step 7 form is calling updateExperience() with whyVoysus')
      console.log('   3. Check app/apply/page.tsx payload construction at line 137-139')
    } else {
      console.log('\n✅ All applications have "whyVoysus" data!')
    }

    console.log('\n' + '='.repeat(60) + '\n')

  } catch (error) {
    console.error('\n❌ Verification failed:', error)
  }
}

// Run verification
verifyWhyVoysusData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
