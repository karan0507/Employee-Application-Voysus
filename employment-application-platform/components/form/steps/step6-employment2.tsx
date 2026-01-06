"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { FormTextarea } from "../form-textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Step6Data {
  hasSecondEmployer: boolean
  employer2Name?: string
  employer2Address?: string
  employer2Position?: string
  employer2Supervisor?: string
  employer2Phone?: string
  employer2StartDate?: string
  employer2EndDate?: string
  employer2Duties?: string
}

interface Step6Employment2Props {
  initialData?: Partial<Step6Data>
  onComplete: (data: Step6Data) => void
}

export function Step6Employment2({ initialData, onComplete }: Step6Employment2Props) {
  const [hasEmployer, setHasEmployer] = useState(initialData?.hasSecondEmployer ?? false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step6Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  const handleSkip = () => {
    onComplete({ hasSecondEmployer: false })
  }

  if (!hasEmployer) {
    return (
      <div className="space-y-6 text-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-neutral-900">Employment History #2</h2>
          <p className="text-neutral-600">Previous employment (Optional)</p>
        </div>

        <div className="my-12 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-12">
          <p className="mb-6 text-neutral-600">Do you have a second previous employer to add?</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => setHasEmployer(true)} className="bg-primary">
              Yes, Add Second Employer
            </Button>
            <Button variant="outline" onClick={handleSkip}>
              No, Skip This Step
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit((data) => onComplete({ ...data, hasSecondEmployer: true }))} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Employment History #2</h2>
        <p className="text-neutral-600">Previous employment</p>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Company Name"
          required
          {...register("employer2Name", {
            required: "Company name is required",
          })}
          error={errors.employer2Name?.message}
          isValid={!!formValues.employer2Name && !errors.employer2Name}
        />

        <FormInput
          label="Company Address"
          required
          {...register("employer2Address", {
            required: "Company address is required",
          })}
          error={errors.employer2Address?.message}
          isValid={!!formValues.employer2Address && !errors.employer2Address}
        />

        <FormInput
          label="Position Held"
          required
          {...register("employer2Position", {
            required: "Position is required",
          })}
          error={errors.employer2Position?.message}
          isValid={!!formValues.employer2Position && !errors.employer2Position}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Supervisor Name"
            required
            {...register("employer2Supervisor", {
              required: "Supervisor name is required",
            })}
            error={errors.employer2Supervisor?.message}
            isValid={!!formValues.employer2Supervisor && !errors.employer2Supervisor}
          />

          <FormInput
            label="Supervisor Phone"
            type="tel"
            required
            {...register("employer2Phone", {
              required: "Phone is required",
            })}
            error={errors.employer2Phone?.message}
            placeholder="(XXX) XXX-XXXX"
            isValid={!!formValues.employer2Phone && !errors.employer2Phone}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Start Date"
            type="month"
            required
            {...register("employer2StartDate", {
              required: "Start date is required",
            })}
            error={errors.employer2StartDate?.message}
            isValid={!!formValues.employer2StartDate && !errors.employer2StartDate}
          />

          <FormInput
            label="End Date"
            type="month"
            required
            {...register("employer2EndDate", {
              required: "End date is required",
            })}
            error={errors.employer2EndDate?.message}
            isValid={!!formValues.employer2EndDate && !errors.employer2EndDate}
          />
        </div>

        <FormTextarea
          label="Job Duties & Responsibilities"
          required
          {...register("employer2Duties", {
            required: "Job duties are required",
            minLength: { value: 10, message: "Please provide more detail" },
            maxLength: { value: 500, message: "Max 500 characters" },
          })}
          error={errors.employer2Duties?.message}
          helperText={`${formValues.employer2Duties?.length || 0}/500 characters`}
          className="min-h-[150px]"
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
