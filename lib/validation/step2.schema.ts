import { z } from 'zod'

/**
 * Canadian provinces for validation
 */
const CANADIAN_PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
] as const

/**
 * Address sub-schema (reusable)
 */
const addressSchema = z.object({
  street: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(100, 'Street address too long'),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City name too long'),

  province: z.enum(CANADIAN_PROVINCES, {
    errorMap: () => ({ message: 'Please select a valid Canadian province' })
  }),

  postalCode: z
    .string()
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      'Invalid postal code format (e.g., A1A 1A1)'
    )
    .transform(val => val.toUpperCase().replace(/\s/g, ' ')), // Normalize format
})

/**
 * Step 2: Address
 * All fields required
 */
export const step2Schema = addressSchema

export type Step2Data = z.infer<typeof step2Schema>
export type AddressData = z.infer<typeof addressSchema>
