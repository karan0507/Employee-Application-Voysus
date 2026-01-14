import { z } from 'zod'

/**
 * Step 3: Private & Security Questions
 * Required: dateOfBirth, sin, eligibleToWork, criminalRecord
 * Optional: referral
 *
 * SECURITY NOTE: This data should NOT be persisted to localStorage
 */
export const step3Schema = z.object({
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const dayDiff = today.getDate() - birthDate.getDate()

      // Adjust age if birthday hasn't occurred this year
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age

      return actualAge >= 18
    }, 'You must be at least 18 years old to apply'),

  sin: z
    .union([z.string(), z.undefined(), z.literal('')])
    .optional()
    .transform(val => val || '')
    .refine((val) => {
      if (!val) return true
      return /^\d{3}-?\d{3}-?\d{3}$/.test(val)
    }, 'Invalid SIN format (e.g., 123-456-789)')
    .transform(val => val ? val.replace(/-/g, '') : '')
    .refine((sin) => {
      if (!sin) return true
      const digits = sin.split('').map(Number)
      let sum = 0
      for (let i = 0; i < 9; i++) {
        let digit = digits[i]
        if (i % 2 === 1) {
          digit *= 2
          if (digit > 9) digit -= 9
        }
        sum += digit
      }
      return sum % 10 === 0
    }, 'Invalid SIN number'),

  eligibleToWork: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Please indicate work eligibility' })
  }),

  criminalRecord: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Please answer this question' })
  }),

  referral: z
    .string()
    .max(100, 'Referral information too long')
    .default(''),
})

export type Step3Data = z.infer<typeof step3Schema>
