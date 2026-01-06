"use client"

import { useForm } from "react-hook-form"
import { FormTextarea } from "../form-textarea"
import { FormSelect } from "../form-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Step7Data {
  driverLicense: string
  vehicleAccess: string
  technicalSkills: string[]
  languages: string[]
  certifications: string
  additionalSkills: string
}

interface Step7SkillsProps {
  initialData?: Partial<Step7Data>
  onComplete: (data: Step7Data) => void
}

const technicalSkillsList = [
  "Microsoft Office",
  "Excel/Spreadsheets",
  "Customer Service",
  "Sales Experience",
  "HVAC Knowledge",
  "Technical Troubleshooting",
  "Data Entry",
  "Phone Systems",
]

const languagesList = ["English", "French", "Spanish", "Mandarin", "Cantonese", "Hindi", "Punjabi", "Arabic", "Other"]

export function Step7Skills({ initialData, onComplete }: Step7SkillsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Step7Data>({
    mode: "onChange",
    defaultValues: {
      technicalSkills: initialData?.technicalSkills || [],
      languages: initialData?.languages || [],
      ...initialData,
    },
  })

  const formValues = watch()
  const technicalSkills = watch("technicalSkills") || []
  const languages = watch("languages") || []

  const toggleSkill = (skill: string) => {
    const current = technicalSkills.includes(skill)
    if (current) {
      setValue(
        "technicalSkills",
        technicalSkills.filter((s) => s !== skill),
      )
    } else {
      setValue("technicalSkills", [...technicalSkills, skill])
    }
  }

  const toggleLanguage = (language: string) => {
    const current = languages.includes(language)
    if (current) {
      setValue(
        "languages",
        languages.filter((l) => l !== language),
      )
    } else {
      setValue("languages", [...languages, language])
    }
  }

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Skills & Qualifications</h2>
        <p className="text-neutral-600">Tell us about your skills and certifications</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormSelect
            label="Driver's License"
            required
            options={[
              { value: "none", label: "No License" },
              { value: "g2", label: "G2 License" },
              { value: "g", label: "G License (Full)" },
              { value: "other", label: "Other Province" },
            ]}
            {...register("driverLicense", {
              required: "Please select an option",
            })}
            error={errors.driverLicense?.message}
          />

          <FormSelect
            label="Do you have regular access to a vehicle?"
            required
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            {...register("vehicleAccess", {
              required: "Please select an option",
            })}
            error={errors.vehicleAccess?.message}
          />
        </div>

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Technical Skills <span className="text-neutral-500">(Select all that apply)</span>
          </Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {technicalSkillsList.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={technicalSkills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <Label htmlFor={skill} className="cursor-pointer text-sm">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            Languages <span className="text-neutral-500">(Select all that apply)</span>
          </Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {languagesList.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={languages.includes(language)}
                  onCheckedChange={() => toggleLanguage(language)}
                />
                <Label htmlFor={language} className="cursor-pointer text-sm">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <FormTextarea
          label="Certifications & Licenses"
          {...register("certifications")}
          placeholder="List any relevant certifications, licenses, or professional training..."
          helperText="Include certification names, issuing organizations, and dates"
        />

        <FormTextarea
          label="Additional Skills & Information"
          {...register("additionalSkills", {
            maxLength: { value: 500, message: "Max 500 characters" },
          })}
          error={errors.additionalSkills?.message}
          placeholder="Share any other relevant skills, achievements, volunteer work, or interests..."
          helperText={`${formValues.additionalSkills?.length || 0}/500 characters`}
        />
      </div>

      <input type="submit" hidden />
    </form>
  )
}
