"use client"

import { forwardRef, type InputHTMLAttributes } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  isValid?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, isValid, className, required, ...props }, ref) => {
    const hasError = !!error
    const showSuccess = isValid && !hasError && props.value

    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>

        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border-2 bg-white px-4 py-3 text-neutral-900 transition-all",
              "focus:outline-none focus:ring-4",
              hasError
                ? "border-destructive ring-destructive/20 animate-shake"
                : showSuccess
                  ? "border-accent-green ring-accent-green/20"
                  : "border-neutral-300 focus:border-primary focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60",
              className,
            )}
            {...props}
          />

          {showSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle2 className="h-5 w-5 text-accent-green" />
            </div>
          )}

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
          )}
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

FormInput.displayName = "FormInput"
