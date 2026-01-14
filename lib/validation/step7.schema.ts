import { z } from 'zod'

/**
 * Word count validator helper
 */
const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Step 7: Experience Question
 * Required: whyVoysus (20-200 words)
 */
export const step7Schema = z.object({
  whyVoysus: z
    .string()
    .min(1, 'This question is required')
    .refine(
      (text) => {
        const words = wordCount(text)
        return words >= 20 && words <= 200
      },
      'Your answer must be between 20 and 200 words'
    ),
})

export type Step7Data = z.infer<typeof step7Schema>

/**
 * Helper function to get word count for display
 */
export function getWordCount(text: string): number {
  return wordCount(text)
}
