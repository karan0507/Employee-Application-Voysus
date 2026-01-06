# Voysus Employment Application - Project Scope

**Last Updated:** 2026-01-05
**Status:** Locked - Only update when explicitly instructed

---

## Project Overview

A multi-step employment application form for Voysus, built with Next.js 16, Zustand, and shadcn/ui. This is a FRONTEND-ONLY implementation that will later integrate with a backend and admin portal.

---

## Technology Stack

- **Framework:** Next.js 16.0.10 (App Router)
- **State Management:** Zustand 5.0.9
- **Validation:** Zod 3.25.76
- **Forms:** react-hook-form 7.60.0
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS 4.1.9
- **TypeScript:** 5.x

---

## Global Constraints (STRICT)

### 1. SCOPE: FRONTEND ONLY
- NO backend code
- NO API endpoints
- NO authentication implementation
- NO Supabase integration (yet)
- Focus on UI/UX, validation, and state management

### 2. NO UI REDESIGN
- Maintain existing layout and styling
- Only fix:
  - Component overlaps
  - Responsiveness issues
  - Broken behavior
  - Visual bugs

### 3. NO NEW LIBRARIES
- Use existing dependencies ONLY
- Zod is allowed (already present)
- Zustand stays as state manager
- No additional state management libraries

### 4. REMOVE AUTOSAVE COMPLETELY
- Data persists ONLY when clicking "Next"
- NO background saving
- NO save-on-change logic
- NO automatic persistence

### 5. MULTI-STEP VALIDATION
- "Next" button enabled ONLY when current step is valid
- No invalid progression allowed
- Validation must be deterministic and instant

### 6. NOT GIT-INTEGRATED
- Make incremental, minimal changes
- Avoid large refactors unless explicitly required
- Test thoroughly before committing changes

### 7. PREPARE FOR FUTURE BACKEND
- Structure code for easy backend integration
- Keep separation of concerns
- Document API shape expectations
- Plan for admin portal integration

---

## Core Problems to Fix

1. **Random "Next" button disabled** - isValid state is stale/incorrect
2. **No centralized validation** - Each step validates inconsistently
3. **Autosave causing issues** - Interferes with validation flow
4. **Landing page scroll overlap** - Text overlays UI elements
5. **Unnecessary fields** - Remove fields not in requirements
6. **Step count mismatch** - Currently 10 steps, should be 7

---

## Architecture Principles

### Validation Rules
- **Centralized:** All validation in one predictable place
- **Deterministic:** Same input = same validation result
- **Re-runs on change:** Every relevant change triggers validation
- **Derived state:** `isValid` is computed, never manually set
- **Schema-based:** Use Zod schemas per step

### State Management
- **Zustand for app state** - Form data, current step, completion status
- **NO persistence for sensitive fields** - DOB, SIN must not persist
- **Persistence only for non-sensitive** - Names, education, etc.
- **Clear on submission** - Data cleared after successful submit

### Component Structure
```
app/
  page.tsx              (Landing page)
  apply/page.tsx        (Multi-step form container)

components/
  form/
    steps/              (Step components)
    form-navigation.tsx (Next/Back buttons)
    form-progress.tsx   (Progress indicator)

lib/
  validation/           (Zod schemas per step)
  store/               (Zustand store)
```

---

## Development Guidelines

### DO:
- Write clean, readable TypeScript
- Use existing UI components from shadcn/ui
- Follow mobile-first responsive design
- Add inline validation errors (minimal)
- Keep components focused and single-purpose
- Document complex logic
- Test on mobile and desktop

### DON'T:
- Create backend endpoints
- Add authentication flows
- Integrate databases
- Build admin UI
- Add unnecessary animations
- Over-engineer solutions
- Add analytics or tracking
- Redesign the visual style

---

## Out of Scope (DO NOT IMPLEMENT)

- Backend API development
- Database schema design
- Authentication/authorization
- Admin portal UI
- Email notifications
- Payment processing
- Analytics integration
- Performance monitoring
- A/B testing
- Internationalization (i18n)

---

## Future Integrations (Prepare For)

### Backend Integration
- RESTful API or GraphQL endpoint
- `/api/applications` POST endpoint expected
- JSON payload with all form data
- Response with application ID

### Admin Portal
- View submitted applications
- Filter/search functionality
- Application status management
- Applicant communication tools

### Database Schema
- Applications table with all fields
- Audit trail for status changes
- Admin user management
- Role-based access control

---

## Success Criteria

1. All 7 steps follow exact requirements
2. Validation is instant and deterministic
3. "Next" button behavior is predictable
4. No autosave anywhere
5. Form works on mobile and desktop
6. No visual overlaps or bugs
7. Code is clean and documented
8. Ready for backend integration

---

## Notes

- This document should only be updated when explicitly instructed
- All changes must maintain consistency with constraints
- Any deviation from scope requires user approval
- When in doubt, ask before proceeding
