import { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';
import { getPublishedBlogPosts } from '@/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl;
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/delegator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live_data`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trust-transparency`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedBlogPosts();
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...blogPosts];
}
