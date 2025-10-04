"use client";

import Link from 'next/link';

// Define BlogPost interface locally to avoid shared dependencies
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  headerImage?: string;
  readTime?: string;
}

interface BlogPostViewerProps {
  post: BlogPost;
}

const BlogPostViewer = ({ post }: BlogPostViewerProps) => {
  // Simple date formatting without any external libraries
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Simple content processing without any external libraries
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
    
    // For plain text, just return with basic formatting
    return (
      <div className="blog-content prose prose-lg max-w-none whitespace-pre-wrap">
        {content}
      </div>
    );
  };

  // Simple share functionality without external libraries
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a simple toast notification here
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyber-blue transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.date)}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-cyber-blue/10 to-cyber-green/10 text-cyber-blue text-sm rounded-full border border-cyber-blue/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.excerpt && (
              <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-6 cyber-border">
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.headerImage && (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl cyber-border">
              <img
                src={post.headerImage}
                alt={post.title}
                className="w-full h-80 md:h-96 object-cover"
                onLoad={() => console.log('Image loaded successfully:', post.headerImage)}
                onError={(e) => console.error('Image failed to load:', post.headerImage, e)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-gradient-card rounded-2xl p-8 md:p-12 cyber-border">
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-cyber-blue prose-a:no-underline hover:prose-a:underline prose-code:text-cyber-green prose-code:bg-cyber-blue/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-cyber-blue/20">
            {processContent(post.content)}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Share This Article</h3>
              <p className="text-muted-foreground mb-6">
                Help others discover valuable blockchain insights and validator knowledge
              </p>
              <button 
                onClick={handleShare}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-green text-white rounded-xl hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Article
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles Suggestion */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyber-blue hover:text-cyber-green transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Explore More Articles
          </Link>
        </div>
      </div>

      {/* Simple Schema.org markup without external components */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.headerImage ? [
              post.headerImage.startsWith('http')
                ? post.headerImage
                : `https://chaininfra.net${post.headerImage}`
            ] : ['https://chaininfra.net/images/og-blog-default.png'],
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(),
            author: {
              '@type': 'Person',
              name: post.author,
              url: 'https://chaininfra.net/profile'
            },
            publisher: {
              '@type': 'Organization',
              name: 'ChainInfra',
              url: 'https://chaininfra.net'
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://chaininfra.net/blog/${post.id}`
            },
            keywords: post.tags.join(', '),
            articleSection: 'Blockchain',
            inLanguage: 'en-US',
            url: `https://chaininfra.net/blog/${post.id}`,
            wordCount: post.content.split(' ').length
          })
        }}
      />
    </article>
  );
};

export default BlogPostViewer;
