"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step3Schema, type Step3Data } from "@/lib/validation/schemas"
import { FormInput } from "../form-input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Step3PrivateProps {
  onComplete: () => void
}

export function Step3Private({ onComplete }: Step3PrivateProps) {
  const { privateInfo, updatePrivateInfo, setStepValidity } = useApplicationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<Step3Data>({
    mode: "onChange",
    resolver: zodResolver(step3Schema),
    defaultValues: privateInfo,
  })

  const formValues = watch()

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(3, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const onSubmit = (data: Step3Data) => {
    updatePrivateInfo(data)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Private & Security Questions</h2>

      {/* Show validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.dateOfBirth && <li>Date of Birth: {errors.dateOfBirth.message}</li>}
            {errors.sin && <li>SIN: {errors.sin.message}</li>}
            {errors.eligibleToWork && <li>Work Eligibility: {errors.eligibleToWork.message}</li>}
            {errors.criminalRecord && <li>Criminal Record: {errors.criminalRecord.message}</li>}
            {errors.referral && <li>Referral: {errors.referral.message}</li>}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {/* DOB and SIN in one row */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Date of Birth"
            type="date"
            required
            {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
            helperText="Must be 18+"
            isValid={!!formValues.dateOfBirth && !errors.dateOfBirth}
          />

          <FormInput
            label="Social Insurance Number"
            {...register("sin")}
            error={errors.sin?.message}
            placeholder="123-456-789"
            helperText="Optional"
            isValid={!!formValues.sin && !errors.sin}
          />
        </div>

        {/* Work Eligibility */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-neutral-700">
            Are you legally eligible to work in Canada? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formValues.eligibleToWork}
            onValueChange={(value) => setValue("eligibleToWork", value as "yes" | "no")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="eligible-yes" />
              <Label htmlFor="eligible-yes" className="cursor-pointer font-normal">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="eligible-no" />
              <Label htmlFor="eligible-no" className="cursor-pointer font-normal">
                No
              </Label>
            </div>
          </RadioGroup>
          {errors.eligibleToWork && (
            <p className="text-sm text-red-500">{errors.eligibleToWork.message}</p>
          )}
        </div>

        {/* Criminal Record */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-neutral-700">
            Have you ever been convicted of a criminal offence? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formValues.criminalRecord}
            onValueChange={(value) => setValue("criminalRecord", value as "yes" | "no")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="criminal-yes" />
              <Label htmlFor="criminal-yes" className="cursor-pointer font-normal">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="criminal-no" />
              <Label htmlFor="criminal-no" className="cursor-pointer font-normal">
                No
              </Label>
            </div>
          </RadioGroup>
          {errors.criminalRecord && (
            <p className="text-sm text-red-500">{errors.criminalRecord.message}</p>
          )}
          <p className="text-xs text-neutral-500">
            Note: A criminal record does not automatically disqualify you from employment
          </p>
        </div>

        {/* Referral (Optional) */}
        <FormInput
          label="Referral"
          {...register("referral")}
          error={errors.referral?.message}
          placeholder="Name / Team"
          helperText="Were you referred by someone at Voysus? (Optional)"
          isValid={!!formValues.referral && !errors.referral}
        />
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Privacy Notice:</strong> Your date of birth and SIN are encrypted and stored securely.
          This information will only be used for employment verification and will never be shared with third parties.
        </p>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
