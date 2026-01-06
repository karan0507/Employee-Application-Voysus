# Backend Implementation Scope

**Created**: 2026-01-06
**Status**: Implementation Phase
**Token Budget**: Complete before 80% usage (160,000 tokens)
**Current**: 49.2% (98,380/200,000)

## Objective
Implement minimal, production-safe Supabase backend for job application form submission.

## Strict Constraints
- ✅ One database table only
- ✅ No admin UI
- ✅ No authentication
- ✅ No edge functions
- ✅ No reads from frontend (write-only)
- ✅ JSONB payload storage
- ✅ No breaking frontend changes
- ✅ Handle 50-100 concurrent submissions
- ✅ One submission per email (duplicate prevention)

## Implementation Steps

### Step 1: Database Setup (SQL)
**File**: Manual execution in Supabase SQL Editor

```sql
-- Table: job_applications
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payload JSONB NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'submitted',
  source TEXT DEFAULT 'web',
  version TEXT DEFAULT 'v1.0',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for duplicate prevention
CREATE UNIQUE INDEX idx_applications_email ON job_applications(email);

-- Index for querying (admin use)
CREATE INDEX idx_applications_created ON job_applications(created_at DESC);
CREATE INDEX idx_applications_status ON job_applications(status);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow INSERT only for anon
CREATE POLICY "Allow anonymous insert"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Deny all SELECT/UPDATE/DELETE for anon
CREATE POLICY "Deny anonymous read"
  ON job_applications
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "Deny anonymous update"
  ON job_applications
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Deny anonymous delete"
  ON job_applications
  FOR DELETE
  TO anon
  USING (false);
```

### Step 2: Environment Variables
**File**: `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### Step 3: Supabase Client
**File**: `lib/supabase/client.ts`

### Step 4: Backend Service
**File**: `lib/services/supabase-application.service.ts`
- Replace mock in `lib/services/application.service.ts`

### Step 5: Frontend Integration
**File**: `app/apply/page.tsx`
- Update import to use real service
- No UI changes

### Step 6: Error Handling
- Duplicate email detection
- Network errors
- Validation errors
- Clear console logs

## Security Measures
1. **RLS Policies**: INSERT only, no reads from frontend
2. **Duplicate Prevention**: Unique constraint on email
3. **Rate Limiting**: Handled by Supabase (default: 100 req/sec per IP)
4. **Payload Validation**: Frontend validates, backend stores atomically
5. **No Secrets Exposure**: Anon key is public-safe

## Load Management (100 concurrent users)
1. **Database**: Supabase auto-scales, handles 1000s of concurrent writes
2. **Connection Pooling**: Built-in with Supabase
3. **Atomic Writes**: Single INSERT statement
4. **No Transactions**: Not needed for single table insert
5. **Indexes**: Created for performance

## Success Criteria
- ✅ Form submits successfully
- ✅ Data appears in Supabase dashboard
- ✅ Duplicate email shows user-friendly error
- ✅ Network errors handled gracefully
- ✅ No console errors
- ✅ Success page shows reference number
- ✅ Store clears on success

## Files Created/Modified
1. `claude/BACKEND-SCOPE.md` - This file
2. `lib/supabase/client.ts` - NEW
3. `lib/services/supabase-application.service.ts` - NEW
4. `lib/services/application.service.ts` - UPDATE (import change)
5. `.env.local` - UPDATE (add Supabase vars)
6. `.env.example` - UPDATE (document vars)

## Files NOT Modified
- No step components
- No validation schemas
- No store logic
- No UI components
- No styling

## Testing Checklist
- [ ] Submit form with valid data → Success
- [ ] Submit same email twice → Error message
- [ ] Submit with network off → Error message
- [ ] Check Supabase dashboard → Data exists
- [ ] Verify JSONB payload structure
- [ ] Verify RLS policies work (no SELECT from frontend)
- [ ] Test with 10 rapid submissions → All succeed

## Error Scenarios Handled
1. **Duplicate Email**: "Application already submitted with this email"
2. **Network Error**: "Network error. Please check connection and try again"
3. **Validation Error**: "Invalid data format. Please refresh and try again"
4. **Unknown Error**: "Submission failed. Please try again or contact support"

## Production Notes
- Supabase free tier: 500MB database, 2GB bandwidth/month
- Upgrade if expecting >1000 applications/month
- Monitor Supabase dashboard for usage
- Backup: Supabase auto-backups (paid plans)
- Export data via Supabase SQL editor when needed
