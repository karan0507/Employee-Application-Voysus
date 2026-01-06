# Form Step Requirements

**Last Updated:** 2026-01-05
**Status:** Locked - These are the exact requirements

---

## Overview

The employment application consists of **7 steps**. Each step has specific required and optional fields. Validation must prevent progression unless all required fields are valid.

---

## Step 1: Personal Details

### Required Fields (*)
- **First Name*** - Text input, 2-50 characters
- **Middle Name*** - Text input, 1-50 characters
- **Last Name*** - Text input, 2-50 characters
- **Email*** - Valid email format
- **Phone*** - Valid Canadian phone format (xxx-xxx-xxxx or similar)

### Optional Fields
- **Alternate Phone** - Valid phone format if provided

### Validation Rules
- Names: Letters, spaces, hyphens, apostrophes only
- Email: Standard email validation (Zod email schema)
- Phone: (xxx) xxx-xxxx or xxx-xxx-xxxx format
- No special characters except those listed

### Notes
- All fields except Alternate Phone are mandatory
- Trim whitespace before validation
- Display inline errors on blur or on Next click

---

## Step 2: Address

### Required Fields (*)
- **Street Address*** - Text input
- **City*** - Text input
- **Province*** - Dropdown (Canadian provinces)
- **Postal Code*** - Canadian format (A1A 1A1)

### Optional Fields
None - all address fields are required

### Additional Features
- **Mailing Address Sync**
  - Checkbox: "Mailing address same as residential"
  - If checked, copy residential to mailing
  - If unchecked, show separate mailing address fields

### Validation Rules
- Postal Code: Canadian format with validation
- Province: Must be valid Canadian province
- Street, City: 2-100 characters

### Notes
- Keep existing sync behavior
- Validate both residential and mailing if different

---

## Step 3: Private & Security Questions

### Title
Rename from "Position Details" to "Private & Security Questions" or similar appropriate name

### Required Fields (*)
- **Date of Birth*** - Date picker (MM/DD/YYYY)
- **Social Insurance Number (SIN)*** - Formatted input (xxx-xxx-xxx)
- **Are you legally eligible to work in Canada?*** - Radio buttons (Yes/No)
- **Have you ever been convicted of a criminal offence?*** - Radio buttons (Yes/No)

### Optional Fields
- **Referral** - Text input
  - Label: "Were you referred by someone? (Name / Team)"
  - Placeholder: "Name / Team"
  - Max 100 characters

### Validation Rules
- DOB: Must be 18+ years old
- SIN: Valid Canadian SIN format (9 digits)
- Radio buttons: Must select one option
- Referral: Free text, no special validation

### Security Notes
- **DO NOT persist DOB or SIN in localStorage**
- These fields should only exist in-memory
- Clear on page refresh or navigation away
- Will be sent to backend on final submission only

---

## Step 4: Education Background

### Keep Existing Structure
- Maintain current education fields
- No changes required unless validation is broken

### Required Fields (*)
- **Highest Level of Education*** - Dropdown
- **Field of Study*** - Text input (if applicable)
- **Institution Name*** - Text input
- **Graduation Year*** - Year picker

### Validation Rules
- All fields required
- Year must be reasonable (1950 - current year + 5)

### REMOVE
- **Position Availability** - Delete entirely from this step

---

## Step 5: Employment History

### CRITICAL: ONLY ONE EMPLOYMENT ENTRY
Remove "Employment History 2" completely. Only keep one employment history section.

### Required Fields (*)
- **Company Name*** - Text input, 2-100 characters
- **Position Held*** - Text input, 2-100 characters
- **Start Date*** - Date picker (MM/YYYY)
- **End Date OR Current Checkbox***
  - Date picker (MM/YYYY) OR
  - Checkbox: "I currently work here"
  - If checkbox checked, disable End Date
- **Reason for Leaving*** - Textarea, max 200 words
- **Job Duties*** - Textarea, max 200 words

### Optional Fields
- **Supervisor Name** - Text input
- **Supervisor Phone** - Phone format
- **May we contact your employer?** - Radio buttons (Yes/No)

### Validation Rules
- Start Date must be before End Date (if End Date provided)
- If "Current" checked, End Date not required
- Reason for Leaving: 10-200 words
- Job Duties: 10-200 words
- Word count validation on textareas

### Notes
- DO NOT allow adding multiple employment histories
- This is intentional - one entry only
- Keep it simple and focused

---

## Step 6: Skills & Qualifications

### REBUILD FROM SCRATCH
Complete redesign of skills section - multi-select only, no free text.

### Categories (5 categories)

Each category has exactly 5 skills to choose from:

#### 1. CS Inbound
- Email Support
- Live Chat Support
- Phone Support
- Ticketing Systems
- Complaint Resolution

#### 2. CS Outbound
- Follow-up Calls
- Customer Surveys
- Proactive Support
- Account Management
- Retention Campaigns

#### 3. Collections
- Payment Processing
- Debt Recovery
- Negotiation Skills
- Account Reconciliation
- Skip Tracing

#### 4. Telemarketing
- Lead Generation
- Appointment Setting
- Product Promotion
- Market Research
- Cold Calling

#### 5. Inside Sales
- CRM Management
- Consultative Selling
- Upselling/Cross-selling
- Pipeline Management
- Closing Techniques

### UI Requirements
- Display as 5 collapsible sections or tabs
- Each category shows 5 checkboxes
- Multi-select enabled (check as many as apply)
- No free-text input allowed
- No "Other" option

### Validation Rules
- At least ONE skill must be selected across all categories
- No maximum limit
- Must select from predefined list only

### Notes
- These skills reflect current customer service market
- Categories are mutually exclusive in display
- Skills within categories are multi-selectable

---

## Step 7: Experience Question

### Required Fields (*)
- **Why do you want to join Voysus?*** - Textarea, max 200 words

### Validation Rules
- Minimum 20 words
- Maximum 200 words
- Cannot be empty or only whitespace
- Display word count below textarea

### Notes
- This is the final step before review
- Keep it simple and focused
- No additional questions needed

---

## REMOVED STEPS

The following steps must be completely removed:

### Step 8: Professional References (REMOVE)
Delete entirely

### Step 9: Additional Information (REMOVE)
Delete entirely

### Step 10: Review (REMOVE)
Delete entirely - or convert to a simple confirmation page

---

## Review/Submission Flow

### After Step 7
1. Show review summary (optional, can be simple)
2. "Submit Application" button
3. On submit:
   - Validate all steps one final time
   - Show loading state
   - Prepare JSON payload
   - (Later: POST to backend)
   - Navigate to success page

### Success Page
- Confirmation message
- Application reference number (later from backend)
- Next steps information
- Link back to home

---

## Validation Summary by Step

| Step | Required Fields | Optional Fields | Special Validation |
|------|----------------|-----------------|-------------------|
| 1 | 5 | 1 | Email, phone format |
| 2 | 4 (or 8 if different mailing) | 0 | Postal code, sync logic |
| 3 | 4 | 1 | Age 18+, SIN format, no persistence |
| 4 | 4 | 0 | Year range |
| 5 | 6 | 3 | Date logic, word count |
| 6 | 1+ | 0 | At least one skill |
| 7 | 1 | 0 | Word count (20-200) |

---

## Notes for Implementation

1. Create Zod schema for each step
2. Export schemas from `lib/validation/schemas.ts`
3. Use schemas in step components
4. Derive `isValid` from schema validation
5. Update form navigation to use validation state
6. Remove all autosave logic
7. Test thoroughly on mobile and desktop
