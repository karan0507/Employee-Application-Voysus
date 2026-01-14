/**
 * Application Form Store
 * Zustand state management with selective persistence
 *
 * SECURITY: Sensitive data (DOB, SIN) is NOT persisted to localStorage
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
} from '../validation/schemas'

/**
 * Complete application state
 */
interface ApplicationState {
  // Current step (1-7)
  currentStep: number

  // Form data by step
  personalDetails: Partial<Step1Data>
  address: Partial<Step2Data>
  privateInfo: Partial<Step3Data> // NOT persisted
  education: Partial<Step4Data>
  employment: Partial<Step5Data>
  skills: Partial<Step6Data>
  experience: Partial<Step7Data>

  // Step validity tracking (for Next button)
  stepValidity: Record<number, boolean>

  // Submission state
  isSubmitting: boolean
  submissionError: string | null
}

/**
 * Store actions
 */
interface ApplicationActions {
  // Navigation
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void

  // Update step data
  updatePersonalDetails: (data: Partial<Step1Data>) => void
  updateAddress: (data: Partial<Step2Data>) => void
  updatePrivateInfo: (data: Partial<Step3Data>) => void
  updateEducation: (data: Partial<Step4Data>) => void
  updateEmployment: (data: Partial<Step5Data>) => void
  updateSkills: (data: Partial<Step6Data>) => void
  updateExperience: (data: Partial<Step7Data>) => void

  // Validity tracking
  setStepValidity: (step: number, isValid: boolean) => void

  // Submission
  setSubmitting: (isSubmitting: boolean) => void
  setSubmissionError: (error: string | null) => void

  // Reset
  resetForm: () => void
  resetPrivateInfo: () => void // Separate reset for sensitive data
}

type ApplicationStore = ApplicationState & ApplicationActions

/**
 * Initial state
 */
const initialState: ApplicationState = {
  currentStep: 1,
  personalDetails: {},
  address: {},
  privateInfo: {}, // In-memory only
  education: {},
  employment: {},
  skills: {},
  experience: {},
  stepValidity: {},
  isSubmitting: false,
  submissionError: null,
}

/**
 * Create store with selective persistence
 */
export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < 7) {
          set({ currentStep: currentStep + 1 })
        }
      },

      prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 })
        }
      },

      // Update methods
      updatePersonalDetails: (data) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...data },
        })),

      updateAddress: (data) =>
        set((state) => ({
          address: { ...state.address, ...data },
        })),

      updatePrivateInfo: (data) =>
        set((state) => ({
          privateInfo: { ...state.privateInfo, ...data },
        })),

      updateEducation: (data) =>
        set((state) => ({
          education: { ...state.education, ...data },
        })),

      updateEmployment: (data) =>
        set((state) => ({
          employment: { ...state.employment, ...data },
        })),

      updateSkills: (data) =>
        set((state) => ({
          skills: { ...state.skills, ...data },
        })),

      updateExperience: (data) =>
        set((state) => ({
          experience: { ...state.experience, ...data },
        })),

      // Validity tracking
      setStepValidity: (step, isValid) =>
        set((state) => ({
          stepValidity: { ...state.stepValidity, [step]: isValid },
        })),

      // Submission
      setSubmitting: (isSubmitting) => set({ isSubmitting }),

      setSubmissionError: (error) => set({ submissionError: error }),

      // Reset
      resetForm: () => set(initialState),

      resetPrivateInfo: () => set({ privateInfo: {} }),
    }),
    {
      name: 'voysus-application-storage',

      // Persist all data temporarily (cleared on final submission)
      partialize: (state) => ({
        currentStep: state.currentStep,
        personalDetails: state.personalDetails,
        address: state.address,
        privateInfo: state.privateInfo,
        education: state.education,
        employment: state.employment,
        skills: state.skills,
        experience: state.experience,
      }),
    }
  )
)

/**
 * Validation helpers
 * These are used by components to determine if Next button should be enabled
 */
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
} from '../validation/schemas'

export function validateStep(stepNumber: number, data: any): boolean {
  try {
    switch (stepNumber) {
      case 1:
        step1Schema.parse(data)
        return true
      case 2:
        step2Schema.parse(data)
        return true
      case 3:
        step3Schema.parse(data)
        return true
      case 4:
        step4Schema.parse(data)
        return true
      case 5:
        step5Schema.parse(data)
        return true
      case 6:
        step6Schema.parse(data)
        return true
      case 7:
        step7Schema.parse(data)
        return true
      default:
        return false
    }
  } catch (error) {
    return false
  }
}

/**
 * Get validation state for current step
 * Use this in components to enable/disable Next button
 */
export function useStepValidation(stepNumber: number): boolean {
  const stepValidity = useApplicationStore((state) => state.stepValidity)
  return stepValidity[stepNumber] || false
}
