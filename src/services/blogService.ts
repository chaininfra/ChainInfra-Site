import { supabase } from "@/integrations/supabase/client";
import { supabaseServer } from "@/integrations/supabase/server";
import type { BlogPost } from "@/data/blogPosts";

// Helper function to get the appropriate Supabase client
const getSupabaseClient = () => {
  // Check if we're on the server side
  return typeof window === 'undefined' ? supabaseServer : supabase;
};

export interface DatabaseBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  tags: string[];
  featured: boolean;
  newest: boolean;
  author: string;
  published: boolean;
  header_image: string | null;
  created_at: string;
  updated_at: string;
}

// Convert database blog post to frontend format
export const convertDbPostToBlogPost = (dbPost: DatabaseBlogPost): BlogPost => ({
  id: dbPost.slug, // Use slug as id for frontend compatibility
  title: dbPost.title,
  excerpt: dbPost.excerpt,
  content: dbPost.content,
  date: dbPost.date.split('T')[0], // Convert ISO date to YYYY-MM-DD format
  readTime: dbPost.read_time,
  tags: dbPost.tags || [], // Ensure tags is always an array
  featured: dbPost.featured,
  newest: dbPost.newest,
  author: dbPost.author,
  published: dbPost.published,
  headerImage: dbPost.header_image || undefined,
});

// Convert frontend blog post to database format for creation
export const convertBlogPostToDbPost = (post: BlogPost) => ({
  slug: post.id,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  date: post.date,
  read_time: post.readTime,
  tags: post.tags,
  featured: post.featured || false,
  newest: post.newest || false,
  author: post.author,
  published: post.published,
  header_image: post.headerImage || null,
});

// Fetch all published blog posts
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const client = getSupabaseClient();
  
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return data.map(convertDbPostToBlogPost);
};

// Fetch all blog posts (including unpublished - for admin use)
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    throw error;
  }

  return data.map(convertDbPostToBlogPost);
};

// Fetch a single blog post by slug (admin version - includes unpublished)
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No rows found
    }
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return convertDbPostToBlogPost(data);
};

// Fetch a single blog post by slug (public version - published only)
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No rows found
    }
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return convertDbPostToBlogPost(data);
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching featured blog posts:', error);
    throw error;
  }

  return data.map(convertDbPostToBlogPost);
};

// Get recent blog posts
export const getRecentBlogPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent blog posts:', error);
    throw error;
  }

  return data.map(convertDbPostToBlogPost);
};

// Create a new blog post
export const createBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  const client = await getSupabaseClient();
  const dbPost = convertBlogPostToDbPost(post);
  
  const { data, error } = await client
    .from('blog_posts')
    .insert(dbPost)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return convertDbPostToBlogPost(data);
};

// Update an existing blog post
export const updateBlogPost = async (slug: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
  const client = await getSupabaseClient();
  const dbUpdates: Partial<DatabaseBlogPost> = {};
  
  if (updates.title) dbUpdates.title = updates.title;
  if (updates.excerpt) dbUpdates.excerpt = updates.excerpt;
  if (updates.content) dbUpdates.content = updates.content;
  if (updates.date) dbUpdates.date = updates.date;
  if (updates.readTime) dbUpdates.read_time = updates.readTime;
  if (updates.tags) dbUpdates.tags = updates.tags;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.newest !== undefined) dbUpdates.newest = updates.newest;
  if (updates.author) dbUpdates.author = updates.author;
  if (updates.published !== undefined) dbUpdates.published = updates.published;
  if (updates.headerImage !== undefined) dbUpdates.header_image = updates.headerImage || null;
  
  const { data, error } = await client
    .from('blog_posts')
    .update(dbUpdates)
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }

  return convertDbPostToBlogPost(data);
};

// Delete a blog post
export const deleteBlogPost = async (slug: string): Promise<void> => {
  const client = await getSupabaseClient();
  const { error } = await client
    .from('blog_posts')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

// Search blog posts
export const searchBlogPosts = async (query: string, tag?: string): Promise<BlogPost[]> => {
  const client = await getSupabaseClient();
  let supabaseQuery = client
    .from('blog_posts')
    .select('*')
    .eq('published', true);

  if (query) {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);
  }

  if (tag) {
    supabaseQuery = supabaseQuery.contains('tags', [tag]);
  }

  const { data, error } = await supabaseQuery.order('date', { ascending: false });

  if (error) {
    console.error('Error searching blog posts:', error);
    throw error;
  }

  return data.map(convertDbPostToBlogPost);
};