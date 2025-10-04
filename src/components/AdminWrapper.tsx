'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, User, Mail } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminWrapper() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check session using Supabase client
    const checkUser = async () => {
      try {
        // Get session from Supabase client (this handles the correct localStorage key automatically)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('AdminWrapper: Session check:', !!session);
        
        if (error) {
          console.log('AdminWrapper: Error getting session:', error.message);
          router.push('/login');
          return;
        }

        if (!session) {
          console.log('AdminWrapper: No session found, redirecting to login');
          router.push('/login');
          return;
        }

        // Check if session is expired
        const now = Math.floor(Date.now() / 1000);
        if (session.expires_at && session.expires_at < now) {
          console.log('AdminWrapper: Session expired, redirecting to login');
          await supabase.auth.signOut();
          router.push('/login');
          return;
        }

        // Check if we have user data
        if (session.user) {
          console.log('AdminWrapper: Valid session found, setting user');
          setUser(session.user);
          setLoading(false);
        } else {
          console.log('AdminWrapper: No user in session, redirecting to login');
          router.push('/login');
        }
      } catch (error) {
        console.error('AdminWrapper: Error checking session:', error);
        router.push('/login');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AdminWrapper: Auth state change:', event, !!session);
        
        if (event === 'SIGNED_OUT') {
          console.log('AdminWrapper: User signed out');
          setUser(null);
          router.push('/login');
        } else if (event === 'SIGNED_IN' && session?.user) {
          console.log('AdminWrapper: User signed in, updating state');
          setUser(session.user);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          console.log('AdminWrapper: Token refreshed, updating state');
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      console.log('AdminWrapper: Logging out user');
      // Sign out from Supabase (this will automatically clear localStorage)
      await supabase.auth.signOut();
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if Supabase signOut fails, redirect to home
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading admin dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-cyber-blue/5">
        <div className="container mx-auto max-w-6xl">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-cyber-blue" />
                <div>
                  <h1 className="text-4xl font-bold text-foreground">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Manage content for ChainInfra validator website
                  </p>
                </div>
              </div>
              
              {/* User Info & Logout */}
              <div className="flex items-center gap-4">
                <Card className="cyber-border bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-cyber-blue" />
                        <span className="text-sm font-medium">Admin</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="cyber-border hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {/* Admin Dashboard */}
          <AdminDashboard />
        </div>
      </div>
  );
}
