'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import FadeOnScroll from '@/components/FadeOnScroll';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('LoginForm: Auth state change:', event, !!session);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('LoginForm: User signed in, redirecting...');
          const redirectTo = searchParams.get('redirectTo') || '/admin';
          
          // Use window.location for more reliable redirect
          setTimeout(() => {
            window.location.href = redirectTo;
          }, 500);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess('Login successful! Redirecting...');
        
        // Wait for session to be properly set
        setTimeout(async () => {
          // Verify session is set
          const { data: { session } } = await supabase.auth.getSession();
          console.log('LoginForm: Session after login:', !!session);
          
          const redirectTo = searchParams.get('redirectTo') || '/admin';
          console.log('LoginForm: Redirecting to:', redirectTo);
          
          // Use window.location for more reliable redirect
          window.location.href = redirectTo;
        }, 1500);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-background via-background to-cyber-blue/5">
      <div className="container mx-auto max-w-md">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <FadeOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-10 w-10 text-cyber-blue" />
              <h1 className="text-4xl md:text-5xl font-bold glow-text">
                <span className="text-cyber-blue">ChainInfra</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              Access Your Validator Account
            </p>
            <p className="text-sm text-muted-foreground">
              Manage staking operations and view analytics
            </p>
          </FadeOnScroll>
        </div>

        {/* Login Form */}
        <FadeOnScroll>
          <Card className="cyber-border bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-cyber-blue">
                Sign In
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your validator dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 cyber-border bg-background/50"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 cyber-border bg-background/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <Alert variant="destructive" className="cyber-border">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="cyber-border bg-cyber-green/10 border-cyber-green/30">
                    <AlertDescription className="text-cyber-green">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green text-white hover:shadow-2xl hover:shadow-cyber-blue/30 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <a 
                    href="/reset-password" 
                    className="text-sm text-cyber-blue hover:text-cyber-green transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>

              </form>
            </CardContent>
          </Card>
        </FadeOnScroll>

        {/* Footer */}
        <FadeOnScroll>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Secure authentication powered by Supabase
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Your data is protected with enterprise-grade security
            </p>
          </div>
        </FadeOnScroll>
      </div>
    </div>
  );
}
