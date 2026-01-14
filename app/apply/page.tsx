"use client"

import { useRouter } from "next/navigation"
import { useApplicationStore, useStepValidation } from "@/lib/store/application-store"
import { submitApplication, type ApplicationPayload } from "@/lib/services/application.service"
import { FormHeader } from "@/components/form/form-header"
import { FormProgress } from "@/components/form/form-progress"
import { FormNavigation } from "@/components/form/form-navigation"
import { Step1Personal } from "@/components/form/steps/step1-personal"
import { Step2Address } from "@/components/form/steps/step2-address"
import { Step3Private } from "@/components/form/steps/step3-private"
import { Step4Education } from "@/components/form/steps/step4-education"
import { Step5Employment } from "@/components/form/steps/step5-employment"
import { Step6Skills } from "@/components/form/steps/step6-skills"
import { Step7Experience } from "@/components/form/steps/step7-experience"
import { toast } from "sonner"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const TOTAL_STEPS = 7

export default function ApplyPage() {
  const router = useRouter()
  const {
    currentStep,
    nextStep,
    prevStep,
    setCurrentStep,
    personalDetails,
    address,
    privateInfo,
    education,
    employment,
    skills,
    experience,
    isSubmitting,
    setSubmitting,
    setSubmissionError,
    resetForm,
    resetPrivateInfo,
  } = useApplicationStore()

  const [showConfirmation, setShowConfirmation] = useState(false)

  // Get validation state for current step
  const isCurrentStepValid = useStepValidation(currentStep)

  const handleSave = () => {
    toast.success("Progress saved!")
    router.push("/")
  }

  const handlePrevious = () => {
    prevStep()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNext = () => {
    // Trigger form submission to save data before advancing
    const form = document.querySelector('form')
    if (form) {
      form.requestSubmit()
    }
  }

  const handleStepComplete = () => {
    nextStep()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = () => {
    // Final validation check before showing confirmation
    if (!isCurrentStepValid) {
      toast.error("Please complete all required fields correctly")
      return
    }
    setShowConfirmation(true)
  }

  const confirmSubmit = async () => {
    setShowConfirmation(false)
    setSubmitting(true)
    setSubmissionError(null)

    try {
      // Prepare payload matching backend API contract
      const payload: ApplicationPayload = {
        personalDetails: {
          firstName: personalDetails.firstName || "",
          middleName: personalDetails.middleName || "",
          lastName: personalDetails.lastName || "",
          email: personalDetails.email || "",
          phone: personalDetails.phone || "",
          alternatePhone: personalDetails.alternatePhone,
        },
        address: {
          street: address.street || "",
          city: address.city || "",
          province: address.province || "",
          postalCode: address.postalCode || "",
        },
        privateInfo: {
          dateOfBirth: privateInfo.dateOfBirth || "",
          sin: privateInfo.sin || "",
          eligibleToWork: privateInfo.eligibleToWork === "yes",
          criminalRecord: privateInfo.criminalRecord === "yes",
          referral: privateInfo.referral,
        },
        education: {
          level: education.level || "",
          fieldOfStudy: education.fieldOfStudy || "",
          institution: education.institution || "",
          graduationYear: education.graduationYear || 0,
        },
        employment: {
          companyName: employment.companyName || "",
          position: employment.position || "",
          startDate: employment.startDate || "",
          endDate: employment.endDate,
          current: employment.current || false,
          reasonForLeaving: employment.reasonForLeaving || "",
          jobDuties: employment.jobDuties || "",
          supervisorName: employment.supervisorName,
          supervisorPhone: employment.supervisorPhone,
          mayContact: employment.mayContact === "yes",
        },
        skills: skills.skills || [],
        experience: {
          whyVoysus: experience.whyVoysus || "",
        },
      }

      // Console log final payload
      console.log("Final Application Payload:", payload)

      // Submit to backend (Supabase)
      const result = await submitApplication(payload)

      if (result.success) {
        toast.success("Application submitted successfully!", {
          description: "We'll review your application within 3-5 business days.",
        })

        // Clear form data (including sensitive info)
        resetForm()
        resetPrivateInfo()

        // Navigate to success page with reference number
        router.push(`/application-success?ref=${result.referenceNumber}`)
      } else {
        // Handle specific error from backend
        const errorMsg = result.message || "Submission failed. Please try again."
        setSubmissionError(errorMsg)
        toast.error("Submission failed", {
          description: errorMsg,
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      const errorMsg = error instanceof Error ? error.message : "Failed to submit application. Please try again."
      setSubmissionError(errorMsg)
      toast.error("Submission failed", {
        description: errorMsg,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <FormHeader onSave={handleSave} />
      <FormProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm lg:p-8">
          {currentStep === 1 && <Step1Personal onComplete={handleStepComplete} />}
          {currentStep === 2 && <Step2Address onComplete={handleStepComplete} />}
          {currentStep === 3 && <Step3Private onComplete={handleStepComplete} />}
          {currentStep === 4 && <Step4Education onComplete={handleStepComplete} />}
          {currentStep === 5 && <Step5Employment onComplete={handleStepComplete} />}
          {currentStep === 6 && <Step6Skills onComplete={handleStepComplete} />}
          {currentStep === 7 && <Step7Experience onComplete={handleStepComplete} />}
        </div>
      </main>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isValid={isCurrentStepValid}
      />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to submit your application to Voysus CE Inc?
              Please review your information carefully before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Review Again</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSubmit}
              disabled={isSubmitting}
              className="bg-accent-green hover:bg-accent-green-dark"
            >
              {isSubmitting ? "Submitting..." : "Yes, Submit Application"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
