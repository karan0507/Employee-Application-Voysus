"use client"

import { useForm } from "react-hook-form"
import { FormSelect } from "../form-select"
import { FormTextarea } from "../form-textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Step9Data {
  eligibleToWorkInCanada: string
  requireWorkPermit: string
  criminalRecord: string
  criminalRecordDetails?: string
  physicalLimitations: string
  physicalLimitationsDetails?: string
  howDidYouHear: string
}

interface Step9AdditionalProps {
  initialData?: Partial<Step9Data>
  onComplete: (data: Step9Data) => void
}

export function Step9Additional({ initialData, onComplete }: Step9AdditionalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Step9Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()
  const hasCriminalRecord = watch("criminalRecord") === "yes"
  const hasPhysicalLimitations = watch("physicalLimitations") === "yes"

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Additional Information</h2>
        <p className="text-neutral-600">Help us understand your situation better</p>
      </div>

      <div className="space-y-8">
        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Are you legally eligible to work in Canada? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formValues.eligibleToWorkInCanada}
            onValueChange={(value) => setValue("eligibleToWorkInCanada", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="eligible-yes" />
              <Label htmlFor="eligible-yes" className="cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="eligible-no" />
              <Label htmlFor="eligible-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Do you require a work permit? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formValues.requireWorkPermit}
            onValueChange={(value) => setValue("requireWorkPermit", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="permit-yes" />
              <Label htmlFor="permit-yes" className="cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="permit-no" />
              <Label htmlFor="permit-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Have you ever been convicted of a criminal offence? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formValues.criminalRecord}
            onValueChange={(value) => setValue("criminalRecord", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="criminal-yes" />
              <Label htmlFor="criminal-yes" className="cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="criminal-no" />
              <Label htmlFor="criminal-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
          <p className="mt-2 text-xs text-neutral-500">A criminal record will not necessarily disqualify you</p>
        </div>

        {hasCriminalRecord && (
          <FormTextarea
            label="Please provide details"
            required
            {...register("criminalRecordDetails", {
              required: "Details are required",
              maxLength: { value: 300, message: "Max 300 characters" },
            })}
            error={errors.criminalRecordDetails?.message}
            helperText={`${formValues.criminalRecordDetails?.length || 0}/300 characters`}
          />
        )}

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Do you have any physical limitations that may affect job performance?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formValues.physicalLimitations}
            onValueChange={(value) => setValue("physicalLimitations", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="physical-yes" />
              <Label htmlFor="physical-yes" className="cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="physical-no" />
              <Label htmlFor="physical-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {hasPhysicalLimitations && (
          <FormTextarea
            label="Please describe any accommodations you may need"
            required
            {...register("physicalLimitationsDetails", {
              required: "Details are required",
              maxLength: { value: 300, message: "Max 300 characters" },
            })}
            error={errors.physicalLimitationsDetails?.message}
            helperText={`${formValues.physicalLimitationsDetails?.length || 0}/300 characters`}
          />
        )}

        <FormSelect
          label="How did you hear about this position?"
          required
          options={[
            { value: "website", label: "Company Website" },
            { value: "job-board", label: "Job Board (Indeed, LinkedIn, etc.)" },
            { value: "referral", label: "Employee Referral" },
            { value: "social-media", label: "Social Media" },
            { value: "recruiter", label: "Recruiter" },
            { value: "other", label: "Other" },
          ]}
          {...register("howDidYouHear", {
            required: "Please select an option",
          })}
          error={errors.howDidYouHear?.message}
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
