/**
 * Application Service
 * Handles all API calls for the employment application
 * Ready for backend integration - just update API_BASE_URL
 */

// Backend API base URL (will be environment variable)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

/**
 * Application submission payload type
 * Matches backend API contract from BACKEND-PREPARATION.md
 */
export interface ApplicationPayload {
  personalDetails: {
    firstName: string
    middleName: string
    lastName: string
    email: string
    phone: string
    alternatePhone?: string
  }
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
  privateInfo: {
    dateOfBirth: string // YYYY-MM-DD
    sin?: string
    eligibleToWork: boolean
    criminalRecord: boolean
    referral?: string
  }
  education: {
    level: string
    fieldOfStudy: string
    institution: string
    graduationYear: number
  }
  employment: {
    companyName: string
    position: string
    startDate: string // YYYY-MM
    endDate?: string // YYYY-MM
    current: boolean
    reasonForLeaving: string
    jobDuties: string
    supervisorName?: string
    supervisorPhone?: string
    mayContact?: boolean
  }
  skills: string[] // Array of selected skill IDs
  experience: {
    whyVoysus: string
  }
}

/**
 * API Response types
 */
export interface ApplicationSubmitResponse {
  success: boolean
  applicationId?: string
  referenceNumber?: string
  message: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    field?: string
  }
}

/**
 * Submit application to backend
 * Currently returns mock data - ready for real API integration
 */
export async function submitApplication(
  data: ApplicationPayload
): Promise<ApplicationSubmitResponse> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await fetch(`${API_BASE_URL}/applications`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //
    // if (!response.ok) {
    //   throw new Error('Failed to submit application')
    // }
    //
    // return await response.json()

    // MOCK RESPONSE - Simulates successful submission
    console.log('📤 Application submitted (MOCK):', data)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock reference number
    const referenceNumber = `VYS-${Date.now().toString().slice(-8)}`

    return {
      success: true,
      applicationId: `app_${Date.now()}`,
      referenceNumber,
      message: 'Application submitted successfully',
    }
  } catch (error) {
    console.error('❌ Application submission error:', error)
    throw new Error('Failed to submit application. Please try again.')
  }
}

/**
 * Validate email uniqueness (for future use)
 * Checks if email is already in the system
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${API_BASE_URL}/applications/check-email`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // })
    // const data = await response.json()
    // return data.exists

    // MOCK: Always return false (email available)
    console.log('📧 Checking email (MOCK):', email)
    await new Promise(resolve => setTimeout(resolve, 500))
    return false
  } catch (error) {
    console.error('❌ Email check error:', error)
    return false
  }
}

/**
 * Get application status (for future use)
 * Allows applicants to check their application status
 */
export async function getApplicationStatus(
  referenceNumber: string
): Promise<{ status: string; message: string } | null> {
  try {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${API_BASE_URL}/applications/status/${referenceNumber}`)
    // return await response.json()

    // MOCK: Return pending status
    console.log('🔍 Checking status (MOCK):', referenceNumber)
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      status: 'pending',
      message: 'Your application is being reviewed by our team.',
    }
  } catch (error) {
    console.error('❌ Status check error:', error)
    return null
  }
}
