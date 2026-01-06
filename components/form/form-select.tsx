"use client"

import { forwardRef, type SelectHTMLAttributes } from "react"
import { ChevronDown, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, className, required, ...props }, ref) => {
    const hasError = !!error

    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg border-2 bg-white px-4 py-3 text-neutral-900 transition-all",
              "focus:outline-none focus:ring-4",
              hasError
                ? "border-destructive ring-destructive/20 animate-shake"
                : "border-neutral-300 focus:border-primary focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60",
              className,
            )}
            {...props}
          >
            <option value="">Select {label.toLowerCase()}...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          </div>
        </div>

        {helperText && !error && <p className="mt-1 text-xs text-neutral-500">{helperText}</p>}

        {error && (
          <p className="mt-1 animate-slide-down text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormSelect.displayName = "FormSelect"
