"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step5Schema, type Step5Data } from "@/lib/validation/schemas"
import { getWordCount } from "@/lib/validation/schemas"
import { FormInput } from "../form-input"
import { FormTextarea } from "../form-textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Step5EmploymentProps {
  onComplete: () => void
}

export function Step5Employment({ onComplete }: Step5EmploymentProps) {
  const { employment, updateEmployment, setStepValidity } = useApplicationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<Step5Data>({
    mode: "onChange",
    resolver: zodResolver(step5Schema),
    defaultValues: employment,
  })

  const formValues = watch()
  const isCurrent = watch("current")
  const reasonForLeaving = watch("reasonForLeaving") || ""
  const jobDuties = watch("jobDuties") || ""

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(5, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const onSubmit = (data: Step5Data) => {
    updateEmployment(data)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Employment History</h2>

      {/* Show validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.companyName && <li>Company Name: {errors.companyName.message}</li>}
            {errors.position && <li>Position: {errors.position.message}</li>}
            {errors.startDate && <li>Start Date: {errors.startDate.message}</li>}
            {errors.endDate && <li>End Date: {errors.endDate.message}</li>}
            {errors.reasonForLeaving && <li>Reason for Leaving: {errors.reasonForLeaving.message}</li>}
            {errors.jobDuties && <li>Job Duties: {errors.jobDuties.message}</li>}
            {errors.supervisorName && <li>Supervisor Name: {errors.supervisorName.message}</li>}
            {errors.supervisorPhone && <li>Supervisor Phone: {errors.supervisorPhone.message}</li>}
            {errors.mayContact && <li>May Contact: {errors.mayContact.message}</li>}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {/* Company Info */}
        <FormInput
          label="Company Name"
          required
          {...register("companyName")}
          error={errors.companyName?.message}
          placeholder="e.g., Acme Corporation"
          isValid={!!formValues.companyName && !errors.companyName}
        />

        <FormInput
          label="Position Held"
          required
          {...register("position")}
          error={errors.position?.message}
          placeholder="e.g., Customer Service Representative"
          isValid={!!formValues.position && !errors.position}
        />

        {/* Dates */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Start Date"
            type="month"
            required
            {...register("startDate")}
            error={errors.startDate?.message}
            helperText="Month and year you started"
            isValid={!!formValues.startDate && !errors.startDate}
          />

          <div>
            <FormInput
              label="End Date"
              type="month"
              required={!isCurrent}
              disabled={isCurrent}
              {...register("endDate")}
              error={errors.endDate?.message}
              helperText="Month and year you left"
              isValid={!isCurrent && !!formValues.endDate && !errors.endDate}
            />
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox
                id="current-employment"
                checked={isCurrent}
                onCheckedChange={(checked) => setValue("current", checked as boolean)}
              />
              <Label htmlFor="current-employment" className="cursor-pointer text-sm text-neutral-700">
                I currently work here
              </Label>
            </div>
          </div>
        </div>

        {/* Reason for Leaving */}
        <div>
          <FormTextarea
            label="Reason for Leaving"
            required
            {...register("reasonForLeaving")}
            error={errors.reasonForLeaving?.message}
            placeholder="Explain why you left or are leaving this position..."
            helperText={`${getWordCount(reasonForLeaving)} words (10-200 required)`}
            className="min-h-[100px]"
          />
        </div>

        {/* Job Duties */}
        <div>
          <FormTextarea
            label="Job Duties & Responsibilities"
            required
            {...register("jobDuties")}
            error={errors.jobDuties?.message}
            placeholder="Describe your main responsibilities, achievements, and skills you used in this role..."
            helperText={`${getWordCount(jobDuties)} words (10-200 required)`}
            className="min-h-[150px]"
          />
        </div>

        {/* Supervisor (Optional) */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="mb-3 text-sm font-medium text-neutral-800">Supervisor Information (Optional)</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Supervisor Name"
              {...register("supervisorName")}
              error={errors.supervisorName?.message}
              placeholder="Full name"
              isValid={!!formValues.supervisorName && !errors.supervisorName}
            />

            <FormInput
              label="Supervisor Phone"
              type="tel"
              {...register("supervisorPhone")}
              error={errors.supervisorPhone?.message}
              placeholder="(123) 456-7890"
              isValid={!!formValues.supervisorPhone && !errors.supervisorPhone}
            />
          </div>
        </div>

        {/* May Contact */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-neutral-700">
            May we contact this employer?
          </Label>
          <RadioGroup
            value={formValues.mayContact}
            onValueChange={(value) => setValue("mayContact", value as "yes" | "no")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="may-contact-yes" />
              <Label htmlFor="may-contact-yes" className="cursor-pointer font-normal">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="may-contact-no" />
              <Label htmlFor="may-contact-no" className="cursor-pointer font-normal">
                No
              </Label>
            </div>
          </RadioGroup>
          {errors.mayContact && (
            <p className="text-sm text-red-500">{errors.mayContact.message}</p>
          )}
        </div>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
