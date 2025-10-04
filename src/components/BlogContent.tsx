"use client"
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { Search, Filter, Tag, BookOpen, Users, Settings, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/data/blogPosts";
import FadeOnScroll from "@/components/FadeOnScroll";
import { validatorConfig } from '@/lib/validator-config';

const POSTS_PER_PAGE = 6;

interface BlogContentProps {
  initialPosts: BlogPost[];
  initialTag?: string;
  initialSearch?: string;
}

export default function BlogContent({ 
  initialPosts, 
  initialTag = "", 
  initialSearch = "" 
}: BlogContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    document.title = "Blog - ChainInfra";
  }, []);

  // Fetch blog posts on client-side if not provided
  useEffect(() => {
    if (initialPosts.length === 0) {
      const fetchPosts = async () => {
        try {
          const { getPublishedBlogPosts } = await import('@/services/blogService');
          const posts = await getPublishedBlogPosts();
          setBlogPosts(posts);
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [initialPosts]);

  // Define blog categories
  const blogCategories = [
    {
      id: 'ops-upgrades',
      name: 'Ops & Upgrades',
      description: 'Validator operations, infrastructure updates, and technical improvements',
      icon: <Settings className="h-5 w-5" />,
      color: 'cyber-blue'
    },
    {
      id: 'community-governance',
      name: 'Community & Governance',
      description: 'Community engagement, governance participation, and ecosystem development',
      icon: <Users className="h-5 w-5" />,
      color: 'cyber-green'
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Educational content, guides, and resources for blockchain users',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'cyber-purple'
    }
  ];

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

  // Update URL when filters change
  const updateURL = (tag: string | null, search: string = searchTerm) => {
    const params = new URLSearchParams();
    
    if (tag) {
      params.set('tag', tag);
    }
    
    if (search && search.trim()) {
      params.set('search', search);
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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Debounce URL update for search
    const timeoutId = setTimeout(() => {
      updateURL(selectedTag, value);
    }, 500);
    
    return () => clearTimeout(timeoutId);
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
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <div className="text-center mb-32">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BookOpen className="h-10 w-10 text-cyber-green" />
            <h1 className="text-5xl md:text-6xl font-bold glow-text">
              <span className="text-cyber-blue">Blog</span>
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Stay updated with technical analysis, staking guides, and community developments
          </p>
          
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Keep posts short, action-oriented, linking back to explorer/metrics. 
                Categories: Ops & Upgrades, Community & Governance, Education.
              </p>
            </div>
          </FadeOnScroll>
        </div>

        {/* Blog Categories */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Blog Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Organized content for different aspects of blockchain operations
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 grid-rows-1">
            {blogCategories.map((category, index) => (
              <FadeOnScroll key={index}>
                <div className="bg-gradient-card p-8 rounded-xl cyber-border hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-500 h-full flex flex-col group">
                  {/* Icon */}
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className={`inline-flex p-3 rounded-lg bg-${category.color}/10`}>
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-blue transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed flex-grow text-base">
                    {category.description}
                  </p>
                </div>
              </FadeOnScroll>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blockchain insights, validator guides, or staking topics..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
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
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : postsToShow.length > 0 ? (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {postsToShow.map((post) => (
                <FadeOnScroll key={post.id}>
                  <div className="h-full">
                    <BlogCard post={post} />
                  </div>
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

        {/* External Resources */}
        <div className="mt-20">
          <FadeOnScroll>
            <div className="bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5 rounded-2xl p-8 cyber-border">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Quick Links</h3>
                <p className="text-muted-foreground">Access validator metrics and explorer data</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href={validatorConfig.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-all duration-300 group"
                >
                  <ExternalLink className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold group-hover:text-cyber-blue transition-colors duration-300">Metal Explorer</h4>
                    <p className="text-sm text-muted-foreground">View validator metrics and delegation data</p>
                  </div>
                </a>
                
                <a 
                  href="/live_data"
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-cyber-blue/10 transition-all duration-300 group"
                >
                  <ExternalLink className="h-6 w-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold group-hover:text-cyber-blue transition-colors duration-300">Live Data</h4>
                    <p className="text-sm text-muted-foreground">Real-time validator performance metrics</p>
                  </div>
                </a>
              </div>
            </div>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
}