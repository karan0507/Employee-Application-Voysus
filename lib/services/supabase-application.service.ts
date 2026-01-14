/**
 * Supabase Application Service
 * Handles job application submission to Supabase database
 */

import { supabase } from '../supabase/client'
import type { ApplicationPayload, ApplicationSubmitResponse } from './application.service'

/**
 * Submit application to Supabase
 * @param payload Application data from form
 * @returns Success response with reference number or error
 */
export async function submitApplicationToSupabase(
  payload: ApplicationPayload
): Promise<ApplicationSubmitResponse> {
  try {
    // Validate payload exists and has required fields
    if (!payload) {
      console.error('❌ Payload is null or undefined')
      throw new Error('Invalid application data')
    }

    if (!payload.personalDetails) {
      console.error('❌ Missing personalDetails in payload')
      throw new Error('Invalid application data')
    }

    if (!payload.personalDetails.email) {
      console.error('❌ Missing email in personalDetails')
      throw new Error('Invalid application data')
    }

    // Extract email for duplicate prevention
    const email = payload.personalDetails.email.trim()

    // Insert application into database
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        payload: payload,
        email: email,
        status: 'submitted',
        source: 'web',
        version: 'v1.0',
      })
      .select('id, created_at')
      .single()

    // Handle database errors
    if (error) {
      // Log all error details for debugging
      console.error('❌ Supabase insert error')
      console.error('Error Code:', error.code || 'N/A')
      console.error('Error Message:', error.message || 'N/A')
      console.error('Error Details:', error.details || 'N/A')
      console.error('Error Hint:', error.hint || 'N/A')

      try {
        console.error('Full Error:', JSON.stringify(error, null, 2))
      } catch (stringifyError) {
        console.error('Could not stringify error object')
      }

      // Duplicate email error (unique constraint violation)
      if (error.code === '23505') {
        return {
          success: false,
          message: 'An application with this email address has already been submitted. Please contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
        }
      }

      // RLS policy error (database not configured correctly)
      if (error.code === '42501') {
        return {
          success: false,
          message: 'Database configuration error. Please contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
        }
      }

      // Foreign key violation
      if (error.code === '23503') {
        return {
          success: false,
          message: 'Database reference error. Please contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
        }
      }

      // Check constraint violation
      if (error.code === '23514') {
        return {
          success: false,
          message: 'Invalid data format. Please contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
        }
      }

      // Connection/timeout errors
      if (error.code === 'PGRST301' || error.code === 'PGRST504') {
        return {
          success: false,
          message: 'Database connection timeout. Please try again. If the problem persists, contact HR at (416) 291-0224 or hr@voysus.com.',
        }
      }

      // Generic database error
      return {
        success: false,
        message: 'Database error occurred. Please contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
      }
    }

    // Validate response data
    if (!data) {
      console.error('❌ No data returned from insert')
      throw new Error('No data returned from insert')
    }

    if (!data.id) {
      console.error('❌ No ID in response data:', data)
      throw new Error('Invalid response from database')
    }

    if (!data.created_at) {
      console.error('❌ No created_at in response data:', data)
      throw new Error('Invalid response from database')
    }

    // Validate ID format (should be UUID)
    if (typeof data.id !== 'string' || data.id.length < 8) {
      console.error('❌ Invalid ID format:', data.id)
      throw new Error('Invalid ID returned from database')
    }

    // Generate reference number from ID
    const refNumber = `VYS-${data.id.slice(0, 8).toUpperCase()}`

    console.log('✅ Application submitted successfully:', {
      id: data.id,
      email: email,
      referenceNumber: refNumber,
      timestamp: data.created_at,
    })

    return {
      success: true,
      applicationId: data.id,
      referenceNumber: refNumber,
      message: 'Application submitted successfully',
    }
  } catch (error) {
    // Log error details
    console.error('❌ Application submission error')

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Error Type: Network/Fetch Error')
      console.error('Error Message:', error.message)
      console.error('Stack:', error.stack)
      return {
        success: false,
        message: 'Network error. Please check your internet connection and try again. If the problem persists, contact HR at (416) 291-0224 or hr@voysus.com.',
      }
    }

    // Handle validation errors
    if (error instanceof Error && error.message.includes('Invalid')) {
      console.error('Error Type: Validation Error')
      console.error('Error Message:', error.message)
      console.error('Stack:', error.stack)
      return {
        success: false,
        message: 'Invalid data format. Please refresh the page and try again. If the problem persists, contact HR at (416) 291-0224 or hr@voysus.com.',
      }
    }

    // Handle database errors that throw
    if (error instanceof Error && error.message.includes('Database')) {
      console.error('Error Type: Database Error')
      console.error('Error Message:', error.message)
      console.error('Stack:', error.stack)
      return {
        success: false,
        message: error.message,
      }
    }

    // Handle unknown error types
    if (error instanceof Error) {
      console.error('Error Type: Unknown Error')
      console.error('Error Message:', error.message)
      console.error('Error Name:', error.name)
      console.error('Stack:', error.stack)
    } else {
      console.error('Error Type: Non-Error object thrown')
      console.error('Error Value:', error)
    }

    // Handle all other errors
    return {
      success: false,
      message: 'Submission failed. Please try again. If the problem persists, contact HR at (416) 291-0224 or hr@voysus.com for assistance.',
    }
  }
}
