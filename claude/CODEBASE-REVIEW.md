# Codebase Review - Initial Findings

**Date:** 2026-01-05
**Status:** Completed Initial Review

---

## Cleanup Completed

### ✅ Removed
1. **pnpm-lock.yaml** - Removed to use npm exclusively
2. **@vercel/analytics** - Removed from package.json and app/layout.tsx (violates constraints)

### ✅ Verified Clean
- No duplicate folders (employment-application-platform/)
- No zip files
- No test files in project code
- No README or documentation duplicates

---

## Critical Issues Found

### 1. **Autosave Hook (MUST REMOVE)**
**File:** `hooks/use-auto-save.tsx`
- Currently saves every 30 seconds automatically
- Violates constraint: NO AUTOSAVE
- Used in: `app/apply/page.tsx` (lines 19, 44-46)
- **Action Required:** Delete hook and remove usage

### 2. **Anti-Cheat Hook (SHOULD REMOVE)**
**File:** `hooks/use-anti-cheat.tsx`
- Prevents copy/paste/context menu on entire form
- Bad UX for employment application
- Used in: `app/apply/page.tsx` (line 41)
- **Action Required:** Delete hook and remove usage
- **Reason:** Users need to copy/paste their info (email, addresses, etc.)

### 3. **Validation is Hardcoded to TRUE**
**File:** `app/apply/page.tsx` (line 128)
```typescript
isValid={true}  // ❌ WRONG - Always enabled
```
- Next button is ALWAYS enabled
- No actual validation happening
- **Action Required:** Replace with schema-based validation

### 4. **No Zod Schemas Exist**
- No validation schemas found in codebase
- react-hook-form validation is scattered in components
- **Action Required:** Create centralized Zod schemas per step

### 5. **Step Count Mismatch**
**Current:** 10 steps
**Required:** 7 steps

**Current Steps:**
1. ✅ Personal Information (Step1Personal)
2. ✅ Address (Step2Address)
3. ❌ Position & Availability (Step3Position) - Should be "Private & Security Questions"
4. ✅ Education (Step4Education)
5. ✅ Employment History 1 (Step5Employment1)
6. ❌ Employment History 2 (Step6Employment2) - DELETE THIS
7. ❌ Skills & Qualifications (Step7Skills) - Wrong structure
8. ❌ References (Step8References) - DELETE THIS
9. ❌ Additional Information (Step9Additional) - DELETE THIS
10. ❌ Review (Step10Review) - DELETE THIS

### 6. **Sensitive Data is Being Persisted**
**File:** `lib/form-store.ts` (lines 12-13)
```typescript
dateOfBirth: string  // ❌ Should NOT persist
sin: string          // ❌ Should NOT persist
```
- DOB and SIN are in the persisted store
- Violates security constraints
- **Action Required:** Separate sensitive data from persisted state

### 7. **Field Mismatches**

**Step 1 (Personal) Issues:**
- ✅ Has: firstName, middleName, lastName, email, phone
- ❌ Has DOB and SIN (should be in Step 3)
- ❌ Missing: alternatePhone (should be optional)

**Step 3 (Position) Issues:**
- ❌ Currently asks: position applying, start date, salary, employment type, relocate
- ✅ Should ask: DOB, SIN, work eligibility, criminal record, referral
- **Action Required:** Complete rebuild of Step 3

**Step 5 (Employment) Issues:**
- Has most required fields
- Missing: "May we contact employer?" Yes/No
- Missing: Current checkbox for end date

**Step 6 (Employment History 2) Issues:**
- ❌ Should not exist at all
- **Action Required:** Delete entire step

**Step 7 (Skills) Issues:**
- ❌ Current: Generic technical skills, languages, driver license
- ✅ Should have: 5 categories (CS Inbound, CS Outbound, Collections, Telemarketing, Inside Sales)
- **Action Required:** Complete rebuild

### 8. **Missing Steps**
- No "Why do you want to join Voysus?" step (should be Step 7)

---

## Form Store Issues

**File:** `lib/form-store.ts`

### Problems:
1. **Flat structure** - All fields in one object, no organization by step
2. **Sensitive data persisted** - DOB, SIN stored in localStorage
3. **No validation helpers** - No getStepValidity function
4. **Incorrect fields** - Many fields don't match requirements

### Required Structure:
```typescript
interface FormStore {
  currentStep: number

  // Step data (organized)
  personalDetails: Step1Data
  address: Step2Data
  privateInfo: Step3Data  // NOT persisted
  education: Step4Data
  employment: Step5Data
  skills: Step6Data
  experience: Step7Data

  // Actions
  updatePersonalDetails: (data: Step1Data) => void
  // ... etc

  // Validation (computed, not stored)
  getStepValidity: (step: number) => boolean
}
```

---

## Component Issues

### FormNavigation
**File:** `components/form/form-navigation.tsx`
- Line 52: "Auto-saves every 30 seconds" text - REMOVE
- Receives `isValid` prop but it's always true
- **Action Required:** Connect to actual validation

### Step Components
All step components use react-hook-form but:
- No integration with Zod schemas
- Validation rules scattered in component files
- No centralized validation
- Hidden submit buttons (line 141/118/176 in various steps)

---

## Unused Dependencies

### Potentially Unused (60 UI components):
Many shadcn/ui components may not be used. Examples:
- accordion, aspect-ratio, avatar, breadcrumb
- carousel, chart, command, context-menu
- drawer, hover-card, kbd, menubar
- navigation-menu, pagination, resizable
- sidebar, skeleton, slider, sonner
- table, tabs (possibly used)
- toggle, toggle-group, tooltip

**Note:** We should keep these for now as shadcn uses them internally.

### Used Dependencies:
- ✅ zustand - State management
- ✅ zod - Validation (but no schemas created yet)
- ✅ react-hook-form - Form handling
- ✅ sonner - Toasts
- ✅ date-fns - Date formatting
- ✅ lucide-react - Icons
- ✅ tailwind + radix-ui - UI

---

## Landing Page Issues

**File:** `components/hero-section.tsx` (line 64-67)
- Scroll indicator with "Scroll to explore" text
- No reported overlap issue visible in code
- **May need CSS inspection in browser**

---

## Summary of Required Changes

### Immediate (Phase 1):
1. ✅ Remove pnpm-lock.yaml
2. ✅ Remove @vercel/analytics
3. ⬜ Remove use-auto-save.tsx hook
4. ⬜ Remove use-anti-cheat.tsx hook
5. ⬜ Remove autosave usage from app/apply/page.tsx

### Critical (Phase 2):
6. ⬜ Create Zod schemas for all 7 steps
7. ⬜ Restructure form store (separate sensitive data)
8. ⬜ Fix validation logic (remove hardcoded true)
9. ⬜ Update TOTAL_STEPS from 10 to 7

### Step Refactoring (Phase 3):
10. ⬜ Keep Step 1 (Personal) - Remove DOB/SIN
11. ⬜ Keep Step 2 (Address) - Verify mailing sync works
12. ⬜ Rebuild Step 3 (Private & Security Questions)
13. ⬜ Keep Step 4 (Education) - Remove position availability
14. ⬜ Update Step 5 (Employment) - Single entry only
15. ⬜ Delete Step 6 (Employment History 2)
16. ⬜ Rebuild Step 7 (Skills) - 5 categories with multi-select
17. ⬜ Create Step 7 (Experience) - "Why Voysus?" question
18. ⬜ Delete Step 8 (References)
19. ⬜ Delete Step 9 (Additional Information)
20. ⬜ Delete Step 10 (Review)

### Final (Phase 4):
21. ⬜ Test all validation
22. ⬜ Test form flow (can't skip invalid steps)
23. ⬜ Test mobile responsiveness
24. ⬜ Fix landing page scroll overlap (if exists)
25. ⬜ Verify no autosave anywhere

---

## Files to Delete

1. `hooks/use-auto-save.tsx`
2. `hooks/use-anti-cheat.tsx`
3. `components/form/steps/step6-employment2.tsx`
4. `components/form/steps/step8-references.tsx`
5. `components/form/steps/step9-additional.tsx`
6. `components/form/steps/step10-review.tsx`

## Files to Create

1. `lib/validation/step1.schema.ts`
2. `lib/validation/step2.schema.ts`
3. `lib/validation/step3.schema.ts`
4. `lib/validation/step4.schema.ts`
5. `lib/validation/step5.schema.ts`
6. `lib/validation/step6.schema.ts`
7. `lib/validation/step7.schema.ts`
8. `lib/validation/schemas.ts` (exports all)

## Files to Rebuild

1. `components/form/steps/step3-position.tsx` → `step3-private.tsx`
2. `components/form/steps/step7-skills.tsx` (complete rebuild)
3. Create new: `components/form/steps/step7-experience.tsx`

## Files to Update

1. `lib/form-store.ts` - Restructure, remove sensitive persistence
2. `app/apply/page.tsx` - Remove autosave, fix validation, update steps
3. `components/form/form-navigation.tsx` - Remove autosave text
4. `components/form/steps/step1-personal.tsx` - Remove DOB/SIN fields
5. `components/form/steps/step5-employment1.tsx` - Add missing fields

---

## Form Reactivity Check

### Current Implementation:
- ✅ Uses react-hook-form with `mode: "onChange"`
- ✅ Forms are reactive (live validation)
- ✅ watch() used to track values
- ❌ Validation state not connected to Next button
- ❌ No Zod schema integration

### Verdict:
Forms ARE reactive and well-structured with react-hook-form, BUT:
- Validation doesn't block progression
- No centralized schemas
- isValid is hardcoded

---

## Next Steps

**Ready for Implementation:**
- All issues documented
- Clear action plan
- Files identified
- Structure planned

**Awaiting User Confirmation:**
- Should we proceed with Phase 1 (remove autosave/anti-cheat)?
- Or start with Phase 2 (create Zod schemas)?
- Or do you want to run `npm run dev` first and test?
