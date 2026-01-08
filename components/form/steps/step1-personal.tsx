"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplicationStore } from "@/lib/store/application-store";
import { step1Schema, type Step1Data } from "@/lib/validation/schemas";
import { FormInput } from "../form-input";

interface Step1PersonalProps {
  onComplete: () => void;
}

export function Step1Personal({ onComplete }: Step1PersonalProps) {
  const { personalDetails, updatePersonalDetails, setStepValidity } =
    useApplicationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step1Data>({
    mode: "onChange",
    resolver: zodResolver(step1Schema),
    defaultValues: personalDetails,
  });

  const formValues = watch();

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(1, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  const onSubmit = (data: Step1Data) => {
    updatePersonalDetails(data);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Personal Details</h2>

      {/* Show validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.firstName && (
              <li>First Name: {errors.firstName.message}</li>
            )}
            {errors.middleName && (
              <li>Middle Name: {errors.middleName.message}</li>
            )}
            {errors.lastName && <li>Last Name: {errors.lastName.message}</li>}
            {errors.email && <li>Email: {errors.email.message}</li>}
            {errors.phone && <li>Phone: {errors.phone.message}</li>}
            {errors.alternatePhone && (
              <li>Alternate Phone: {errors.alternatePhone.message}</li>
            )}
          </ul>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="First Name"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
          isValid={!!formValues.firstName && !errors.firstName}
        />

        <FormInput
          label="Middle Name"
          {...register("middleName")}
          error={errors.middleName?.message}
          isValid={!!formValues.middleName && !errors.middleName}
        />

        <FormInput
          label="Last Name"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
          isValid={!!formValues.lastName && !errors.lastName}
        />

        <FormInput
          label="Email Address"
          type="email"
          required
          {...register("email")}
          error={errors.email?.message}
          helperText="We'll send your application confirmation here"
          isValid={!!formValues.email && !errors.email}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          required
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="(123) 456-7890"
          isValid={!!formValues.phone && !errors.phone}
        />

        <FormInput
          label="Alternate Phone"
          type="tel"
          {...register("alternatePhone")}
          error={errors.alternatePhone?.message}
          placeholder="(123) 456-7890"
          helperText="Optional"
        />
      </div>

      <input type="submit" hidden />
    </form>
  );
}
