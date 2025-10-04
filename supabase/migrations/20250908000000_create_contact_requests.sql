-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  timeline VARCHAR(100),
  budget VARCHAR(100),
  requirements TEXT NOT NULL,
  additional_info TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);

-- Create index for created_at sorting
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy for service role (admin operations)
CREATE POLICY "Service role can do everything" ON contact_requests
  FOR ALL USING (auth.role() = 'service_role');

-- Policy for authenticated users to read their own requests
CREATE POLICY "Users can read their own requests" ON contact_requests
  FOR SELECT USING (auth.email() = email);

-- Function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_contact_requests_updated_at 
  BEFORE UPDATE ON contact_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
