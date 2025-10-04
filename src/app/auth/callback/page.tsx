'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL parameters (both query params and hash fragment)
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        // Check both query params and hash fragment for tokens
        const accessToken = urlParams.get('access_token') || hashParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token') || hashParams.get('refresh_token');
        const type = urlParams.get('type') || hashParams.get('type');
        const error = urlParams.get('error') || hashParams.get('error');
        const errorDescription = urlParams.get('error_description') || hashParams.get('error_description');

        console.log('Auth callback params:', { 
          accessToken: !!accessToken, 
          refreshToken: !!refreshToken, 
          type, 
          error, 
          errorDescription,
          search: window.location.search,
          hash: window.location.hash
        });

        if (error) {
          console.error('Auth error:', error, errorDescription);
          router.push('/login?error=' + encodeURIComponent(errorDescription || error));
          return;
        }

        if (accessToken && refreshToken) {
          // Set the session with the tokens from the URL
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (sessionError) {
            console.error('Session error:', sessionError);
            router.push('/login?error=' + encodeURIComponent(sessionError.message));
            return;
          }

          if (data.session) {
            console.log('Session established successfully for user:', data.session.user?.email);
            
            // Redirect based on the type
            if (type === 'recovery') {
              // Password reset flow - redirect to update password page
              console.log('Redirecting to password update page');
              router.push('/update-password');
            } else {
              // Regular sign in - redirect to admin
              console.log('Redirecting to admin dashboard');
              router.push('/admin');
            }
          } else {
            console.error('No session established');
            router.push('/login?error=' + encodeURIComponent('Failed to establish session'));
          }
        } else {
          console.log('No tokens found in URL, trying Supabase auth session...');
          
          // Try to get session from Supabase (it might have been set automatically)
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            router.push('/login?error=' + encodeURIComponent(sessionError.message));
            return;
          }
          
          if (session) {
            console.log('Session found via Supabase client:', session.user?.email);
            
            // Check if this is a password recovery session
            if (type === 'recovery') {
              console.log('Password recovery session detected, redirecting to update password');
              router.push('/update-password');
            } else {
              console.log('Regular session detected, redirecting to admin');
              router.push('/admin');
            }
          } else {
            console.error('No tokens found in URL and no session available');
            router.push('/login?error=' + encodeURIComponent('No authentication tokens found in URL'));
          }
        }
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/login?error=' + encodeURIComponent('Authentication failed'));
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue mx-auto mb-4"></div>
        <p className="text-muted-foreground">Processing authentication...</p>
      </div>
    </div>
  );
}
