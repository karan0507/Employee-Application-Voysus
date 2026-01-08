/**
 * Admin API: Single Application
 * View and delete individual applications
 *
 * SECURITY: Requires service_role key
 */

import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Service role client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL not set')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!serviceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set')
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

/**
 * GET /api/admin/applications/[id]
 * Get single application with full payload
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID parameter
    if (!id) {
      console.error('❌ Missing ID parameter')
      return NextResponse.json(
        { error: 'Missing application ID' },
        { status: 400 }
      )
    }

    if (typeof id !== 'string' || id.length < 8) {
      console.error('❌ Invalid ID format:', id)
      return NextResponse.json(
        { error: 'Invalid application ID format' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('job_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      // Not found error
      if (error.code === 'PGRST116') {
        console.log(`⚠️  Application not found: ${id}`)
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        )
      }

      // Other database errors
      console.error('❌ Admin API database error')
      console.error('Error Code:', error.code || 'N/A')
      console.error('Error Message:', error.message || 'N/A')
      console.error('Error Details:', error.details || 'N/A')
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      )
    }

    // Validate response data
    if (!data) {
      console.error('❌ No data returned for ID:', id)
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Admin API unexpected error')
    if (error instanceof Error) {
      console.error('Error Message:', error.message)
      console.error('Error Stack:', error.stack)
    } else {
      console.error('Error Value:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/applications/[id]
 * Delete single application
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID parameter
    if (!id) {
      console.error('❌ Missing ID parameter')
      return NextResponse.json(
        { error: 'Missing application ID' },
        { status: 400 }
      )
    }

    if (typeof id !== 'string' || id.length < 8) {
      console.error('❌ Invalid ID format:', id)
      return NextResponse.json(
        { error: 'Invalid application ID format' },
        { status: 400 }
      )
    }

    console.log(`⚠️  DELETE application requested: ${id}`)

    const { data, error, count } = await supabaseAdmin
      .from('job_applications')
      .delete({ count: 'exact' })
      .eq('id', id)

    if (error) {
      console.error('❌ Admin API delete error')
      console.error('Error Code:', error.code || 'N/A')
      console.error('Error Message:', error.message || 'N/A')
      console.error('Error Details:', error.details || 'N/A')
      return NextResponse.json(
        { error: 'Failed to delete application' },
        { status: 500 }
      )
    }

    // Check if any rows were deleted
    if (count === 0) {
      console.log(`⚠️  Application not found for deletion: ${id}`)
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    console.log(`✅ Deleted application: ${id}`)
    return NextResponse.json({
      message: 'Application deleted',
      id: id,
    })
  } catch (error) {
    console.error('❌ Admin API unexpected error')
    if (error instanceof Error) {
      console.error('Error Message:', error.message)
      console.error('Error Stack:', error.stack)
    } else {
      console.error('Error Value:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
