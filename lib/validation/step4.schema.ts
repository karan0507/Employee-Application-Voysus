import { z } from 'zod'

/**
 * Education levels
 */
const EDUCATION_LEVELS = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
  'Trade Certificate',
  'Other',
] as const

/**
 * Step 4: Education Background
 * All fields required
 */
export const step4Schema = z.object({
  level: z.enum(EDUCATION_LEVELS, {
    errorMap: () => ({ message: 'Please select your highest level of education' })
  }),

  fieldOfStudy: z
    .string()
    .min(2, 'Field of study must be at least 2 characters')
    .max(100, 'Field of study too long'),

  institution: z
    .string()
    .min(2, 'Institution name must be at least 2 characters')
    .max(255, 'Institution name too long'),

  graduationYear: z
    .number()
    .int('Year must be a whole number')
    .min(1950, 'Year must be 1950 or later')
    .max(new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future')
    .or(
      z.string().regex(/^\d{4}$/).transform(Number)
    ),
})

export type Step4Data = z.infer<typeof step4Schema>
