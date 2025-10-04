'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, Mail, Users, TrendingUp, Calendar } from 'lucide-react';

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  featured: number;
  newest: number;
}

interface ContactStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}

interface AdminStats {
  blogPosts: BlogStats;
  contactRequests: ContactStats;
  lastUpdated: string;
}

export default function AdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch blog posts
        const blogResponse = await fetch('/api/admin/blog-posts');
        const blogData = await blogResponse.json();
        
        // Fetch contact requests
        const contactResponse = await fetch('/api/admin/contact-requests');
        const contactData = await contactResponse.json();
        
        if (blogResponse.ok && contactResponse.ok) {
          const blogPosts = blogData.data || [];
          const contactRequests = contactData.data || [];
          
          // Calculate blog stats
          const blogStats: BlogStats = {
            total: blogPosts.length,
            published: blogPosts.filter((post: any) => post.published).length,
            drafts: blogPosts.filter((post: any) => !post.published).length,
            featured: blogPosts.filter((post: any) => post.featured).length,
            newest: blogPosts.filter((post: any) => post.newest).length,
          };
          
          // Calculate contact stats
          const contactStats: ContactStats = {
            total: contactRequests.length,
            pending: contactRequests.filter((req: any) => req.status === 'pending').length,
            in_progress: contactRequests.filter((req: any) => req.status === 'in_progress').length,
            completed: contactRequests.filter((req: any) => req.status === 'completed').length,
            cancelled: contactRequests.filter((req: any) => req.status === 'cancelled').length,
          };
          
          setStats({
            blogPosts: blogStats,
            contactRequests: contactStats,
            lastUpdated: new Date().toLocaleString(),
          });
        } else {
          setError('Failed to fetch statistics');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-cyber-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading statistics: {error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Dashboard Statistics</h3>
        <div className="text-sm text-muted-foreground">
          Last updated: {stats.lastUpdated}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blog Posts Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts.total}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {stats.blogPosts.published} Published
              </Badge>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {stats.blogPosts.drafts} Drafts
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact Requests Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
            <Mail className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactRequests.total}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {stats.contactRequests.pending} Pending
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {stats.contactRequests.in_progress} In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Featured Content */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Content</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyber-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts.featured}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Featured blog posts
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                {stats.blogPosts.newest} Newest
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Calendar className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.contactRequests.total > 0 
                ? Math.round((stats.contactRequests.completed / stats.contactRequests.total) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Contact requests completed
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {stats.contactRequests.completed} Completed
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blog Posts Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyber-blue" />
              Blog Posts Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Posts</span>
              <Badge variant="secondary">{stats.blogPosts.total}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Published</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {stats.blogPosts.published}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Drafts</span>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {stats.blogPosts.drafts}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Featured</span>
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                {stats.blogPosts.featured}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Newest</span>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {stats.blogPosts.newest}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact Requests Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyber-green" />
              Contact Requests Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Requests</span>
              <Badge variant="secondary">{stats.contactRequests.total}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending</span>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {stats.contactRequests.pending}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">In Progress</span>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {stats.contactRequests.in_progress}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Completed</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {stats.contactRequests.completed}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cancelled</span>
              <Badge variant="outline" className="text-red-600 border-red-600">
                {stats.contactRequests.cancelled}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
