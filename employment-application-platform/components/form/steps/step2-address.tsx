"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"

interface Step2Data {
  streetAddress: string
  city: string
  province: string
  postalCode: string
  howLongAtAddress: string
  previousAddress: string
}

interface Step2AddressProps {
  initialData?: Partial<Step2Data>
  onComplete: (data: Step2Data) => void
}

const provinces = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "MB", label: "Manitoba" },
  { value: "SK", label: "Saskatchewan" },
  { value: "QC", label: "Quebec" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "NT", label: "Northwest Territories" },
  { value: "YT", label: "Yukon" },
  { value: "NU", label: "Nunavut" },
]

export function Step2Address({ initialData, onComplete }: Step2AddressProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step2Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Address Information</h2>
        <p className="text-neutral-600">Where can we reach you?</p>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Street Address"
          required
          {...register("streetAddress", {
            required: "Street address is required",
          })}
          error={errors.streetAddress?.message}
          placeholder="123 Main Street, Unit 4"
          isValid={!!formValues.streetAddress && !errors.streetAddress}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="City"
            required
            {...register("city", {
              required: "City is required",
            })}
            error={errors.city?.message}
            isValid={!!formValues.city && !errors.city}
          />

          <FormSelect
            label="Province"
            required
            options={provinces}
            {...register("province", {
              required: "Province is required",
            })}
            error={errors.province?.message}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Postal Code"
            required
            {...register("postalCode", {
              required: "Postal code is required",
              pattern: {
                value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                message: "Invalid postal code format (A1A 1A1)",
              },
            })}
            error={errors.postalCode?.message}
            placeholder="A1A 1A1"
            isValid={!!formValues.postalCode && !errors.postalCode}
          />

          <FormInput
            label="How long at this address?"
            required
            {...register("howLongAtAddress", {
              required: "This field is required",
            })}
            error={errors.howLongAtAddress?.message}
            placeholder="2 years 3 months"
            isValid={!!formValues.howLongAtAddress && !errors.howLongAtAddress}
          />
        </div>

        <FormInput
          label="Previous Address (if less than 2 years at current)"
          {...register("previousAddress")}
          placeholder="Previous street address, city, province"
          helperText="Only required if you've lived at current address for less than 2 years"
          isValid={!!formValues.previousAddress}
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
