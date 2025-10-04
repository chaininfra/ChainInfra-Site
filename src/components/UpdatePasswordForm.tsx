'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check if user has a valid session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        router.push('/login?error=' + encodeURIComponent(error.message));
        return;
      }

      if (!session) {
        console.log('No session found, redirecting to login');
        router.push('/login?error=' + encodeURIComponent('No valid session found. Please request a new password reset link.'));
        return;
      }

      console.log('Valid session found for user:', session.user?.email);
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, !!session);
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, redirecting to login');
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Please enter a new password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password updated successfully!');
        setIsSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-cyber-green/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-cyber-green mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Password Updated!</h3>
            <p className="text-muted-foreground mb-4">
              Your password has been successfully updated.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You will be redirected to the login page in a few seconds...
            </p>
            <Button 
              onClick={() => router.push('/login')}
              className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green"
            >
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyber-blue/20">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Lock className="h-5 w-5 text-cyber-blue" />
          Update Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="border-cyber-blue/30 focus:border-cyber-blue pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="border-cyber-blue/30 focus:border-cyber-blue pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="border-cyber-green/20 bg-cyber-green/5">
              <CheckCircle className="h-4 w-4 text-cyber-green" />
              <AlertDescription className="text-cyber-green">
                {message}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating Password...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Update Password
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground text-center">
            <p>Password requirements:</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• At least 6 characters long</li>
              <li>• Use a combination of letters and numbers</li>
              <li>• Avoid common passwords</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
