/**
 * Centralized export of all validation schemas
 * Import from this file in components
 */

export { step1Schema, type Step1Data } from './step1.schema'
export { step2Schema, type Step2Data, type AddressData } from './step2.schema'
export { step3Schema, type Step3Data } from './step3.schema'
export { step4Schema, type Step4Data } from './step4.schema'
export { step5Schema, type Step5Data } from './step5.schema'
export { step6Schema, type Step6Data, SKILLS_CATEGORIES } from './step6.schema'
export { step7Schema, type Step7Data, getWordCount } from './step7.schema'

/**
 * Combined schema for final submission validation
 * Validates all steps at once before submitting
 */
import { z } from 'zod'
import { step1Schema } from './step1.schema'
import { step2Schema } from './step2.schema'
import { step3Schema } from './step3.schema'
import { step4Schema } from './step4.schema'
import { step5Schema } from './step5.schema'
import { step6Schema } from './step6.schema'
import { step7Schema } from './step7.schema'

export const finalApplicationSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
  step6: step6Schema,
  step7: step7Schema,
})

export type FinalApplicationData = z.infer<typeof finalApplicationSchema>
