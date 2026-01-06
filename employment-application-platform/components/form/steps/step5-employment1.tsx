"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "../form-input"
import { FormTextarea } from "../form-textarea"
import { FormSelect } from "../form-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Step5Data {
  employer1Name: string
  employer1Address: string
  employer1Position: string
  employer1Supervisor: string
  employer1Phone: string
  employer1StartDate: string
  employer1EndDate: string
  employer1IsCurrent: boolean
  employer1Salary: string
  employer1SalaryPeriod: string
  employer1ReasonForLeaving: string
  employer1Duties: string
  employer1MayContact: string
  employer1NoContactReason: string
}

interface Step5Employment1Props {
  initialData?: Partial<Step5Data>
  onComplete: (data: Step5Data) => void
}

export function Step5Employment1({ initialData, onComplete }: Step5Employment1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Step5Data>({
    mode: "onChange",
    defaultValues: initialData,
  })

  const formValues = watch()
  const isCurrent = watch("employer1IsCurrent")
  const mayContact = watch("employer1MayContact")

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">Employment History #1</h2>
        <p className="text-neutral-600">Most recent or current employment</p>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Company Name"
          required
          {...register("employer1Name", {
            required: "Company name is required",
            minLength: { value: 2, message: "Too short" },
          })}
          error={errors.employer1Name?.message}
          isValid={!!formValues.employer1Name && !errors.employer1Name}
        />

        <FormInput
          label="Company Address"
          required
          {...register("employer1Address", {
            required: "Company address is required",
            minLength: { value: 5, message: "Too short" },
          })}
          error={errors.employer1Address?.message}
          isValid={!!formValues.employer1Address && !errors.employer1Address}
        />

        <FormInput
          label="Position Held"
          required
          {...register("employer1Position", {
            required: "Position is required",
          })}
          error={errors.employer1Position?.message}
          isValid={!!formValues.employer1Position && !errors.employer1Position}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Supervisor Name"
            required
            {...register("employer1Supervisor", {
              required: "Supervisor name is required",
            })}
            error={errors.employer1Supervisor?.message}
            isValid={!!formValues.employer1Supervisor && !errors.employer1Supervisor}
          />

          <FormInput
            label="Supervisor Phone"
            type="tel"
            required
            {...register("employer1Phone", {
              required: "Phone is required",
              pattern: {
                value: /^[\d\s\-()]+$/,
                message: "Invalid phone",
              },
            })}
            error={errors.employer1Phone?.message}
            placeholder="(XXX) XXX-XXXX"
            isValid={!!formValues.employer1Phone && !errors.employer1Phone}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Start Date"
            type="month"
            required
            {...register("employer1StartDate", {
              required: "Start date is required",
            })}
            error={errors.employer1StartDate?.message}
            isValid={!!formValues.employer1StartDate && !errors.employer1StartDate}
          />

          <div>
            <FormInput
              label="End Date"
              type="month"
              required={!isCurrent}
              disabled={isCurrent}
              {...register("employer1EndDate")}
              error={errors.employer1EndDate?.message}
              isValid={!!formValues.employer1EndDate && !errors.employer1EndDate}
            />
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={isCurrent}
                onCheckedChange={(checked) => setValue("employer1IsCurrent", checked as boolean)}
              />
              <Label htmlFor="current" className="text-sm text-neutral-700">
                I currently work here
              </Label>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="Final Salary (Optional)"
            type="number"
            {...register("employer1Salary")}
            placeholder="Enter amount"
          />

          <FormSelect
            label="Pay Period"
            options={[
              { value: "hour", label: "Per Hour" },
              { value: "year", label: "Per Year" },
            ]}
            {...register("employer1SalaryPeriod")}
          />
        </div>

        <FormTextarea
          label="Reason for Leaving"
          required={!isCurrent}
          {...register("employer1ReasonForLeaving", {
            required: !isCurrent ? "Reason is required" : false,
            maxLength: { value: 200, message: "Max 200 characters" },
          })}
          error={errors.employer1ReasonForLeaving?.message}
          helperText={`${formValues.employer1ReasonForLeaving?.length || 0}/200 characters`}
        />

        <FormTextarea
          label="Job Duties, Skills & Achievements"
          required
          {...register("employer1Duties", {
            required: "Job duties are required",
            minLength: { value: 10, message: "Please provide more detail" },
            maxLength: { value: 500, message: "Max 500 characters" },
          })}
          error={errors.employer1Duties?.message}
          helperText={`${formValues.employer1Duties?.length || 0}/500 characters`}
          className="min-h-[150px]"
        />

        <div>
          <Label className="mb-3 block text-sm font-medium text-neutral-700">
            May we contact this employer? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={mayContact}
            onValueChange={(value) => setValue("employer1MayContact", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="contact-yes" />
              <Label htmlFor="contact-yes" className="cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="contact-no" />
              <Label htmlFor="contact-no" className="cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {mayContact === "no" && (
          <FormInput
            label="If no, please explain why"
            required
            {...register("employer1NoContactReason", {
              required: "Reason is required",
            })}
            error={errors.employer1NoContactReason?.message}
          />
        )}
      </div>

      <input type="submit" hidden />
    </form>
  )
}
