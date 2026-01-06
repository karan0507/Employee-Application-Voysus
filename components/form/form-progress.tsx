interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className="sticky top-16 z-40 bg-white shadow-sm">
      <div className="container mx-auto max-w-3xl px-4 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-primary-600">{Math.round(percentage)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-neutral-600">
          {currentStep === 1 && "Personal Information"}
          {currentStep === 2 && "Address Details"}
          {currentStep === 3 && "Position & Availability"}
          {currentStep === 4 && "Education Background"}
          {currentStep === 5 && "Employment History (Current)"}
          {currentStep === 6 && "Employment History (Previous)"}
          {currentStep === 7 && "Skills & Qualifications"}
          {currentStep === 8 && "References"}
          {currentStep === 9 && "Additional Information"}
          {currentStep === 10 && "Review & Submit"}
        </div>
      </div>
    </div>
  )
}
