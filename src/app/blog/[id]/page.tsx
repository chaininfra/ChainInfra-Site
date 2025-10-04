import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostViewer from '@/components/BlogPostViewer';
import { getBlogPostBySlug } from '@/services/blogService';
import { generateBlogPostMetadata } from '@/lib/seo-utils';
import { seoConfig } from '@/lib/seo-config';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.id);
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return generateBlogPostMetadata(post);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `Blog Post | ${seoConfig.siteName}`,
      description: `Blockchain insights and validator articles by ${seoConfig.author}.`,
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await getBlogPostBySlug(params.id);
    
    if (!post) {
      notFound();
    }

    return <BlogPostViewer post={post} />;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

// Force revalidation to ensure fresh data
export const revalidate = 0;

// Disable caching completely
export const dynamic = 'force-dynamic';