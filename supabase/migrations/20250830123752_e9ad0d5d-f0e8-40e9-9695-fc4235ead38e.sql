-- Update the blog-images bucket to be private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'blog-images';

-- Drop the existing public policy
DROP POLICY "Public read access for blog images" ON storage.objects;

-- Create policy for public read access to blog images (even though bucket is private, we allow public read through RLS)
CREATE POLICY "Public read access for blog images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'blog-images');