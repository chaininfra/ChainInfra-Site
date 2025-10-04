"use client"
import Link from 'next/link';
import { useState } from "react";
import type { BlogPost } from "@/data/blogPosts";
import BlogPostSchema from "@/components/BlogPostSchema";

// Lazy load heavy dependencies
import dynamic from 'next/dynamic';

// Lazy load SyntaxHighlighter (heaviest dependency)
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => ({ default: mod.Prism })), {
  ssr: false,
  loading: () => <div className="bg-gray-100 p-4 rounded animate-pulse">Loading code...</div>
});

// Lazy load oneDark theme (not needed for now)
// const oneDark = dynamic(() => import('react-syntax-highlighter/dist/esm/styles/prism').then(mod => ({ default: mod.oneDark })), {
//   ssr: false
// });

// Lazy load UI components
const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })));
const Badge = dynamic(() => import('@/components/ui/badge').then(mod => ({ default: mod.Badge })));
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })));
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardContent })));
const Alert = dynamic(() => import('@/components/ui/alert').then(mod => ({ default: mod.Alert })));
const AlertTitle = dynamic(() => import('@/components/ui/alert').then(mod => ({ default: mod.AlertTitle })));
const AlertDescription = dynamic(() => import('@/components/ui/alert').then(mod => ({ default: mod.AlertDescription })));

// Import icons directly for now to avoid dynamic import complexity
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

// Lazy load date-fns
const formatDate = async (dateString: string) => {
  const { format, parseISO } = await import('date-fns');
  return format(parseISO(dateString), 'MMMM dd, yyyy');
};

interface BlogPostProps {
  post: BlogPost;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Lazy load date formatting
  useState(() => {
    formatDate(post.date).then(setFormattedDate);
  });

  // Normalize image URLs to Supabase public URL if content uses /images/...
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const toAbsoluteImageUrl = (src: string | undefined) => {
    if (!src) return src;
    if (src.startsWith('http')) return src;
    if (src.startsWith('/images/') && supabaseUrl) {
      const fileName = src.replace('/images/', '');
      return `${supabaseUrl}/storage/v1/object/public/blog-images/${fileName}`;
    }
    return src;
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const processContent = (content: string) => {
    // Check if content contains HTML tags (from rich editor)
    const hasHTMLTags = /<[^>]*>/g.test(content);
    
    if (hasHTMLTags) {
      // Process HTML content from rich editor
      return (
        <div 
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // For markdown content, just return as plain text for now
    // We can add markdown processing later if needed
    return (
      <div className="blog-content prose prose-lg max-w-none whitespace-pre-wrap">
        {content}
      </div>
    );
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
                 <Link href="/blog" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
           <ArrowLeft className="w-4 h-4 mr-2" />
           Back to Blog
         </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                     <div className="flex items-center">
             <Calendar className="w-4 h-4 mr-2" />
             {formattedDate || post.date}
           </div>
           <div className="flex items-center">
             <User className="w-4 h-4 mr-2" />
             {post.author}
           </div>
           {post.readTime && (
             <div className="flex items-center">
               <Clock className="w-4 h-4 mr-2" />
               {post.readTime}
             </div>
           )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {post.excerpt && (
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Featured Image */}
      {post.headerImage && (
        <div className="mb-8">
          <img
            src={toAbsoluteImageUrl(post.headerImage)}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {processContent(post.content)}
      </div>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Share this post</h3>
                   <Button onClick={handleShare} variant="outline" size="sm">
           <Share2 className="w-4 h-4 mr-2" />
           Share
         </Button>
        </div>
      </div>

      {/* Schema.org markup */}
      <BlogPostSchema post={post} />
    </article>
  );
};

export default BlogPost;