"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step7Schema, type Step7Data, getWordCount } from "@/lib/validation/schemas"
import { FormTextarea } from "../form-textarea"

interface Step7ExperienceProps {
  onComplete: () => void
}

export function Step7Experience({ onComplete }: Step7ExperienceProps) {
  const { experience, updateExperience, setStepValidity } = useApplicationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step7Data>({
    mode: "onChange",
    resolver: zodResolver(step7Schema),
    defaultValues: experience,
  })

  const whyVoysus = watch("whyVoysus") || ""
  const wordCount = getWordCount(whyVoysus)

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(7, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const onSubmit = (data: Step7Data) => {
    updateExperience(data)
    onComplete()
  }

  // Helper to determine word count color
  const getWordCountColor = () => {
    if (wordCount < 20) return "text-red-600"
    if (wordCount > 200) return "text-red-600"
    if (wordCount >= 20 && wordCount <= 50) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Final Question</h2>

      {/* Show validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            Please fix the following errors to continue:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {errors.whyVoysus && <li>Why Voysus: {errors.whyVoysus.message}</li>}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <FormTextarea
          label="Why do you want to join Voysus?"
          required
          {...register("whyVoysus")}
          error={errors.whyVoysus?.message}
          placeholder="Share your motivations, career goals, and what excites you about this opportunity..."
          helperText={
            <span className={getWordCountColor()}>
              {wordCount} words (20-200 required)
            </span>
          }
          className="min-h-[200px]"
        />

        {/* Guidelines */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-blue-900">
            Guidelines for your answer:
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Be specific about what attracts you to Voysus</li>
            <li>• Mention relevant experience or skills</li>
            <li>• Share your career goals and how this role fits</li>
            <li>• Keep it between 20-200 words</li>
            <li>• Be genuine and authentic</li>
          </ul>
        </div>

        {/* Word Count Indicator */}
        {wordCount > 0 && (
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Progress:</span>
              <span className={`text-sm font-medium ${getWordCountColor()}`}>
                {wordCount < 20 && `${20 - wordCount} more words needed`}
                {wordCount >= 20 && wordCount <= 200 && "Good length!"}
                {wordCount > 200 && `${wordCount - 200} words over limit`}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className={`h-full transition-all ${
                  wordCount < 20
                    ? "bg-red-500"
                    : wordCount > 200
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min((wordCount / 200) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <input type="submit" hidden />
    </form>
  )
}
