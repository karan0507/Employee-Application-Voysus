"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"

interface Step3Data {
  positionApplying: string
  availableStartDate: string
  desiredSalary: string
  employmentType: string
  willingToRelocate: string
}

interface Step3PositionProps {
  initialData?: Partial<Step3Data>
  onComplete: (data: Step3Data) => void
}

const positions = [
  { value: "technical-sales", label: "Technical Sales Representative" },
  { value: "customer-service", label: "Customer Service Specialist" },
  { value: "hvac-technician", label: "HVAC Technician" },
  { value: "service-coordinator", label: "Service Coordinator" },
  { value: "warehouse", label: "Warehouse Associate" },
  { value: "other", label: "Other" },
]

const employmentTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
]

const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

export function Step3Position({ initialData, onComplete }: Step3PositionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step3Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Position & Availability</h2>
        <p className="text-neutral-600">Tell us about the role you're interested in</p>
      </div>

      <div className="space-y-6">
        <FormSelect
          label="Position Applying For"
          required
          options={positions}
          {...register("positionApplying", {
            required: "Please select a position",
          })}
          error={errors.positionApplying?.message}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Available Start Date"
            type="date"
            required
            {...register("availableStartDate", {
              required: "Start date is required",
            })}
            error={errors.availableStartDate?.message}
            isValid={!!formValues.availableStartDate && !errors.availableStartDate}
          />

          <FormInput
            label="Desired Salary"
            required
            {...register("desiredSalary", {
              required: "Please provide desired salary",
            })}
            error={errors.desiredSalary?.message}
            placeholder="e.g., $50,000 - $60,000 per year"
            isValid={!!formValues.desiredSalary && !errors.desiredSalary}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormSelect
            label="Employment Type"
            required
            options={employmentTypes}
            {...register("employmentType", {
              required: "Please select employment type",
            })}
            error={errors.employmentType?.message}
          />

          <FormSelect
            label="Willing to Relocate?"
            required
            options={yesNo}
            {...register("willingToRelocate", {
              required: "Please indicate willingness to relocate",
            })}
            error={errors.willingToRelocate?.message}
          />
        </div>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
