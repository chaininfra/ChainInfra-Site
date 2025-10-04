'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProtectionProps {
  children: React.ReactNode;
}

export default function AdminRouteProtection({ children }: AdminRouteProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Get session from Supabase client (this handles the correct localStorage key automatically)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.log('AdminRouteProtection: Error getting session:', error.message);
          router.push('/login');
          return;
        }

        if (!session) {
          console.log('AdminRouteProtection: No session found');
          router.push('/login');
          return;
        }

        if (!session.access_token) {
          console.log('AdminRouteProtection: No access token in session');
          router.push('/login');
          return;
        }

        // Check if session is expired
        const now = Math.floor(Date.now() / 1000);
        if (session.expires_at && session.expires_at < now) {
          console.log('AdminRouteProtection: Session expired');
          await supabase.auth.signOut();
          router.push('/login');
          return;
        }

        // Verify token with server
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: session.access_token,
          }),
        });

        const result = await response.json();

        if (!result.authenticated) {
          console.log('AdminRouteProtection: Server verification failed:', result.error);
          await supabase.auth.signOut();
          router.push('/login');
          return;
        }

        console.log('AdminRouteProtection: Authentication verified');
        setIsAuthenticated(true);
        setLoading(false);

      } catch (error) {
        console.error('AdminRouteProtection: Error checking authentication:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
