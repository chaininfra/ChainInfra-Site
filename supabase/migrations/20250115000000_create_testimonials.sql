-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  client_email VARCHAR(255) NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_type VARCHAR(100),
  project_description TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

-- Add RLS (Row Level Security) policies
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy for service role (admin operations)
CREATE POLICY "Service role can do everything" ON testimonials
  FOR ALL USING (auth.role() = 'service_role');

-- Policy for public read access to approved testimonials
CREATE POLICY "Approved testimonials are publicly viewable" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (status = 'approved');

-- Policy for authenticated users to read their own testimonials
CREATE POLICY "Users can read their own testimonials" ON testimonials
  FOR SELECT USING (auth.email() = client_email);

-- Function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_testimonials_updated_at 
  BEFORE UPDATE ON testimonials 
  FOR EACH ROW 
  EXECUTE FUNCTION update_testimonials_updated_at();
