/**
 * Admin API: Job Applications
 * Protected endpoints for viewing and managing applications
 *
 * SECURITY: Requires service_role key (NOT accessible from frontend)
 */

import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Service role client (full access)
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
 * GET /api/admin/applications
 * List all applications with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageParam = searchParams.get('page') || '1'
    const limitParam = searchParams.get('limit') || '50'
    const status = searchParams.get('status')

    // Validate pagination parameters
    const page = parseInt(pageParam)
    const limit = parseInt(limitParam)

    if (isNaN(page) || page < 1) {
      console.error('❌ Invalid page parameter:', pageParam)
      return NextResponse.json(
        { error: 'Invalid page parameter' },
        { status: 400 }
      )
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      console.error('❌ Invalid limit parameter:', limitParam)
      return NextResponse.json(
        { error: 'Invalid limit parameter (must be 1-100)' },
        { status: 400 }
      )
    }

    const offset = (page - 1) * limit

    // Build query
    let query = supabaseAdmin
      .from('job_applications')
      .select('id, email, status, created_at, version', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by status if provided
    if (status) {
      const validStatuses = ['submitted', 'reviewing', 'approved', 'rejected']
      if (!validStatuses.includes(status)) {
        console.error('❌ Invalid status filter:', status)
        return NextResponse.json(
          { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        )
      }
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('❌ Admin API database error')
      console.error('Error Code:', error.code || 'N/A')
      console.error('Error Message:', error.message || 'N/A')
      console.error('Error Details:', error.details || 'N/A')
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    // Validate response data
    if (!Array.isArray(data)) {
      console.error('❌ Invalid response data type:', typeof data)
      return NextResponse.json(
        { error: 'Invalid response from database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      applications: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
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

/**
 * DELETE /api/admin/applications?action=reset
 * Delete all applications (TESTING ONLY)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (!action) {
      console.error('❌ Missing action parameter')
      return NextResponse.json(
        { error: 'Missing action parameter. Use ?action=reset' },
        { status: 400 }
      )
    }

    if (action === 'reset') {
      console.log('⚠️  DELETE all applications requested')

      // Delete all applications
      const { data, error, count } = await supabaseAdmin
        .from('job_applications')
        .delete({ count: 'exact' })
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

      if (error) {
        console.error('❌ Admin API delete error')
        console.error('Error Code:', error.code || 'N/A')
        console.error('Error Message:', error.message || 'N/A')
        console.error('Error Details:', error.details || 'N/A')
        return NextResponse.json(
          { error: 'Failed to reset database' },
          { status: 500 }
        )
      }

      console.log('✅ Database reset successful, deleted count:', count || 0)
      return NextResponse.json({
        message: 'All applications deleted',
        count: count || 0,
      })
    }

    console.error('❌ Invalid action:', action)
    return NextResponse.json(
      { error: 'Invalid action. Use ?action=reset' },
      { status: 400 }
    )
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
