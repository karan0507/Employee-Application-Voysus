import { z } from 'zod'

/**
 * Step 1: Personal Details
 * Required: firstName, lastName, email, phone
 * Optional: middleName, alternatePhone
 */
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),

  middleName: z
    .union([
      z.string()
        .max(50, 'Middle name must be less than 50 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
      z.literal(''),
    ])
    .optional()
    .transform(val => val || ''),

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
    .union([
      z.string().regex(
        /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
        'Invalid phone number format'
      ),
      z.literal(''),
    ])
    .optional(),
})

export type Step1Data = z.infer<typeof step1Schema>
