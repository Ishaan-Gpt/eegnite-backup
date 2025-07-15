-- Migration: Create ContactSubmission table for contact form submissions
CREATE TABLE IF NOT EXISTS "ContactSubmission" (
  id serial PRIMARY KEY,
  firstName text NOT NULL,
  lastName text NOT NULL,
  email text NOT NULL,
  company text,
  website text,
  phone text,
  service text NOT NULL,
  budget text NOT NULL,
  message text NOT NULL,
  newsletter boolean NOT NULL,
  createdAt timestamp with time zone DEFAULT timezone('utc'::text, now())
); 