"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isValid: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isValid,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="sticky bottom-0 z-40 border-t bg-white shadow-lg">
      <div className="container mx-auto max-w-3xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {!isFirstStep ? (
            <Button variant="outline" onClick={onPrevious} className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <Button onClick={onSubmit} disabled={!isValid} className="gap-2 bg-accent-green hover:bg-accent-green-dark">
              Submit Application
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onNext} disabled={!isValid} className="gap-2 bg-primary hover:bg-primary-700">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
