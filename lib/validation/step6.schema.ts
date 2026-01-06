import { z } from 'zod'

/**
 * Skills by category (exactly 5 skills per category)
 * These match current customer service market requirements
 */
export const SKILLS_CATEGORIES = {
  'CS Inbound': [
    'Email Support',
    'Live Chat Support',
    'Phone Support',
    'Ticketing Systems',
    'Complaint Resolution',
  ],
  'CS Outbound': [
    'Follow-up Calls',
    'Customer Surveys',
    'Proactive Support',
    'Account Management',
    'Retention Campaigns',
  ],
  'Collections': [
    'Payment Processing',
    'Debt Recovery',
    'Negotiation Skills',
    'Account Reconciliation',
    'Skip Tracing',
  ],
  'Telemarketing': [
    'Lead Generation',
    'Appointment Setting',
    'Product Promotion',
    'Market Research',
    'Cold Calling',
  ],
  'Inside Sales': [
    'CRM Management',
    'Consultative Selling',
    'Upselling/Cross-selling',
    'Pipeline Management',
    'Closing Techniques',
  ],
} as const

/**
 * Flatten all skills into a single array for validation
 */
const ALL_SKILLS = Object.values(SKILLS_CATEGORIES).flat()

/**
 * Step 6: Skills & Qualifications
 * Multi-select ONLY from predefined list
 * No free text allowed
 * At least one skill must be selected
 */
export const step6Schema = z.object({
  skills: z
    .array(z.enum(ALL_SKILLS as [string, ...string[]]))
    .min(1, 'Please select at least one skill')
    .refine(
      (skills) => {
        // Ensure all selected skills are valid
        return skills.every(skill => ALL_SKILLS.includes(skill))
      },
      'Invalid skill selected'
    ),
})

export type Step6Data = z.infer<typeof step6Schema>
