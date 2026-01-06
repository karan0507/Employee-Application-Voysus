"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"
import { FormTextarea } from "../form-textarea"

interface Step4Data {
  highestEducation: string
  schoolName: string
  fieldOfStudy: string
  graduationYear: string
  additionalCertifications: string
}

interface Step4EducationProps {
  initialData?: Partial<Step4Data>
  onComplete: (data: Step4Data) => void
}

const educationLevels = [
  { value: "high-school", label: "High School Diploma/GED" },
  { value: "college", label: "College Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate/PhD" },
  { value: "trade", label: "Trade Certification" },
  { value: "other", label: "Other" },
]

export function Step4Education({ initialData, onComplete }: Step4EducationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step4Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Education Background</h2>
        <p className="text-neutral-600">Share your educational qualifications</p>
      </div>

      <div className="space-y-6">
        <FormSelect
          label="Highest Level of Education"
          required
          options={educationLevels}
          {...register("highestEducation", {
            required: "Please select education level",
          })}
          error={errors.highestEducation?.message}
        />

        <FormInput
          label="School/Institution Name"
          required
          {...register("schoolName", {
            required: "School name is required",
          })}
          error={errors.schoolName?.message}
          isValid={!!formValues.schoolName && !errors.schoolName}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Field of Study/Major"
            required
            {...register("fieldOfStudy", {
              required: "Field of study is required",
            })}
            error={errors.fieldOfStudy?.message}
            placeholder="e.g., Business Administration, HVAC"
            isValid={!!formValues.fieldOfStudy && !errors.fieldOfStudy}
          />

          <FormInput
            label="Graduation Year"
            type="number"
            required
            {...register("graduationYear", {
              required: "Graduation year is required",
              min: { value: 1950, message: "Invalid year" },
              max: { value: 2030, message: "Invalid year" },
            })}
            error={errors.graduationYear?.message}
            placeholder="YYYY"
            isValid={!!formValues.graduationYear && !errors.graduationYear}
          />
        </div>

        <FormTextarea
          label="Additional Certifications"
          {...register("additionalCertifications")}
          placeholder="List any relevant certifications, licenses, or professional development courses..."
          helperText="Include certification names, issuing organizations, and dates"
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
