-- ChainInfra Supabase Setup Script
-- Chạy script này trong Supabase SQL Editor

-- ==============================================
-- 1. BLOG POSTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_time TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  newest BOOLEAN DEFAULT false,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  header_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==============================================
-- 2. CONTACT REQUESTS TABLE
-- ==============================================
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

-- ==============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 4. BLOG POSTS POLICIES
-- ==============================================
-- Public read access for published posts
CREATE POLICY "Published blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Admin access for authenticated users
CREATE POLICY "Authenticated users can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (auth.role() = 'authenticated');

-- ==============================================
-- 5. CONTACT REQUESTS POLICIES
-- ==============================================
-- Service role can do everything
CREATE POLICY "Service role can do everything" ON contact_requests
  FOR ALL USING (auth.role() = 'service_role');

-- Users can read their own requests
CREATE POLICY "Users can read their own requests" ON contact_requests
  FOR SELECT USING (auth.email() = email);

-- ==============================================
-- 6. FUNCTIONS AND TRIGGERS
-- ==============================================
-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for contact_requests
CREATE TRIGGER update_contact_requests_updated_at 
  BEFORE UPDATE ON contact_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- 7. INDEXES FOR PERFORMANCE
-- ==============================================
-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON public.blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_newest ON public.blog_posts(newest);

-- Contact requests indexes
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- ==============================================
-- 8. SAMPLE DATA (Optional)
-- ==============================================
-- Insert sample blog post
INSERT INTO public.blog_posts (slug, title, excerpt, content, read_time, author, published, featured, newest) 
VALUES (
  'welcome-to-chaininfra',
  'Welcome to ChainInfra',
  'Your trusted partner for blockchain infrastructure solutions.',
  'ChainInfra is a leading provider of blockchain infrastructure services, specializing in validator operations, node management, and blockchain consulting. We help businesses and organizations leverage the power of blockchain technology to build secure, scalable, and efficient systems.

Our team of experts brings years of experience in blockchain development, validator operations, and infrastructure management. We are committed to providing reliable, secure, and cost-effective solutions that meet the unique needs of our clients.

Whether you are looking to set up a validator node, manage blockchain infrastructure, or need consulting on blockchain implementation, ChainInfra has the expertise and resources to help you succeed.',
  '3 min read',
  'ChainInfra Team',
  true,
  true,
  true
) ON CONFLICT (slug) DO NOTHING;

-- ==============================================
-- 9. VERIFICATION QUERIES
-- ==============================================
-- Check if tables were created successfully
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE tablename IN ('blog_posts', 'contact_requests')
ORDER BY tablename;

-- Check if policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('blog_posts', 'contact_requests')
ORDER BY tablename, policyname;

-- Check if indexes were created
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename IN ('blog_posts', 'contact_requests')
ORDER BY tablename, indexname;

-- ==============================================
-- SETUP COMPLETE!
-- ==============================================
-- Next steps:
-- 1. Configure Authentication URLs in Supabase Dashboard
-- 2. Set up environment variables
-- 3. Test the application
