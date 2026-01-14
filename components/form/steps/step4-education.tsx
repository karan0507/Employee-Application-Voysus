"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step4Schema, type Step4Data } from "@/lib/validation/schemas"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"

interface Step4EducationProps {
  onComplete: () => void
}

const EDUCATION_LEVELS = [
  { value: "High School", label: "High School Diploma/GED" },
  { value: "Some College", label: "Some College" },
  { value: "Associate Degree", label: "Associate Degree" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "Doctorate", label: "Doctorate/PhD" },
  { value: "Trade Certificate", label: "Trade Certificate" },
  { value: "Other", label: "Other" },
]

export function Step4Education({ onComplete }: Step4EducationProps) {
  const { education, updateEducation, setStepValidity } = useApplicationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step4Data>({
    mode: "onChange",
    resolver: zodResolver(step4Schema),
    defaultValues: education,
  })

  const formValues = watch()

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(4, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const onSubmit = (data: Step4Data) => {
    updateEducation(data)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Education Background</h2>

      {/* Show validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.level && <li>Education Level: {errors.level.message}</li>}
            {errors.institution && <li>Institution: {errors.institution.message}</li>}
            {errors.fieldOfStudy && <li>Field of Study: {errors.fieldOfStudy.message}</li>}
            {errors.graduationYear && <li>Graduation Year: {errors.graduationYear.message}</li>}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        <FormSelect
          label="Highest Level of Education"
          required
          options={EDUCATION_LEVELS}
          {...register("level")}
          error={errors.level?.message}
        />

        <FormInput
          label="School/Institution Name"
          required
          {...register("institution")}
          error={errors.institution?.message}
          placeholder="e.g., University of Toronto"
          isValid={!!formValues.institution && !errors.institution}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Field of Study/Major"
            required
            {...register("fieldOfStudy")}
            error={errors.fieldOfStudy?.message}
            placeholder="e.g., Business Administration"
            isValid={!!formValues.fieldOfStudy && !errors.fieldOfStudy}
          />

          <FormInput
            label="Graduation Year"
            type="number"
            required
            {...register("graduationYear", { valueAsNumber: true })}
            error={errors.graduationYear?.message}
            placeholder="YYYY"
            isValid={!!formValues.graduationYear && !errors.graduationYear}
          />
        </div>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
