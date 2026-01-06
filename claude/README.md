# Claude Documentation Folder

This folder contains comprehensive documentation for the Voysus Employment Application project. These documents serve as the permanent reference and should only be updated when explicitly instructed.

---

## Documents

### 1. PROJECT-SCOPE.md
**Purpose:** Main project scope and constraints
**Contains:**
- Project overview
- Technology stack
- Global constraints (frontend only, no redesign, etc.)
- Core problems to fix
- Architecture principles
- Development guidelines
- Success criteria

**When to reference:**
- Starting any new work
- Clarifying project boundaries
- Understanding what's in/out of scope

---

### 2. STEP-REQUIREMENTS.md
**Purpose:** Detailed form step specifications
**Contains:**
- Complete breakdown of all 7 steps
- Required vs optional fields
- Validation rules per step
- Field types and formats
- Removed steps/fields
- Submission flow

**When to reference:**
- Implementing or modifying form steps
- Adding validation
- Understanding field requirements
- Checking what was removed

---

### 3. ARCHITECTURE.md
**Purpose:** Technical architecture and implementation patterns
**Contains:**
- System architecture diagram
- Validation architecture (Zod schemas)
- State management (Zustand)
- Component structure
- Data flow patterns
- Backend integration plans
- Security considerations
- Performance optimization

**When to reference:**
- Understanding code organization
- Implementing validation
- Working with state management
- Planning backend integration
- Making architectural decisions

---

### 4. CONSTRAINTS.md
**Purpose:** Strict rules that must never be violated
**Contains:**
- Absolute constraints (frontend only, no autosave, etc.)
- Validation constraints
- Security constraints (sensitive data handling)
- Step constraints (exactly 7 steps)
- Navigation constraints
- State management constraints
- Styling constraints
- Code quality constraints
- Refactoring rules

**When to reference:**
- Before making ANY change
- When unsure if something is allowed
- As a checklist before commits
- When constraints seem to conflict

---

### 5. BACKEND-PREPARATION.md
**Purpose:** Backend integration planning
**Contains:**
- Expected database schema
- API endpoint specifications
- Security requirements
- Email notification templates
- Admin portal requirements
- Frontend integration points
- Error handling strategy
- Deployment pipeline
- Migration checklist

**When to reference:**
- Planning backend integration
- Understanding API contracts
- Preparing frontend for backend
- When backend development begins

---

## How to Use These Documents

### For Development Work
1. Read **PROJECT-SCOPE.md** first to understand the big picture
2. Check **CONSTRAINTS.md** before making changes
3. Reference **STEP-REQUIREMENTS.md** when working on form steps
4. Use **ARCHITECTURE.md** for implementation patterns
5. Consult **BACKEND-PREPARATION.md** when planning integrations

### For New Team Members
1. Start with **PROJECT-SCOPE.md** - understand what and why
2. Read **CONSTRAINTS.md** - learn what NOT to do
3. Study **ARCHITECTURE.md** - understand how it's built
4. Review **STEP-REQUIREMENTS.md** - know the details
5. Skim **BACKEND-PREPARATION.md** - see the future

### For Claude AI Sessions
- These documents provide context across sessions
- Reference specific documents when asking questions
- Use as source of truth for requirements
- Cite sections when clarifying constraints

---

## Document Update Policy

### When to Update
- Requirements change (explicitly communicated)
- New constraints added
- Architecture decisions made
- Backend plans finalized
- Steps modified

### When NOT to Update
- During normal development
- For minor clarifications
- For bug fixes
- For implementation details

### How to Update
1. Get explicit approval from project owner
2. Update relevant document(s)
3. Update "Last Updated" date
4. Document changes in git commit
5. Notify team of changes

---

## Quick Reference

### Can I...?

**Add a new library?**
→ Check CONSTRAINTS.md → NO (use existing)

**Change the UI design?**
→ Check CONSTRAINTS.md → NO (only bug fixes)

**Add autosave?**
→ Check CONSTRAINTS.md → NO (explicitly forbidden)

**Create backend APIs?**
→ Check PROJECT-SCOPE.md → NO (frontend only)

**Persist SIN/DOB?**
→ Check CONSTRAINTS.md → NO (security constraint)

**Skip step validation?**
→ Check CONSTRAINTS.md → NO (navigation constraint)

**Add a new form step?**
→ Check STEP-REQUIREMENTS.md → NO (exactly 7 steps)

**Refactor the validation?**
→ Check ARCHITECTURE.md → YES (if using Zod schemas)

**Prepare for backend?**
→ Check BACKEND-PREPARATION.md → YES (and here's how)

---

## Contact & Clarifications

If these documents don't answer your question:
1. Review all relevant sections
2. Check if constraints conflict
3. Document the specific question
4. Ask the project owner for clarification
5. Update documentation with the answer

---

**Remember:** These documents exist to keep the project focused, consistent, and maintainable. When in doubt, refer to them. If they're unclear, ask for clarification and update them.

---

Last Updated: 2026-01-05
