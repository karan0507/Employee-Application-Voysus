import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ApplicationFormData {
  // Step 1: Personal Information
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  alternatePhone: string
  dateOfBirth: string
  sin: string

  // Step 2: Address
  streetAddress: string
  city: string
  province: string
  postalCode: string
  howLongAtAddress: string
  previousAddress: string

  // Step 3: Position Details
  positionApplying: string
  availableStartDate: string
  desiredSalary: string
  employmentType: string
  willingToRelocate: string

  // Step 4: Education
  highestEducation: string
  schoolName: string
  fieldOfStudy: string
  graduationYear: string
  additionalCertifications: string

  // Step 5: Employment History 1
  currentlyEmployed: string
  employer1Name: string
  employer1Position: string
  employer1StartDate: string
  employer1EndDate: string
  employer1Responsibilities: string
  employer1Supervisor: string
  employer1Phone: string
  employer1ReasonForLeaving: string

  // Step 6: Employment History 2
  employer2Name: string
  employer2Position: string
  employer2StartDate: string
  employer2EndDate: string
  employer2Responsibilities: string
  employer2Supervisor: string
  employer2Phone: string
  employer2ReasonForLeaving: string

  // Step 7: Skills & Qualifications
  technicalSkills: string[]
  softSkills: string[]
  languages: string[]
  certifications: string[]
  driverLicense: string
  vehicleAccess: string

  // Step 8: References
  reference1Name: string
  reference1Relationship: string
  reference1Phone: string
  reference1Email: string
  reference2Name: string
  reference2Relationship: string
  reference2Phone: string
  reference2Email: string
  reference3Name: string
  reference3Relationship: string
  reference3Phone: string
  reference3Email: string

  // Step 9: Additional Information
  eligibleToWorkInCanada: string
  requireWorkPermit: string
  criminalRecord: string
  criminalRecordDetails: string
  physicalLimitations: string
  physicalLimitationsDetails: string
  howDidYouHear: string

  // Step 10: Agreements & Signature
  termsAgreed: boolean
  accuracyAgreed: boolean
  backgroundCheckAgreed: boolean
  signature: string
  signatureDate: string
}

interface FormStore {
  currentStep: number
  formData: Partial<ApplicationFormData>
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<ApplicationFormData>) => void
  resetForm: () => void
  lastSaved: string | null
  setLastSaved: (timestamp: string) => void
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      lastSaved: null,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () => set({ currentStep: 1, formData: {}, lastSaved: null }),
      setLastSaved: (timestamp) => set({ lastSaved: timestamp }),
    }),
    {
      name: "voysus-application-storage",
    },
  ),
)
