"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { Search, Filter, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { getPublishedBlogPosts } from "@/services/blogService";
import type { BlogPost } from "@/data/blogPosts";
import FadeOnScroll from "@/components/FadeOnScroll";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "RootSec - Blog";
    
    // Fetch blog posts from Supabase
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPublishedBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    const searchParam = searchParams.get('search');
    
    if (tagParam) {
      setSelectedTag(tagParam);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  // Filter and sort posts based on search term and selected tag
  const filteredPosts = blogPosts
    .filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get posts to display (limited by visiblePosts)
  const postsToShow = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = filteredPosts.length > visiblePosts;

  // Reset visible posts when filters change
  useEffect(() => {
    setVisiblePosts(POSTS_PER_PAGE);
  }, [searchTerm, selectedTag]);

  // Update URL when tag changes
  const updateURL = (tag: string | null, search: string = searchTerm) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    
    if (search && search.trim()) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });
  };

  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    updateURL(newTag);
  };

  const handleShowMore = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedTag(null);
    setVisiblePosts(POSTS_PER_PAGE);
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In-depth security research, exploit development, and technical write-ups covering real-world penetration testing, red teaming operations, and phishing campaigns
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 cyber-border"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="cyber-border border-cyber-blue/50 hover:bg-cyber-blue/10"
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center space-x-2 mr-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by tag:</span>
            </div>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? "bg-cyber-blue text-background hover:bg-cyber-blue/80"
                    : "border-border hover:border-cyber-blue/50 hover:text-cyber-blue"
                }`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {postsToShow.length} of {filteredPosts.length} posts
            {selectedTag && (
              <span className="text-cyber-blue"> in "{selectedTag}"</span>
            )}
            {searchTerm && (
              <span className="text-cyber-blue"> matching "{searchTerm}"</span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyber-blue mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading posts...</p>
          </div>
        ) : postsToShow.length > 0 ? (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {postsToShow.map((post) => (
                <FadeOnScroll key={post.id}>
                  <BlogCard post={post} />
                </FadeOnScroll>
              ))}
            </div>
            
            {/* Show More Button */}
            {hasMorePosts && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleShowMore}
                  className="cyber-border bg-gradient-primary hover:shadow-lg hover:shadow-cyber-blue/30 transition-all px-8 py-3"
                >
                  Show More Posts ({filteredPosts.length - visiblePosts} remaining)
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or clearing the filters.
              </p>
              <Button 
                onClick={handleClearFilters}
                className="cyber-border bg-gradient-primary hover:shadow-lg hover:shadow-cyber-blue/30 transition-all"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
