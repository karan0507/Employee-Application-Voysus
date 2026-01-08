-- ============================================================================
-- VOYSUS JOB APPLICATION DATABASE SETUP
-- ============================================================================
-- Execute this in Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste and Run
--
-- IMPORTANT: After running this script, verify RLS policies are working:
--   npm run db:verify
--
-- If you see INSERT errors (code: 42501), run the RLS policies section again
-- See claude/RLS-SETUP-GUIDE.md for detailed troubleshooting
-- ============================================================================

-- Drop existing table if re-running (CAREFUL IN PRODUCTION)
-- DROP TABLE IF EXISTS job_applications CASCADE;

-- ============================================================================
-- TABLE: job_applications
-- ============================================================================
CREATE TABLE IF NOT EXISTS job_applications (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Application data (full payload as JSON)
  payload JSONB NOT NULL,

  -- Duplicate prevention (extracted from payload for indexing)
  email TEXT NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'approved', 'rejected')),

  -- Source tracking
  source TEXT DEFAULT 'web',

  -- Version tracking
  version TEXT DEFAULT 'v1.0',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Unique constraint: One application per email
CREATE UNIQUE INDEX IF NOT EXISTS idx_applications_email
  ON job_applications(email);

-- Performance indexes for admin queries
CREATE INDEX IF NOT EXISTS idx_applications_created
  ON job_applications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_status
  ON job_applications(status);

CREATE INDEX IF NOT EXISTS idx_applications_version
  ON job_applications(version);

-- JSONB index for querying nested fields (if needed)
CREATE INDEX IF NOT EXISTS idx_applications_payload_gin
  ON job_applications USING GIN (payload);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow anonymous insert" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous read" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous update" ON job_applications;
DROP POLICY IF EXISTS "Deny anonymous delete" ON job_applications;

-- Policy 1: Allow INSERT for anonymous users (public form submission)
CREATE POLICY "Allow anonymous insert"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Deny SELECT for anonymous users (prevent data reading from frontend)
CREATE POLICY "Deny anonymous read"
  ON job_applications
  FOR SELECT
  TO anon
  USING (false);

-- Policy 3: Deny UPDATE for anonymous users
CREATE POLICY "Deny anonymous update"
  ON job_applications
  FOR UPDATE
  TO anon
  USING (false);

-- Policy 4: Deny DELETE for anonymous users
CREATE POLICY "Deny anonymous delete"
  ON job_applications
  FOR DELETE
  TO anon
  USING (false);

-- ============================================================================
-- ADMIN ACCESS (authenticated service_role has full access by default)
-- ============================================================================
-- Admins can access via Supabase dashboard or service_role key
-- No additional policies needed

-- ============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_job_applications_updated_at ON job_applications;

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- ============================================================================

-- 1. Check table exists
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'job_applications';

-- 2. Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'job_applications';

-- 3. Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'job_applications';

-- 4. Check policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'job_applications';

-- ============================================================================
-- SAMPLE INSERT (Test after frontend integration)
-- ============================================================================
-- INSERT INTO job_applications (payload, email)
-- VALUES (
--   '{"personalDetails": {"firstName": "Test", "email": "test@example.com"}}'::jsonb,
--   'test@example.com'
-- );

-- ============================================================================
-- SAMPLE QUERIES (Admin use only - won't work from frontend due to RLS)
-- ============================================================================

-- View all applications
-- SELECT id, email, status, created_at FROM job_applications ORDER BY created_at DESC;

-- Count applications by status
-- SELECT status, COUNT(*) FROM job_applications GROUP BY status;

-- View payload for specific application
-- SELECT payload FROM job_applications WHERE id = 'uuid-here';

-- ============================================================================
-- CLEANUP (Use with caution)
-- ============================================================================
-- DELETE FROM job_applications WHERE email = 'test@example.com';
-- TRUNCATE TABLE job_applications; -- Delete all data
-- DROP TABLE job_applications CASCADE; -- Delete table completely
