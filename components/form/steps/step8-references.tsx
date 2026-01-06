"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { Card } from "@/components/ui/card"

interface Step8Data {
  reference1Name: string
  reference1Phone: string
  reference1Company: string
  reference1Position: string
  reference2Name: string
  reference2Phone: string
  reference2Company: string
  reference2Position: string
  reference3Name: string
  reference3Phone: string
  reference3Company: string
  reference3Position: string
}

interface Step8ReferencesProps {
  initialData?: Partial<Step8Data>
  onComplete: (data: Step8Data) => void
}

export function Step8References({ initialData, onComplete }: Step8ReferencesProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step8Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()

  const ReferenceCard = ({ number }: { number: 1 | 2 | 3 }) => (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-neutral-900">Reference {number}</h3>
      <div className="space-y-4">
        <FormInput
          label="Full Name"
          required
          {...register(`reference${number}Name` as const, {
            required: "Name is required",
            minLength: { value: 2, message: "Too short" },
          })}
          error={errors[`reference${number}Name` as const]?.message}
          isValid={!!formValues[`reference${number}Name` as const] && !errors[`reference${number}Name` as const]}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          required
          {...register(`reference${number}Phone` as const, {
            required: "Phone is required",
            pattern: {
              value: /^[\d\s\-()]+$/,
              message: "Invalid phone",
            },
          })}
          error={errors[`reference${number}Phone` as const]?.message}
          placeholder="(XXX) XXX-XXXX"
          isValid={!!formValues[`reference${number}Phone` as const] && !errors[`reference${number}Phone` as const]}
        />

        <FormInput
          label="Company/Organization"
          required
          {...register(`reference${number}Company` as const, {
            required: "Company is required",
          })}
          error={errors[`reference${number}Company` as const]?.message}
          isValid={!!formValues[`reference${number}Company` as const] && !errors[`reference${number}Company` as const]}
        />

        <FormInput
          label="Position/Title"
          required
          {...register(`reference${number}Position` as const, {
            required: "Position is required",
          })}
          error={errors[`reference${number}Position` as const]?.message}
          isValid={
            !!formValues[`reference${number}Position` as const] && !errors[`reference${number}Position` as const]
          }
        />
      </div>
    </Card>
  )

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Professional References</h2>
        <p className="text-neutral-600">Provide 3 professional references who can speak to your work experience</p>
      </div>

      <div className="space-y-6">
        <ReferenceCard number={1} />
        <ReferenceCard number={2} />
        <ReferenceCard number={3} />
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-medium">Note: We will only contact your references if you are selected for an interview.</p>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
