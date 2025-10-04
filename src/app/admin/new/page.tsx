import { Metadata } from 'next';
import AdminBlogForm from '@/components/admin/AdminBlogForm';
import AdminRouteProtection from '@/components/AdminRouteProtection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin - Add New Blog Post',
  description: 'Add new blog post to ChainInfra validator blog',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AddNewPostPage() {
  return (
    <AdminRouteProtection>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="cyber-border">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Add New Blog Post
            </h1>
            <p className="text-muted-foreground">
              Create a new blog post for ChainInfra validator blog
            </p>
          </div>
          
          <AdminBlogForm />
        </div>
      </div>
    </AdminRouteProtection>
  );
}
