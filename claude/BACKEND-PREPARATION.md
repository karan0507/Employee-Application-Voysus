# Backend Preparation Guide

**Last Updated:** 2026-01-05
**Status:** Planning Document

---

## Overview

While the current implementation is frontend-only, the code is structured to facilitate easy backend integration. This document outlines the expected backend architecture and integration points.

---

## Database Schema (EXACT SPECIFICATION)

### Applications Table

```sql
CREATE TABLE applications (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE,

  -- Status Management
  status VARCHAR(50) DEFAULT 'pending',
  -- Values: pending, reviewing, interview_scheduled, hired, rejected

  -- Step 1: Personal Details
  first_name VARCHAR(50) NOT NULL CHECK (char_length(first_name) >= 2),
  middle_name VARCHAR(50) NOT NULL CHECK (char_length(middle_name) >= 1),
  last_name VARCHAR(50) NOT NULL CHECK (char_length(last_name) >= 2),
  email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone VARCHAR(20) NOT NULL,
  alternate_phone VARCHAR(20),

  -- Step 2: Address
  residential_street VARCHAR(255) NOT NULL CHECK (char_length(residential_street) >= 5),
  residential_city VARCHAR(100) NOT NULL CHECK (char_length(residential_city) >= 2),
  residential_province VARCHAR(2) NOT NULL CHECK (residential_province IN ('AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT')),
  residential_postal_code VARCHAR(7) NOT NULL,

  mailing_street VARCHAR(255) NOT NULL CHECK (char_length(mailing_street) >= 5),
  mailing_city VARCHAR(100) NOT NULL CHECK (char_length(mailing_city) >= 2),
  mailing_province VARCHAR(2) NOT NULL CHECK (mailing_province IN ('AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT')),
  mailing_postal_code VARCHAR(7) NOT NULL,

  -- Step 3: Private Information (ENCRYPTED FIELDS)
  date_of_birth DATE NOT NULL CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years'),
  sin_encrypted TEXT NOT NULL,  -- MUST be encrypted with AES-256
  eligible_to_work BOOLEAN NOT NULL,
  criminal_record BOOLEAN NOT NULL,
  referral VARCHAR(100),

  -- Step 4: Education
  education_level VARCHAR(100) NOT NULL CHECK (education_level IN ('High School','Some College','Associate Degree','Bachelor''s Degree','Master''s Degree','Doctorate','Trade Certificate','Other')),
  field_of_study VARCHAR(100) NOT NULL CHECK (char_length(field_of_study) >= 2),
  institution_name VARCHAR(255) NOT NULL CHECK (char_length(institution_name) >= 2),
  graduation_year INTEGER NOT NULL CHECK (graduation_year >= 1950 AND graduation_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 5),

  -- Step 5: Employment (SINGLE ENTRY ONLY)
  company_name VARCHAR(100) NOT NULL CHECK (char_length(company_name) >= 2),
  position_held VARCHAR(100) NOT NULL CHECK (char_length(position_held) >= 2),
  employment_start_date VARCHAR(7) NOT NULL,  -- Format: YYYY-MM
  employment_end_date VARCHAR(7),  -- Format: YYYY-MM or NULL if current
  currently_employed BOOLEAN DEFAULT FALSE,
  reason_for_leaving TEXT NOT NULL,  -- 10-200 words validated client-side
  job_duties TEXT NOT NULL,  -- 10-200 words validated client-side
  supervisor_name VARCHAR(100),
  supervisor_phone VARCHAR(20),
  may_contact_employer BOOLEAN,

  -- Step 6: Skills (Array of skill names)
  skills TEXT[] NOT NULL CHECK (array_length(skills, 1) >= 1),

  -- Step 7: Experience
  why_voysus TEXT NOT NULL,  -- 20-200 words validated client-side

  -- Admin Management
  admin_notes TEXT,
  reviewed_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Constraints
  CONSTRAINT check_end_date_after_start CHECK (
    currently_employed = TRUE OR
    employment_end_date IS NULL OR
    employment_end_date >= employment_start_date
  ),
  CONSTRAINT unique_email_per_day UNIQUE(email, DATE(created_at))
);

-- Indexes for Performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_applications_email ON applications USING btree(email);
CREATE INDEX idx_applications_name ON applications USING btree(last_name, first_name);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Admin Users Table

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer',
  -- viewer, reviewer, manager, admin
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

### Application Activity Log

```sql
CREATE TABLE application_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  admin_user_id UUID REFERENCES admin_users(id),
  action VARCHAR(100) NOT NULL,
  -- status_changed, note_added, email_sent, etc.
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_application ON application_activity(application_id);
```

---

## API Endpoints (Expected)

### Public Endpoints (No Auth Required)

#### Submit Application
```
POST /api/applications
Content-Type: application/json

Request Body:
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
    sin: string          // Will be encrypted server-side
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
    startDate: string     // YYYY-MM
    endDate?: string      // YYYY-MM
    current: boolean
    reasonForLeaving: string
    jobDuties: string
    supervisorName?: string
    supervisorPhone?: string
    mayContact?: boolean
  },
  skills: string[],
  experience: {
    whyVoysus: string
  }
}

Response (Success):
{
  success: true
  applicationId: string
  message: string
  referenceNumber: string  // For user reference
}

Response (Error):
{
  success: false
  error: {
    code: string
    message: string
    field?: string
  }
}
```

### Admin Endpoints (Auth Required)

#### Get All Applications
```
GET /api/admin/applications?status=pending&page=1&limit=20
Authorization: Bearer {token}

Response:
{
  applications: Array<Application>,
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
```

#### Get Single Application
```
GET /api/admin/applications/:id
Authorization: Bearer {token}

Response:
{
  application: Application
  activity: Array<ActivityLog>
}
```

#### Update Application Status
```
PATCH /api/admin/applications/:id/status
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  status: 'reviewing' | 'interview_scheduled' | 'hired' | 'rejected'
  note?: string
}

Response:
{
  success: true
  application: Application
}
```

#### Add Admin Note
```
POST /api/admin/applications/:id/notes
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  note: string
}

Response:
{
  success: true
  noteId: string
}
```

#### Admin Login
```
POST /api/admin/auth/login
Content-Type: application/json

Request:
{
  email: string
  password: string
}

Response:
{
  success: true
  token: string
  user: {
    id: string
    email: string
    fullName: string
    role: string
  }
}
```

---

## Security Requirements

### Data Encryption
- **SIN:** Must be encrypted at rest (AES-256)
- **Passwords:** Bcrypt with salt rounds >= 12
- **Tokens:** JWT with secure secret, 24hr expiry

### Input Validation
- Server-side validation using Zod (same schemas)
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize inputs)
- CSRF protection (tokens for admin)

### Rate Limiting
```
Public endpoints: 5 requests/minute/IP
Admin endpoints: 100 requests/minute/user
Login endpoint: 3 failed attempts = 15min lockout
```

### CORS Configuration
```javascript
{
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}
```

---

## Email Notifications

### Applicant Emails

#### Application Received
```
To: applicant.email
Subject: Application Received - Voysus
Template: application-received.html

Content:
- Thank you message
- Reference number
- Next steps
- Timeline expectations
```

#### Application Status Update
```
To: applicant.email
Subject: Application Status Update - Voysus
Template: status-update.html

Content:
- Status change notification
- Next steps
- Contact information
```

### Admin Emails

#### New Application Submitted
```
To: admin@voysus.com
Subject: New Application Submitted
Template: new-application-admin.html

Content:
- Applicant name
- Link to review
- Submitted timestamp
```

---

## Admin Portal Requirements

### Dashboard Page
- Total applications count
- Applications by status (chart)
- Recent applications (last 10)
- Quick filters

### Applications List
- Searchable table
- Filter by status
- Sort by date/name
- Pagination
- Bulk actions

### Application Detail View
- All submitted information
- Status timeline
- Admin notes section
- Action buttons (approve, reject, schedule interview)
- Print/export functionality

### User Management
- List admin users
- Create new admin
- Assign roles
- Deactivate users

---

## Frontend Integration Points

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.voysus.com
NEXT_PUBLIC_ENV=production
```

### API Service Layer
```typescript
// lib/api/application.service.ts
export const applicationService = {
  submit: async (data: ApplicationData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
```

### Submission Flow Update
```typescript
// In Zustand store
submitApplication: async () => {
  try {
    set({ isSubmitting: true, error: null })

    // Prepare data
    const payload = prepareSubmissionPayload(get())

    // Submit to backend
    const result = await applicationService.submit(payload)

    if (result.success) {
      // Clear form
      get().resetForm()
      // Navigate to success
      router.push(`/application-success?ref=${result.referenceNumber}`)
    } else {
      set({ error: result.error.message })
    }
  } catch (error) {
    set({ error: 'Failed to submit application. Please try again.' })
  } finally {
    set({ isSubmitting: false })
  }
}
```

---

## Error Handling

### Client-Side
- Network errors
- Validation errors
- Timeout errors
- Display user-friendly messages

### Server-Side
- Database connection errors
- Validation failures
- Duplicate submissions
- Rate limit exceeded
- Return appropriate HTTP status codes

### Error Codes
```typescript
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER_ERROR = 'SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND'
}
```

---

## Testing Strategy

### Backend Testing
- Unit tests for validation
- Integration tests for API endpoints
- E2E tests for critical flows
- Load testing for submission endpoint

### Frontend Integration Testing
- Mock API responses
- Test error handling
- Test success flow
- Test network failures

---

## Deployment Pipeline

### Backend
```
GitHub → Build → Test → Deploy to Staging → Manual Approval → Production
```

### Database Migrations
```
Flyway or similar for version control
Rollback strategy required
Test on staging first
```

### Environment Stages
- **Development:** Local development
- **Staging:** QA testing
- **Production:** Live application

---

## Monitoring & Analytics

### Application Metrics
- Submissions per day
- Completion rate (started vs submitted)
- Average time to complete
- Abandonment points

### Performance Metrics
- API response times
- Database query performance
- Error rates
- Uptime

### Admin Metrics
- Applications reviewed per day
- Average review time
- Status distribution
- Time to hire

---

## Compliance & Privacy

### GDPR/Privacy Requirements
- Data retention policy (how long to keep applications)
- Right to deletion (applicants can request removal)
- Data export (provide copy of their data)
- Consent tracking

### Audit Trail
- Log all data access
- Log status changes
- Log admin actions
- Retention: 7 years

---

## Migration Checklist

When integrating backend:

- [ ] Update environment variables
- [ ] Create API service layer
- [ ] Update submission flow
- [ ] Add error handling
- [ ] Test success flow
- [ ] Test error scenarios
- [ ] Update success page with reference number
- [ ] Add loading states
- [ ] Configure CORS
- [ ] Set up monitoring
- [ ] Test on staging
- [ ] Deploy to production
- [ ] Monitor for errors

---

## Future Enhancements

### Phase 1
- Resume upload
- Document verification
- Reference check automation

### Phase 2
- Interview scheduling
- Calendar integration
- Automated email campaigns

### Phase 3
- AI-powered screening
- Chatbot for FAQs
- Mobile app

---

This document should be updated as backend requirements evolve.
