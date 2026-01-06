"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step2Schema, type Step2Data } from "@/lib/validation/schemas"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"

interface Step2AddressProps {
  onComplete: () => void
}

const PROVINCES = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "YT", label: "Yukon" },
]

export function Step2Address({ onComplete }: Step2AddressProps) {
  const { address, updateAddress, setStepValidity } = useApplicationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step2Data>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: address,
  })

  const formValues = watch()

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(2, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const onSubmit = (data: Step2Data) => {
    updateAddress(data)
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Address Information</h2>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.street && <li>Street: {errors.street.message}</li>}
            {errors.city && <li>City: {errors.city.message}</li>}
            {errors.province && <li>Province: {errors.province.message}</li>}
            {errors.postalCode && <li>Postal Code: {errors.postalCode.message}</li>}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Street Address"
            required
            {...register("street")}
            error={errors.street?.message}
            placeholder="123 Main Street, Unit 4"
            isValid={!!formValues.street && !errors.street}
          />

          <FormInput
            label="City"
            required
            {...register("city")}
            error={errors.city?.message}
            isValid={!!formValues.city && !errors.city}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormSelect
            label="Province"
            required
            options={PROVINCES}
            {...register("province")}
            error={errors.province?.message}
          />

          <FormInput
            label="Postal Code"
            required
            {...register("postalCode")}
            error={errors.postalCode?.message}
            placeholder="A1A 1A1"
            isValid={!!formValues.postalCode && !errors.postalCode}
          />
        </div>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
