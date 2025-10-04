import type { Metadata } from 'next';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Update Password',
  description: 'Update your ChainInfra account password',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Update Password
          </h1>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
