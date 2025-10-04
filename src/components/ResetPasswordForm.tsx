'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/lib/site-config';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteConfig.getCurrentUrl()}/auth/callback?type=recovery`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password reset email sent! Check your inbox.');
        setIsSuccess(true);
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
            <h3 className="text-lg font-semibold mb-2">Email Sent!</h3>
            <p className="text-muted-foreground mb-4">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Check your email and click the link to reset your password. 
              The link will expire in 1 hour.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
                setMessage('');
              }}
              className="w-full"
            >
              Send Another Email
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
          <Mail className="h-5 w-5 text-cyber-blue" />
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="border-cyber-blue/30 focus:border-cyber-blue"
            />
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
                Sending Reset Link...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Send Reset Link
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
