export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  newest?: boolean; // New field for newest posts
  author: string;
  published: boolean; // New field to control visibility
  headerImage?: string; // Optional header image for each post
}

// All blog functionality now handled by Supabase in blogService.ts