# Project Constraints (STRICT RULES)

**Last Updated:** 2026-01-05
**Status:** LOCKED - These constraints must NEVER be violated

---

## ⛔ ABSOLUTE CONSTRAINTS

These rules are non-negotiable and must be followed at all times.

### 1. FRONTEND ONLY
```
❌ DO NOT CREATE:
- Backend API endpoints
- Server-side authentication
- Database connections
- Supabase integration
- Server actions (beyond Next.js defaults)
- WebSocket servers
- GraphQL servers

✅ ALLOWED:
- Client-side code only
- Next.js App Router (client components)
- Client-side state management
- Local validation
- UI components
```

### 2. NO AUTOSAVE
```
❌ FORBIDDEN:
- Automatic save on field change
- Background save timers
- Save on blur
- Debounced auto-persistence
- "Draft saved" messages

✅ ALLOWED:
- Save ONLY on "Next" button click
- Explicit localStorage for non-sensitive data
- Manual form reset
```

### 3. NO UI REDESIGN
```
❌ DO NOT:
- Change color schemes
- Redesign layouts
- Add new animations
- Change typography
- Modify brand styling
- Add visual effects

✅ ALLOWED:
- Fix overlapping elements
- Improve responsiveness
- Fix broken layouts
- Add minimal validation errors
- Adjust spacing for mobile
```

### 4. NO NEW DEPENDENCIES
```
❌ DO NOT ADD:
- New state management libraries
- New validation libraries (Zod is enough)
- New form libraries (react-hook-form is enough)
- UI frameworks beyond shadcn
- Animation libraries
- Date libraries (date-fns exists)

✅ USE EXISTING:
- Zustand (state)
- Zod (validation)
- react-hook-form (forms)
- shadcn/ui (components)
- date-fns (dates)
```

### 5. NO BACKEND IMPLEMENTATION
```
❌ DO NOT BUILD:
- REST APIs
- GraphQL endpoints
- Database models
- Email services
- File upload handling
- Payment processing
- User authentication

✅ PREPARE FOR:
- Document expected API shape
- Structure frontend for easy integration
- Keep separation of concerns
- Plan data flow
```

---

## 🔒 VALIDATION CONSTRAINTS

### Centralized Validation ONLY
```typescript
// ❌ WRONG - Validation in component
const Step1 = () => {
  const [isValid, setIsValid] = useState(false)

  const validateForm = () => {
    if (firstName && lastName && email) {
      setIsValid(true)
    }
  }

  return <NextButton disabled={!isValid} />
}

// ✅ CORRECT - Schema-driven validation
const Step1 = () => {
  const data = useStore(state => state.personalDetails)
  const isValid = step1Schema.safeParse(data).success

  return <NextButton disabled={!isValid} />
}
```

### Validation Rules
1. **MUST use Zod schemas** - No manual validation logic
2. **MUST be deterministic** - Same input = same result
3. **MUST re-run on change** - Never stale validation state
4. **MUST be derived** - Never manually set `isValid`
5. **NO component-level validation** - All in schemas

---

## 🔐 SECURITY CONSTRAINTS

### Sensitive Data Rules
```typescript
// ❌ FORBIDDEN - Persisting sensitive data
const store = persist((state) => ({
  ...state,
  dateOfBirth: state.privateInfo.dateOfBirth,  // NO!
  sin: state.privateInfo.sin,                  // NO!
}))

// ✅ CORRECT - Exclude sensitive fields
const store = persist((state) => ({
  personalDetails: state.personalDetails,
  address: state.address,
  // privateInfo NOT included
  education: state.education,
  employment: state.employment,
  skills: state.skills,
  experience: state.experience,
}))
```

### NEVER Persist
- Date of Birth (DOB)
- Social Insurance Number (SIN)
- Criminal record answers
- Any PII beyond name/email/phone

### ALWAYS Clear
- Sensitive fields on page refresh
- All data on successful submission
- Validation errors on step change

---

## 📝 STEP CONSTRAINTS

### Step Count: EXACTLY 7
```
✅ REQUIRED STEPS:
Step 1: Personal Details
Step 2: Address
Step 3: Private & Security Questions
Step 4: Education Background
Step 5: Employment History (ONE ENTRY ONLY)
Step 6: Skills & Qualifications
Step 7: Experience Question

❌ REMOVED STEPS:
Step 8: Professional References - DELETE
Step 9: Additional Information - DELETE
Step 10: Review - DELETE (or simplify to confirmation)
```

### Field Constraints
- **NO additional fields** unless explicitly required
- **NO "Position Availability"** - removed from education
- **NO "Employment History 2"** - single entry only
- **NO free-text skills** - multi-select only
- **NO references section** - removed entirely

---

## 🚫 NAVIGATION CONSTRAINTS

### Next Button Rules
```typescript
// ❌ WRONG - Always enabled
<Button onClick={nextStep}>Next</Button>

// ❌ WRONG - Manual validation
const [canProceed, setCanProceed] = useState(false)
<Button disabled={!canProceed}>Next</Button>

// ✅ CORRECT - Schema-driven
const isStepValid = validateCurrentStep()
<Button disabled={!isStepValid}>Next</Button>
```

### Progression Rules
1. **CANNOT skip steps** - Must go in order
2. **CANNOT go Next if invalid** - Validation blocks progression
3. **CAN go Back anytime** - No validation required
4. **MUST validate on Next click** - Final check before advancing
5. **NO navigation menu** - Linear progression only

---

## 💾 STATE MANAGEMENT CONSTRAINTS

### Zustand Rules
```typescript
// ✅ CORRECT Store Structure
interface ApplicationStore {
  // Data by step
  personalDetails: Step1Data
  address: Step2Data
  privateInfo: Step3Data  // NOT persisted
  education: Step4Data
  employment: Step5Data
  skills: Step6Data
  experience: Step7Data

  // Navigation
  currentStep: number

  // Actions (NOT computed)
  setPersonalDetails: (data: Step1Data) => void
  nextStep: () => void

  // Derived (computed, not stored)
  getIsStepValid: (step: number) => boolean
}

// ❌ WRONG - Storing derived state
interface ApplicationStore {
  isStep1Valid: boolean  // NO! Derive this
  canProceed: boolean    // NO! Compute this
}
```

### State Rules
1. **ONLY store data** - Not computed values
2. **Derive validation** - Don't store isValid
3. **Use actions for updates** - Not direct mutations
4. **Persist selectively** - Not sensitive fields
5. **Clear on submit** - Reset after success

---

## 🎨 STYLING CONSTRAINTS

### Tailwind Only
```typescript
// ✅ ALLOWED
<div className="flex flex-col gap-4 p-6">

// ❌ FORBIDDEN
<div style={{ display: 'flex', flexDirection: 'column' }}>

// ❌ FORBIDDEN
import './custom-styles.css'
```

### Styling Rules
1. **Use Tailwind classes** - No inline styles
2. **Use shadcn components** - No custom components
3. **Mobile-first** - Start with mobile, then desktop
4. **No CSS files** - Tailwind only
5. **No CSS-in-JS** - Unless from shadcn

---

## 🧪 VALIDATION CONSTRAINTS (Detailed)

### Field-Level Validation
```typescript
// ✅ CORRECT - Zod schema
export const emailField = z.string().email()

// ❌ WRONG - Manual regex
const validateEmail = (email: string) => {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email)
}
```

### Validation Timing
- **onChange:** Update store, trigger validation
- **onBlur:** Show errors if invalid
- **onNext:** Final validation before progression
- **NEVER:** Skip validation to force progression

---

## 📱 RESPONSIVENESS CONSTRAINTS

### Breakpoints
```
Mobile: 0-640px (base)
Tablet: 640-1024px (md)
Desktop: 1024px+ (lg)
```

### Rules
1. **Mobile-first design** - Base styles for mobile
2. **Test on real devices** - Not just browser resize
3. **Touch-friendly targets** - Min 44x44px buttons
4. **Readable text** - Min 16px font size
5. **No horizontal scroll** - Ever

---

## 🚀 PERFORMANCE CONSTRAINTS

### Bundle Size
- Keep under 500KB initial bundle
- Code split by route
- Lazy load heavy components
- No unnecessary dependencies

### Rendering
- Minimize re-renders
- Memoize expensive computations
- Debounce validation (max 300ms)
- Virtualize long lists (if any)

---

## 📚 CODE QUALITY CONSTRAINTS

### TypeScript
```typescript
// ✅ CORRECT - Strongly typed
interface PersonalDetails {
  firstName: string
  lastName: string
  email: string
}

// ❌ WRONG - Any types
const data: any = getFormData()
```

### Rules
1. **NO `any` types** - Use proper typing
2. **NO `@ts-ignore`** - Fix the error instead
3. **USE type inference** - Let TS infer when possible
4. **EXPORT types** - From schema inference
5. **DOCUMENT complex logic** - Comments for why, not what

---

## ⚠️ GIT CONSTRAINTS

### Commit Rules
1. **Small, incremental commits** - Not giant refactors
2. **Test before commit** - Ensure nothing breaks
3. **Descriptive messages** - Explain what and why
4. **No force push** - Unless absolutely necessary
5. **Branch per feature** - If using branches

### What NOT to Commit
- `node_modules/`
- `.next/`
- `.env` files
- IDE config (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)
- Build artifacts

---

## 🔄 REFACTORING CONSTRAINTS

### When to Refactor
- Fixing bugs
- Improving validation
- Removing autosave
- Consolidating steps

### When NOT to Refactor
- "Making it better" without clear goal
- Changing working code for style
- Premature optimization
- Speculative changes

### Rules
1. **Make it work, then make it good** - Not perfect
2. **One change at a time** - Don't mix refactors
3. **Test thoroughly** - Before and after
4. **Document breaking changes** - In commit messages
5. **Ask before major refactors** - Get approval first

---

## 🎯 SCOPE CONSTRAINTS

### IN SCOPE
- Multi-step form implementation
- Client-side validation
- State management
- UI bug fixes
- Responsiveness improvements
- Code organization

### OUT OF SCOPE
- Backend development
- Database design
- API implementation
- Authentication
- Admin portal
- Analytics
- Email integration
- File uploads
- Payment processing

---

## 📋 CHECKLIST FOR EVERY CHANGE

Before making ANY change, verify:

- [ ] Is this frontend only?
- [ ] Does this maintain existing UI style?
- [ ] Does this use existing dependencies?
- [ ] Does this remove autosave (not add it)?
- [ ] Does this use Zod for validation?
- [ ] Does this avoid persisting sensitive data?
- [ ] Does this follow the 7-step structure?
- [ ] Does this enable Next only when valid?
- [ ] Is this tested on mobile?
- [ ] Is this a minimal, focused change?

If ANY answer is NO, STOP and reconsider.

---

## 🚨 WHEN IN DOUBT

If you're unsure whether something violates a constraint:

1. **STOP** - Don't proceed
2. **CHECK** this document
3. **ASK** the user for clarification
4. **WAIT** for approval
5. **DOCUMENT** the decision

**Better to ask than to violate constraints.**

---

## 📞 EMERGENCY CONTACTS

If constraints conflict with requirements:
1. Document the conflict
2. Present options to user
3. Get explicit approval
4. Update this document
5. Proceed with approved solution

**These constraints exist to keep the project focused and maintainable.**
