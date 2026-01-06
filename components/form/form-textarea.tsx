"use client"

import { forwardRef, type TextareaHTMLAttributes } from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className, required, ...props }, ref) => {
    const hasError = !!error

    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>

        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-lg border-2 bg-white px-4 py-3 text-neutral-900 transition-all",
            "focus:outline-none focus:ring-4",
            hasError
              ? "border-destructive ring-destructive/20 animate-shake"
              : "border-neutral-300 focus:border-primary focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60",
            "min-h-[120px] resize-y",
            className,
          )}
          {...props}
        />

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

FormTextarea.displayName = "FormTextarea"
