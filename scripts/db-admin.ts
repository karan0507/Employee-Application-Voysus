/**
 * Database Admin Utility
 * CLI tool for managing job applications during testing
 *
 * USAGE:
 *   npm run db:list          - List all applications
 *   npm run db:view <id>     - View single application
 *   npm run db:delete <id>   - Delete single application
 *   npm run db:reset         - Delete ALL applications (CAREFUL!)
 *
 * SETUP:
 *   Add to package.json scripts:
 *   "db:list": "tsx scripts/db-admin.ts list",
 *   "db:view": "tsx scripts/db-admin.ts view",
 *   "db:delete": "tsx scripts/db-admin.ts delete",
 *   "db:reset": "tsx scripts/db-admin.ts reset"
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Missing environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

// Commands
async function listApplications() {
  console.log('📋 Fetching applications...\n')

  const { data, error, count } = await supabase
    .from('job_applications')
    .select('id, email, status, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  console.log(`Found ${count} application(s):\n`)

  data?.forEach((app, index) => {
    console.log(`${index + 1}. ${app.email}`)
    console.log(`   ID: ${app.id}`)
    console.log(`   Status: ${app.status}`)
    console.log(`   Submitted: ${new Date(app.created_at).toLocaleString()}`)
    console.log()
  })
}

async function viewApplication(id: string) {
  if (!id) {
    console.error('❌ Error: Application ID required')
    console.log('Usage: npm run db:view <id>')
    return
  }

  console.log(`🔍 Fetching application ${id}...\n`)

  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  if (!data) {
    console.log('❌ Application not found')
    return
  }

  console.log('✅ Application found:\n')
  console.log(JSON.stringify(data, null, 2))
}

async function deleteApplication(id: string) {
  if (!id) {
    console.error('❌ Error: Application ID required')
    console.log('Usage: npm run db:delete <id>')
    return
  }

  console.log(`🗑️  Deleting application ${id}...`)

  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  console.log('✅ Application deleted successfully')
}

async function resetDatabase() {
  console.log('⚠️  WARNING: This will delete ALL applications!')
  console.log('Press Ctrl+C to cancel...')

  // Wait 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000))

  console.log('🗑️  Deleting all applications...')

  const { error } = await supabase
    .from('job_applications')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  console.log('✅ Database reset successfully')
}

// Main
const command = process.argv[2]
const arg = process.argv[3]

async function main() {
  switch (command) {
    case 'list':
      await listApplications()
      break
    case 'view':
      await viewApplication(arg)
      break
    case 'delete':
      await deleteApplication(arg)
      break
    case 'reset':
      await resetDatabase()
      break
    default:
      console.log('Database Admin Utility')
      console.log('\nCommands:')
      console.log('  list          - List all applications')
      console.log('  view <id>     - View single application')
      console.log('  delete <id>   - Delete single application')
      console.log('  reset         - Delete ALL applications')
      console.log('\nUsage:')
      console.log('  npm run db:list')
      console.log('  npm run db:view <id>')
      console.log('  npm run db:delete <id>')
      console.log('  npm run db:reset')
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Fatal error:', err)
    process.exit(1)
  })
