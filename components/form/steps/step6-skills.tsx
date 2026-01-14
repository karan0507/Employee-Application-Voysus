"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApplicationStore } from "@/lib/store/application-store"
import { step6Schema, type Step6Data, SKILLS_CATEGORIES } from "@/lib/validation/schemas"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Step6SkillsProps {
  onComplete: () => void
}

export function Step6Skills({ onComplete }: Step6SkillsProps) {
  const { skills, updateSkills, setStepValidity } = useApplicationStore()

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<Step6Data>({
    mode: "onChange",
    resolver: zodResolver(step6Schema),
    defaultValues: skills,
  })

  const selectedSkills = watch("skills") || []

  // Track form validity for Next button
  useEffect(() => {
    setStepValidity(6, isValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const toggleSkill = (skill: string) => {
    const isSelected = selectedSkills.includes(skill)
    const updatedSkills = isSelected
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill]

    setValue("skills", updatedSkills, { shouldValidate: true })
  }

  const onSubmit = (data: Step6Data) => {
    updateSkills(data)
    onComplete()
  }

  // Count selected skills per category
  const getSelectedCount = (category: string) => {
    const categorySkills = SKILLS_CATEGORIES[category as keyof typeof SKILLS_CATEGORIES]
    return selectedSkills.filter((skill) => categorySkills.includes(skill)).length
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Skills & Qualifications</h2>

      {/* Error Message */}
      {errors.skills && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{errors.skills.message}</p>
        </div>
      )}

      {/* Selected Count */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">
          {selectedSkills.length} skill{selectedSkills.length !== 1 ? "s" : ""} selected
        </p>
        {selectedSkills.length > 0 && (
          <p className="mt-1 text-xs text-blue-700">
            {selectedSkills.join(", ")}
          </p>
        )}
      </div>

      {/* Skills Categories (Accordion) */}
      <Accordion type="multiple" className="w-full" defaultValue={["CS Inbound"]}>
        {Object.entries(SKILLS_CATEGORIES).map(([category, categorySkills]) => {
          const selectedCount = getSelectedCount(category)

          return (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold">{category}</span>
                  {selectedCount > 0 && (
                    <span className="text-sm font-normal text-primary-600">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                  {categorySkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill)

                    return (
                      <div
                        key={skill}
                        className={`flex items-center space-x-3 rounded-lg border p-3 transition-colors ${
                          isSelected
                            ? "border-primary-500 bg-primary-50"
                            : "border-neutral-200 bg-white hover:bg-neutral-50"
                        }`}
                      >
                        <Checkbox
                          id={skill}
                          checked={isSelected}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <Label
                          htmlFor={skill}
                          className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-sm text-neutral-700">
          <strong>Tip:</strong> Select all skills you have experience with. You must select at least one skill to continue.
        </p>
      </div>

      <input type="submit" hidden />
    </form>
  )
}
