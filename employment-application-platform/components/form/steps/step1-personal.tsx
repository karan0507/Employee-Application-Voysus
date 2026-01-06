"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"

interface Step1Data {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  alternatePhone: string
  dateOfBirth: string
  sin: string
}

interface Step1PersonalProps {
  initialData?: Partial<Step1Data>
  onComplete: (data: Step1Data) => void
}

export function Step1Personal({ initialData, onComplete }: Step1PersonalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step1Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Personal Information</h2>
        <p className="text-neutral-600">Please provide your basic personal details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="First Name"
          required
          {...register("firstName", {
            required: "First name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
          })}
          error={errors.firstName?.message}
          isValid={!!formValues.firstName && !errors.firstName}
        />

        <FormInput label="Middle Name" {...register("middleName")} isValid={!!formValues.middleName} />

        <FormInput
          label="Last Name"
          required
          {...register("lastName", {
            required: "Last name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
          })}
          error={errors.lastName?.message}
          isValid={!!formValues.lastName && !errors.lastName}
        />

        <FormInput
          label="Email Address"
          type="email"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
          helperText="We'll send your application confirmation here"
          isValid={!!formValues.email && !errors.email}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          required
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[\d\s\-$$$$]+$/,
              message: "Invalid phone number",
            },
          })}
          error={errors.phone?.message}
          placeholder="(XXX) XXX-XXXX"
          isValid={!!formValues.phone && !errors.phone}
        />

        <FormInput
          label="Alternate Phone"
          type="tel"
          {...register("alternatePhone", {
            pattern: {
              value: /^[\d\s\-$$$$]+$/,
              message: "Invalid phone number",
            },
          })}
          error={errors.alternatePhone?.message}
          placeholder="(XXX) XXX-XXXX"
          isValid={!!formValues.alternatePhone && !errors.alternatePhone}
        />

        <FormInput
          label="Date of Birth"
          type="date"
          required
          {...register("dateOfBirth", {
            required: "Date of birth is required",
          })}
          error={errors.dateOfBirth?.message}
          isValid={!!formValues.dateOfBirth && !errors.dateOfBirth}
        />

        <FormInput
          label="Social Insurance Number"
          required
          {...register("sin", {
            required: "SIN is required",
            pattern: {
              value: /^\d{3}-?\d{3}-?\d{3}$/,
              message: "Invalid SIN format (XXX-XXX-XXX)",
            },
          })}
          error={errors.sin?.message}
          placeholder="XXX-XXX-XXX"
          helperText="Your SIN is confidential and secure"
          isValid={!!formValues.sin && !errors.sin}
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
