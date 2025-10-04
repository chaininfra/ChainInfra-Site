'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';

// Lazy load RichTextEditor to reduce initial bundle size
const LazyRichTextEditor = dynamic(() => import('@/components/ui/LazyRichTextEditor'), {
  loading: () => <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">Loading rich text editor...</div>,
  ssr: false
});
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, X, Plus, Save } from 'lucide-react';
import { createBlogPost, updateBlogPost, getBlogPostBySlug } from '@/services/adminService';
import type { BlogPost } from '@/data/blogPosts';

interface AdminBlogFormProps {
  postId?: string;
}

export default function AdminBlogForm({ postId }: AdminBlogFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    readTime: '',
    author: 'ChainInfra',
    featured: false,
    newest: false,
    published: false,
    tags: [] as string[],
    headerImage: null as File | null,
    headerImageUrl: '' as string,
  });

  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // Load blog post data for edit mode
  useEffect(() => {
    const loadBlogPost = async () => {
      if (postId) {
        setIsEditMode(true);
        setIsLoading(true);
        try {
          const blogPost = await getBlogPostBySlug(postId);
          setFormData({
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            content: blogPost.content,
            slug: blogPost.id,
            readTime: blogPost.readTime,
            author: blogPost.author,
            featured: blogPost.featured,
            newest: blogPost.newest,
            published: blogPost.published,
            tags: blogPost.tags,
            headerImage: null,
            headerImageUrl: blogPost.headerImage || '',
          });
        } catch (error: any) {
          setError(`Failed to load blog post: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadBlogPost();
  }, [postId]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form field changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug when title changes
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  // Handle tag management
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setUploadProgress(0);
      setError('');
      setSuccess('');

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.');
      }

      // Validate file size (5MB limit for images)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('File size too large. Please upload images smaller than 5MB.');
      }

      console.log('AdminBlogForm: Starting image upload:', {
        name: file.name,
        size: file.size,
        type: file.type
      });

      // If there's an existing image, delete it first
      if (formData.headerImageUrl && isEditMode) {
        try {
          // Extract filename from URL
          const urlParts = formData.headerImageUrl.split('/');
          const fileName = urlParts[urlParts.length - 1];
          
          console.log('AdminBlogForm: Deleting old image:', fileName);
          
          await fetch('/api/admin/upload', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName }),
          });
        } catch (deleteError) {
          console.warn('AdminBlogForm: Failed to delete old image:', deleteError);
          // Continue with upload even if delete fails
        }
      }

      // Create FormData for file upload
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      // Upload image using API route
      console.log('AdminBlogForm: Uploading to API...');
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('AdminBlogForm: Upload failed:', errorData);
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('AdminBlogForm: Upload successful:', result);

      setFormData(prev => ({
        ...prev,
        headerImage: file,
        headerImageUrl: result.url as string,
      }));

      setSuccess(`Image uploaded successfully: ${file.name}`);
      setUploadProgress(100);

    } catch (err: any) {
      console.error('AdminBlogForm: Upload error:', err);
      setError(err.message);
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.slug) {
        throw new Error('Please fill in all required fields.');
      }

      if (formData.tags.length === 0) {
        throw new Error('Please add at least one tag.');
      }

      // Prepare blog post data
      const blogPost: Partial<BlogPost> = {
        id: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: new Date().toISOString().split('T')[0],
        readTime: formData.readTime,
        tags: formData.tags,
        featured: formData.featured,
        newest: formData.newest,
        author: formData.author,
        published: formData.published,
        headerImage: formData.headerImageUrl || undefined,
      };

      // Create or update blog post using admin service
      let resultPost;
      if (isEditMode && postId) {
        resultPost = await updateBlogPost(postId, {
          slug: postId,
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          content: blogPost.content,
          readTime: blogPost.readTime,
          tags: blogPost.tags,
          featured: blogPost.featured,
          newest: blogPost.newest,
          author: blogPost.author,
          published: blogPost.published,
          headerImage: formData.headerImageUrl || undefined,
        });
      } else {
        resultPost = await createBlogPost({
          slug: blogPost.id,
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          content: blogPost.content,
          readTime: blogPost.readTime,
          tags: blogPost.tags,
          featured: blogPost.featured,
          newest: blogPost.newest,
          author: blogPost.author,
          published: blogPost.published,
          headerImage: blogPost.headerImage,
        });
      }

      setSuccess(isEditMode ? 'Blog post updated successfully!' : 'Blog post created successfully!');
      
      // Reset form only if creating new post
      if (!isEditMode) {
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          slug: '',
          readTime: '',
          author: 'ChainInfra',
          featured: false,
          newest: false,
          published: false,
          tags: [],
          headerImage: null,
          headerImageUrl: '',
        });
      }

      // Redirect to admin dashboard
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <Alert className="border-green-500 bg-green-50">
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-500 bg-red-50">
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="blog-post-slug"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of the blog post"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', e.target.value)}
                  placeholder="5 min read"
                />
              </div>
              
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="content">Content *</Label>
              <LazyRichTextEditor
                value={formData.content}
                onChange={(content) => handleInputChange('content', content)}
                placeholder="Viết nội dung bài viết với rich text editor..."
                height={500}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Suggested categories:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!formData.tags.includes('Ops & Upgrades')) {
                      setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, 'Ops & Upgrades']
                      }));
                    }
                  }}
                  className="text-xs"
                  disabled={formData.tags.includes('Ops & Upgrades')}
                >
                  Ops & Upgrades
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!formData.tags.includes('Community & Governance')) {
                      setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, 'Community & Governance']
                      }));
                    }
                  }}
                  className="text-xs"
                  disabled={formData.tags.includes('Community & Governance')}
                >
                  Community & Governance
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!formData.tags.includes('Education')) {
                      setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, 'Education']
                      }));
                    }
                  }}
                  className="text-xs"
                  disabled={formData.tags.includes('Education')}
                >
                  Education
                </Button>
              </div>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Header Image */}
        <Card>
          <CardHeader>
            <CardTitle>Header Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="headerImage">Upload Image</Label>
              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {isLoading ? 'Uploading...' : 'Choose Image'}
                </Button>
              </div>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}

              {isLoading && uploadProgress === 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing upload...
                  </div>
                </div>
              )}

              {formData.headerImageUrl && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="mt-2">
                    <img
                      src={formData.headerImageUrl}
                      alt="Header preview"
                      className="max-h-48 rounded-md border"
                    />
                  </div>
                  <div className="mt-2">
                    <Label>Public URL</Label>
                    <Input readOnly value={formData.headerImageUrl} />
                  </div>
                  <div className="mt-2">
                    <Button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          headerImageUrl: '',
                          headerImage: null 
                        }));
                      }}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove Image
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {formData.headerImage && (
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected image: {formData.headerImage.name}
                </p>
                <Button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, headerImage: null }))}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="featured">Featured Post</Label>
                <p className="text-sm text-muted-foreground">
                  Display this post in featured section
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newest">Newest Post</Label>
                <p className="text-sm text-muted-foreground">
                  Mark as newest post
                </p>
              </div>
              <Switch
                id="newest"
                checked={formData.newest}
                onCheckedChange={(checked) => handleInputChange('newest', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make post visible to public
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleInputChange('published', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? 'Update Post' : 'Create Post'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
