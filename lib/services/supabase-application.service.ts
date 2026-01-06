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
    // Validate payload exists
    if (!payload || !payload.personalDetails?.email) {
      throw new Error('Invalid application data')
    }

    // Extract email for duplicate prevention
    const email = payload.personalDetails.email

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
      // Duplicate email error (unique constraint violation)
      if (error.code === '23505') {
        return {
          success: false,
          message: 'An application with this email address has already been submitted.',
        }
      }

      // Other database errors
      console.error('❌ Supabase insert error:', error)
      throw new Error(error.message || 'Database error occurred')
    }

    // Success - generate reference number
    if (!data) {
      throw new Error('No data returned from insert')
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
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('❌ Network error:', error)
      return {
        success: false,
        message: 'Network error. Please check your internet connection and try again.',
      }
    }

    // Handle validation errors
    if (error instanceof Error && error.message.includes('Invalid')) {
      console.error('❌ Validation error:', error)
      return {
        success: false,
        message: 'Invalid data format. Please refresh the page and try again.',
      }
    }

    // Handle all other errors
    console.error('❌ Application submission error:', error)
    return {
      success: false,
      message: 'Submission failed. Please try again or contact support if the problem persists.',
    }
  }
}
