# Technical Architecture

**Last Updated:** 2026-01-05
**Status:** Reference Document

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                  │
├─────────────────────────────────────────────────────────┤
│  Landing Page (/)           Application Form (/apply)   │
│  - Hero Section             - Multi-step Form           │
│  - Benefits                 - Progress Indicator        │
│  - CTA                      - Validation                │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    Zustand Store                        │
│  - Form Data (all steps)                                │
│  - Current Step Index                                   │
│  - Completion Status                                    │
│  - Persistence (localStorage for non-sensitive)         │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Validation Layer (Zod)                 │
│  - Step 1 Schema    - Step 5 Schema                     │
│  - Step 2 Schema    - Step 6 Schema                     │
│  - Step 3 Schema    - Step 7 Schema                     │
│  - Step 4 Schema    - Final Composition                 │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│              UI Components (shadcn/ui)                  │
│  - Form Inputs      - Progress Bar                      │
│  - Select Dropdowns - Navigation Buttons                │
│  - Radio Groups     - Validation Messages               │
└─────────────────────────────────────────────────────────┘
```

---

## Validation Architecture (CRITICAL)

### Principles

1. **Schema-Driven:** Every step has a Zod schema
2. **Centralized:** All validation logic in `lib/validation/`
3. **Deterministic:** Same data = same validation result
4. **Reactive:** Validation re-runs on every relevant change
5. **Derived:** `isValid` is computed, never set manually

### Implementation Pattern

```typescript
// lib/validation/step1.schema.ts
import { z } from 'zod'

export const step1Schema = z.object({
  firstName: z.string().min(2).max(50),
  middleName: z.string().min(1).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  alternatePhone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/).optional(),
})

export type Step1Data = z.infer<typeof step1Schema>
```

### Validation Flow

```
User Input
    ↓
Form Field onChange
    ↓
Update Zustand Store
    ↓
Trigger Validation (Zod Schema)
    ↓
Compute isValid (boolean)
    ↓
Enable/Disable Next Button
```

### Validation Timing

- **On change:** Live validation for immediate feedback
- **On blur:** Show errors after user leaves field
- **On Next click:** Final validation before progression
- **Never:** Manual override of validation state

---

## State Management (Zustand)

### Store Structure

```typescript
interface ApplicationStore {
  // Current step (0-6)
  currentStep: number

  // Form data by step
  personalDetails: Step1Data
  address: Step2Data
  privateInfo: Step3Data  // NOT persisted
  education: Step4Data
  employment: Step5Data
  skills: Step6Data
  experience: Step7Data

  // Validation state (computed)
  getStepValidity: (step: number) => boolean

  // Actions
  setCurrentStep: (step: number) => void
  updatePersonalDetails: (data: Partial<Step1Data>) => void
  updateAddress: (data: Partial<Step2Data>) => void
  // ... etc

  // Navigation
  nextStep: () => void
  prevStep: () => void

  // Submission
  submitApplication: () => Promise<void>
  resetForm: () => void
}
```

### Persistence Rules

**PERSIST (localStorage):**
- Personal details (name, email, phone)
- Address information
- Education background
- Employment history
- Skills selected
- Experience answer

**DO NOT PERSIST:**
- Date of Birth (DOB)
- Social Insurance Number (SIN)
- Any sensitive personal information

**Persistence Implementation:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // store implementation
    }),
    {
      name: 'voysus-application',
      partialize: (state) => ({
        // Only persist non-sensitive fields
        personalDetails: state.personalDetails,
        address: state.address,
        // DO NOT include privateInfo
        education: state.education,
        employment: state.employment,
        skills: state.skills,
        experience: state.experience,
      })
    }
  )
)
```

---

## Component Structure

### Directory Organization

```
app/
├── page.tsx                    # Landing page
├── apply/
│   └── page.tsx               # Multi-step form container
├── application-success/
│   └── page.tsx               # Success confirmation
└── layout.tsx                 # Root layout

components/
├── form/
│   ├── steps/
│   │   ├── step1-personal.tsx
│   │   ├── step2-address.tsx
│   │   ├── step3-private.tsx
│   │   ├── step4-education.tsx
│   │   ├── step5-employment.tsx
│   │   ├── step6-skills.tsx
│   │   └── step7-experience.tsx
│   ├── form-navigation.tsx    # Next/Back buttons
│   ├── form-progress.tsx      # Progress indicator
│   ├── form-header.tsx        # Step title/description
│   ├── form-input.tsx         # Reusable input wrapper
│   ├── form-select.tsx        # Reusable select wrapper
│   └── form-textarea.tsx      # Reusable textarea wrapper
├── landing/
│   ├── hero-section.tsx
│   ├── benefits-section.tsx
│   ├── positions-section.tsx
│   └── cta-section.tsx
└── ui/
    └── [shadcn components]

lib/
├── validation/
│   ├── schemas.ts             # All Zod schemas
│   ├── step1.schema.ts
│   ├── step2.schema.ts
│   ├── step3.schema.ts
│   ├── step4.schema.ts
│   ├── step5.schema.ts
│   ├── step6.schema.ts
│   └── step7.schema.ts
├── store/
│   └── application-store.ts   # Zustand store
└── utils.ts                   # Utility functions
```

### Component Responsibilities

#### Step Components
- Render form fields for their step
- Read data from Zustand store
- Update store on field change
- Display validation errors
- NO validation logic (handled by schemas)
- NO Next/Back buttons (handled by navigation component)

#### Form Navigation
- Display Next/Back buttons
- Enable/disable based on validation
- Handle step progression
- Show loading states
- NO form data management

#### Form Progress
- Display current step indicator
- Show step titles
- Visual progress bar
- NO navigation logic

---

## Data Flow

### User Input Flow
```
User types in field
    ↓
onChange handler fires
    ↓
Zustand action called
    ↓
Store state updated
    ↓
Component re-renders
    ↓
Validation runs automatically
    ↓
isValid computed
    ↓
Next button enabled/disabled
```

### Navigation Flow
```
User clicks Next
    ↓
Validate current step (final check)
    ↓
If valid:
  - Save step data to store
  - Increment currentStep
  - Scroll to top
  - Render next step
    ↓
If invalid:
  - Show error messages
  - Focus first invalid field
  - Do not progress
```

### Submission Flow
```
User completes Step 7
    ↓
Clicks Submit
    ↓
Validate ALL steps
    ↓
If all valid:
  - Prepare JSON payload
  - (Future: POST to /api/applications)
  - Show success page
  - Clear form data
    ↓
If any invalid:
  - Jump to first invalid step
  - Show errors
  - Do not submit
```

---

## Backend Integration (Future)

### API Contract

**Endpoint:** `POST /api/applications`

**Request Payload:**
```typescript
{
  personalDetails: {
    firstName: string
    middleName: string
    lastName: string
    email: string
    phone: string
    alternatePhone?: string
  },
  address: {
    residential: {
      street: string
      city: string
      province: string
      postalCode: string
    },
    mailing: {
      street: string
      city: string
      province: string
      postalCode: string
    }
  },
  privateInfo: {
    dateOfBirth: string  // YYYY-MM-DD
    sin: string
    eligibleToWork: boolean
    criminalRecord: boolean
    referral?: string
  },
  education: {
    level: string
    fieldOfStudy: string
    institution: string
    graduationYear: number
  },
  employment: {
    companyName: string
    position: string
    startDate: string    // YYYY-MM
    endDate?: string     // YYYY-MM
    current: boolean
    reasonForLeaving: string
    jobDuties: string
    supervisorName?: string
    supervisorPhone?: string
    mayContact?: boolean
  },
  skills: string[]       // Array of selected skills
  experience: {
    whyVoysus: string
  }
}
```

**Response:**
```typescript
{
  success: boolean
  applicationId: string
  message: string
}
```

### Error Handling
```typescript
{
  success: false
  error: {
    code: string
    message: string
    field?: string
  }
}
```

---

## Security Considerations

### Frontend Security
- NO sensitive data in localStorage
- Clear sensitive fields on unmount
- Validate all inputs client-side
- Sanitize before display
- No inline scripts

### Prepared for Backend
- CSRF protection
- Rate limiting
- Input sanitization
- SQL injection prevention
- XSS protection

---

## Performance Optimization

### Current Optimizations
- React Server Components where possible
- Code splitting by route
- Lazy load heavy components
- Memoize validation functions
- Debounce validation on input

### Future Optimizations
- Edge caching for landing page
- Image optimization
- Bundle size reduction
- Analytics for performance monitoring

---

## Testing Strategy

### Manual Testing Required
1. Fill form step-by-step (happy path)
2. Try to skip steps without completing
3. Enter invalid data and verify errors
4. Test on mobile devices
5. Test address sync functionality
6. Test word count validation
7. Test SIN/DOB not persisting
8. Test form reset on submission

### Validation Testing
- Each field with valid data
- Each field with invalid data
- Edge cases (max length, special chars)
- Empty required fields
- Optional fields left empty

---

## Deployment Considerations

### Environment Variables
```bash
# Future backend integration
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENV=production
```

### Build Process
```bash
pnpm install
pnpm build
pnpm start
```

### Hosting
- Vercel (recommended for Next.js)
- Static export possible but not recommended
- CDN for static assets

---

## Migration Path

### Phase 1: Frontend (Current)
- Multi-step form
- Client-side validation
- Local state management
- No backend

### Phase 2: Backend Integration
- Add API endpoint
- Connect submission flow
- Database persistence
- Email notifications

### Phase 3: Admin Portal
- View applications
- Filter/search
- Status management
- Communication tools

### Phase 4: Enhancements
- Resume upload
- Real-time validation
- Progress save (authenticated)
- Analytics dashboard
