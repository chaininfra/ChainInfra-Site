-- Enable Row Level Security on blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access to published blog posts
CREATE POLICY "Allow public access to published blog posts"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (published = true);