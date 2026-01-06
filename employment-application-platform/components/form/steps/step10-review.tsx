"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormInput } from "../form-input"
import { ChevronDown, ChevronRight, CheckCircle2, Edit } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { ApplicationFormData } from "@/lib/form-store"

interface Step10Data {
  termsAgreed: boolean
  accuracyAgreed: boolean
  backgroundCheckAgreed: boolean
  typedName: string
}

interface Step10ReviewProps {
  formData: Partial<ApplicationFormData>
  onComplete: (data: Step10Data) => void
  onEditStep: (step: number) => void
}

export function Step10Review({ formData, onComplete, onEditStep }: Step10ReviewProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Step10Data>({
    mode: "onChange",
  })

  const formValues = watch()
  const allAgreed = formValues.termsAgreed && formValues.accuracyAgreed && formValues.backgroundCheckAgreed

  const toggleSection = (section: number) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const sections = [
    {
      number: 1,
      title: "Personal Information",
      complete: !!(formData.firstName && formData.lastName && formData.email),
      summary: `${formData.firstName || ""} ${formData.lastName || ""} | ${formData.email || ""}`,
    },
    {
      number: 2,
      title: "Address",
      complete: !!(formData.city && formData.province),
      summary: `${formData.city || ""}, ${formData.province || ""}`,
    },
    {
      number: 3,
      title: "Position Details",
      complete: !!formData.positionApplying,
      summary: formData.positionApplying || "",
    },
    {
      number: 4,
      title: "Education",
      complete: !!formData.highestEducation,
      summary: formData.highestEducation || "",
    },
    {
      number: 5,
      title: "Employment History #1",
      complete: !!formData.employer1Name,
      summary: formData.employer1Name || "",
    },
    {
      number: 6,
      title: "Employment History #2",
      complete: true,
      summary: formData.employer2Name || "Not provided",
    },
    {
      number: 7,
      title: "Skills & Qualifications",
      complete: true,
      summary: `${formData.technicalSkills?.length || 0} skills, ${formData.languages?.length || 0} languages`,
    },
    {
      number: 8,
      title: "References",
      complete: !!formData.reference1Name,
      summary: "3 references provided",
    },
    {
      number: 9,
      title: "Additional Information",
      complete: !!formData.eligibleToWorkInCanada,
      summary: "Work eligibility confirmed",
    },
  ]

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Review Your Application</h2>
        <p className="text-neutral-600">Please review all information before submitting</p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <Card key={section.number} className="overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(section.number)}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                {expandedSections.includes(section.number) ? (
                  <ChevronDown className="h-5 w-5 text-neutral-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">
                      {section.number}. {section.title}
                    </span>
                    {section.complete && <CheckCircle2 className="h-4 w-4 text-accent-green" />}
                  </div>
                  {!expandedSections.includes(section.number) && (
                    <p className="text-sm text-neutral-500">{section.summary}</p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEditStep(section.number)
                }}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </button>

            {expandedSections.includes(section.number) && (
              <div className="border-t bg-neutral-50 p-4 text-sm">
                <p className="text-neutral-600">{section.summary}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-neutral-900">Declaration</h3>

        <div className="space-y-4 text-sm text-neutral-700">
          <p>
            I declare that all information provided in this application is true, complete, and accurate to the best of
            my knowledge. I understand that any false information or omission may disqualify me from employment or lead
            to dismissal if discovered later.
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formValues.termsAgreed}
                onCheckedChange={(checked) => setValue("termsAgreed", checked as boolean)}
              />
              <Label htmlFor="terms" className="cursor-pointer leading-tight">
                I agree to the terms and conditions stated above
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="accuracy"
                checked={formValues.accuracyAgreed}
                onCheckedChange={(checked) => setValue("accuracyAgreed", checked as boolean)}
              />
              <Label htmlFor="accuracy" className="cursor-pointer leading-tight">
                I certify that all information provided is accurate and complete
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="background"
                checked={formValues.backgroundCheckAgreed}
                onCheckedChange={(checked) => setValue("backgroundCheckAgreed", checked as boolean)}
              />
              <Label htmlFor="background" className="cursor-pointer leading-tight">
                I authorize Voysus to conduct background and reference checks
              </Label>
            </div>
          </div>
        </div>
      </Card>

      <FormInput
        label="Type your full name to sign"
        required
        {...register("typedName", {
          required: "Signature is required",
          minLength: { value: 2, message: "Please type your full name" },
        })}
        error={errors.typedName?.message}
        placeholder="John Doe"
        isValid={!!formValues.typedName && !errors.typedName}
      />

      <div className="text-center text-sm text-neutral-500">
        <p>Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
