import { z } from 'zod'

/**
 * Step 1: Personal Details
 * Required: firstName, middleName, lastName, email, phone
 * Optional: alternatePhone
 */
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),

  middleName: z
    .string()
    .min(1, 'Middle name is required')
    .max(50, 'Middle name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),

  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Invalid phone number format (e.g., (123) 456-7890)'
    ),

  alternatePhone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Invalid phone number format'
    )
    .optional()
    .or(z.literal('')),
})

export type Step1Data = z.infer<typeof step1Schema>
