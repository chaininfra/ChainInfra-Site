-- Make the blog-images bucket public for public blog image access
UPDATE storage.buckets 
SET public = true 
WHERE name = 'blog-images';