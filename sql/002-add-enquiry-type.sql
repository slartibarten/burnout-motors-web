-- Burnout Motors — migration 002
-- Adds the enquiry type routing column to contact_submissions.
-- Run once in Hostinger's phpMyAdmin or MySQL console, BEFORE deploying the
-- new /api/contact route (the INSERT references this column).
--
-- MySQL has no "ADD COLUMN IF NOT EXISTS" on older 8.0 builds, so if this
-- errors with "Duplicate column name", it has already been applied — carry on.

ALTER TABLE contact_submissions
  ADD COLUMN enquiry_type VARCHAR(32) NOT NULL DEFAULT 'annet' AFTER email;

-- Makes "show me every sponsor lead" a fast query once the table grows.
CREATE INDEX idx_contact_enquiry_type ON contact_submissions (enquiry_type, created_at);
