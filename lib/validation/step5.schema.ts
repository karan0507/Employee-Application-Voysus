import { z } from 'zod'

/**
 * Word count validator helper
 */
const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Step 5: Employment History
 * ONLY ONE ENTRY (not multiple employment histories)
 * Required: companyName, position, startDate, (endDate OR current), reasonForLeaving, jobDuties
 * Optional: supervisorName, supervisorPhone, mayContact
 */
export const step5Schema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name too long'),

  position: z
    .string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position title too long'),

  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)'),

  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)')
    .optional()
    .or(z.literal('')),

  current: z.boolean().default(false),

  reasonForLeaving: z
    .string()
    .min(1, 'Reason for leaving is required')
    .max(1000, 'Reason for leaving is too long (max 200 words)')
    .refine(
      (text) => {
        const words = wordCount(text)
        return words >= 10 && words <= 200
      },
      'Reason for leaving must be between 10 and 200 words'
    ),

  jobDuties: z
    .string()
    .min(1, 'Job duties are required')
    .max(1000, 'Job duties description is too long (max 200 words)')
    .refine(
      (text) => {
        const words = wordCount(text)
        return words >= 10 && words <= 200
      },
      'Job duties must be between 10 and 200 words'
    ),

  supervisorName: z
    .string()
    .max(100, 'Supervisor name too long')
    .optional()
    .or(z.literal('')),

  supervisorPhone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Invalid phone number format'
    )
    .optional()
    .or(z.literal('')),

  mayContact: z.enum(['yes', 'no']).optional(),
})
  .refine(
    (data) => {
      // If current is false, endDate is required
      if (!data.current && !data.endDate) {
        return false
      }
      return true
    },
    {
      message: 'End date is required (or check "I currently work here")',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      // If endDate is provided, it must be after startDate
      if (data.endDate && data.startDate) {
        return data.endDate >= data.startDate
      }
      return true
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  )

export type Step5Data = z.infer<typeof step5Schema>
