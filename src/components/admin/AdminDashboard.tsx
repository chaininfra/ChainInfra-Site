'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Edit, Trash2, Eye, Plus, Search, FileText, Mail, TrendingUp, Quote } from 'lucide-react';
import { getAllBlogPosts, deleteBlogPost } from '@/services/adminService';
import ContactRequests from './ContactRequests';
import AdminStats from './AdminStats';
import TestimonialManagement from './TestimonialManagement';
import type { BlogPost } from '@/data/blogPosts';

export default function AdminDashboard() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingPost, setDeletingPost] = useState<string | null>(null);

  // Fetch all blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
        setFilteredPosts(posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  useEffect(() => {
    const filtered = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, blogPosts]);

  // Handle delete post
  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      setDeletingPost(slug);
      await deleteBlogPost(slug);
      
      // Remove from local state
      setBlogPosts(prev => prev.filter(post => post.id !== slug));
      setFilteredPosts(prev => prev.filter(post => post.id !== slug));
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingPost(null);
    }
  };

  // Handle edit post
  const handleEditPost = (slug: string) => {
    router.push(`/admin/edit/${slug}`);
  };

  // Handle view post
  const handleViewPost = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage blog posts and contact requests
          </p>
        </div>
        <Button onClick={() => router.push('/admin/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Alert className="border-red-500 bg-red-50">
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog Posts ({blogPosts.length})
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Requests
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <Quote className="h-4 w-4" />
            Testimonials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <AdminStats />
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts by title, excerpt, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Posts Grid */}
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>Slug: {post.id}</span>
                        <span>Date: {new Date(post.date).toLocaleDateString()}</span>
                        <span>Read Time: {post.readTime}</span>
                        <span>Author: {post.author}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Status Badges */}
                      <div className="flex gap-2">
                        {post.featured && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Featured
                          </Badge>
                        )}
                        {post.newest && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Newest
                          </Badge>
                        )}
                        {post.published ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Draft
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPost(post.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        disabled={deletingPost === post.id}
                        className="text-red-600 hover:text-red-700"
                      >
                        {deletingPost === post.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No posts found matching your search.' : 'No blog posts yet.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <ContactRequests />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
