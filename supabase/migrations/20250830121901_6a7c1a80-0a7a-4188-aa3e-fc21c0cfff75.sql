-- Remove existing RLS policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON public.blog_posts;

-- Create new policy for public read access to published posts
CREATE POLICY "Published blog posts are publicly viewable"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Disable RLS since we don't need authentication anymore
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;