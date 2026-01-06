"use client"

import { useRouter } from "next/navigation"
import { useFormStore } from "@/lib/form-store"
import { FormHeader } from "@/components/form/form-header"
import { FormProgress } from "@/components/form/form-progress"
import { FormNavigation } from "@/components/form/form-navigation"
import { Step1Personal } from "@/components/form/steps/step1-personal"
import { Step2Address } from "@/components/form/steps/step2-address"
import { Step3Position } from "@/components/form/steps/step3-position"
import { Step4Education } from "@/components/form/steps/step4-education"
import { Step5Employment1 } from "@/components/form/steps/step5-employment1"
import { Step6Employment2 } from "@/components/form/steps/step6-employment2"
import { Step7Skills } from "@/components/form/steps/step7-skills"
import { Step8References } from "@/components/form/steps/step8-references"
import { Step9Additional } from "@/components/form/steps/step9-additional"
import { Step10Review } from "@/components/form/steps/step10-review"
import { useAntiCheat } from "@/hooks/use-anti-cheat"
import { useAutoSave } from "@/hooks/use-auto-save"
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

const TOTAL_STEPS = 10

export default function ApplyPage() {
  const router = useRouter()
  const { currentStep, formData, setCurrentStep, updateFormData, setLastSaved, resetForm } = useFormStore()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useAntiCheat()

  // Auto-save functionality
  useAutoSave(() => {
    setLastSaved(new Date().toISOString())
  })

  const handleSave = () => {
    setLastSaved(new Date().toISOString())
    toast.success("Progress saved successfully!")
    router.push("/")
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const confirmSubmit = async () => {
    setIsSubmitting(true)
    setShowConfirmation(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Application submitted successfully!", {
      description: "We'll review your application within 3-5 business days.",
    })

    console.log("Final application data:", formData)

    // Reset form and redirect
    resetForm()
    router.push("/application-success")
  }

  const handleStepComplete = (stepData: any) => {
    updateFormData(stepData)
    handleNext()
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
          {currentStep === 1 && <Step1Personal initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 2 && <Step2Address initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 3 && <Step3Position initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 4 && <Step4Education initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 5 && <Step5Employment1 initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 6 && <Step6Employment2 initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 7 && <Step7Skills initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 8 && <Step8References initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 9 && <Step9Additional initialData={formData} onComplete={handleStepComplete} />}
          {currentStep === 10 && (
            <Step10Review formData={formData} onComplete={handleStepComplete} onEditStep={handleEditStep} />
          )}
        </div>
      </main>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isValid={true}
      />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Final Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to submit your application to Voysus CE Inc? You won't be able to edit after submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit} disabled={isSubmitting} className="bg-accent-green">
              {isSubmitting ? "Submitting..." : "Yes, Submit Application"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
