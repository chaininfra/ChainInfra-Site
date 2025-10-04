import type { Metadata } from 'next';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your ChainInfra account password',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a password reset link
          </p>
        </div>
        
        <ResetPasswordForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <a 
              href="/login" 
              className="text-cyber-blue hover:text-cyber-green transition-colors font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
