import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/data/blogPosts';

export interface CreateBlogPostData {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  readTime: string;
  author: string;
  tags: string[];
  featured: boolean;
  newest: boolean;
  published: boolean;
  headerImage?: string;
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  slug: string;
}

// Create new blog post
export const createBlogPost = async (data: CreateBlogPostData): Promise<BlogPost> => {
  const response = await fetch('/api/admin/blog-posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create blog post');
  }

  const result = await response.json();
  return convertDbPostToBlogPost(result.data);
};

// Get single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`/api/admin/blog-posts/${slug}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch blog post');
  }

  const result = await response.json();
  return convertDbPostToBlogPost(result.data);
};

// Update existing blog post
export const updateBlogPost = async (slug: string, data: UpdateBlogPostData): Promise<BlogPost> => {
  const response = await fetch('/api/admin/blog-posts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug,
      ...data,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update blog post');
  }

  const result = await response.json();
  return convertDbPostToBlogPost(result.data);
};

// Delete blog post
export const deleteBlogPost = async (slug: string): Promise<void> => {
  const response = await fetch(`/api/admin/blog-posts/${slug}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete blog post');
  }
};

// Get all blog posts (including unpublished)
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch('/api/admin/blog-posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch blog posts');
  }

  const result = await response.json();
  return result.data.map(convertDbPostToBlogPost);
};


// Upload image to Supabase Storage
export const uploadImage = async (file: File): Promise<string> => {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF.');
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size too large. Please upload files smaller than 5MB.');
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append('file', file);

  // Upload via API route
  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload image');
  }

  const result = await response.json();
  return result.url;
};

// Delete image from Supabase Storage
export const deleteImage = async (fileName: string): Promise<void> => {
  const response = await fetch('/api/admin/upload', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete image');
  }
};

// Helper function to convert database post to frontend format
const convertDbPostToBlogPost = (dbPost: any): BlogPost => ({
  id: dbPost.slug,
  title: dbPost.title,
  excerpt: dbPost.excerpt,
  content: dbPost.content,
  date: dbPost.date,
  readTime: dbPost.read_time,
  tags: dbPost.tags || [],
  featured: dbPost.featured || false,
  newest: dbPost.newest || false,
  author: dbPost.author,
  published: dbPost.published || false,
  headerImage: dbPost.header_image || undefined,
});
