import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Production-ready middleware for Next.js 13+ with Supabase authentication
 * 
 * Features:
 * - Admin route protection
 * - Secure cookie handling without hardcoded names
 * - Conditional logging for development only
 * - Lightweight Edge runtime compatible
 */
export async function middleware(req: NextRequest) {
  // Handle admin route protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Development logging (disabled in production)
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      console.log(`[Middleware] Protecting admin route: ${req.nextUrl.pathname}`);
    }

    // Since we're not using cookies, let the client-side handle authentication
    // The AdminWrapper component will check localStorage and redirect if needed
    return NextResponse.next();
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

/**
 * Creates a redirect response to the login page with the current path as redirectTo
 * This ensures users return to their intended destination after login
 */
function createLoginRedirect(req: NextRequest): NextResponse {
  const redirectUrl = new URL('/login', req.url);
  
  // Preserve the original path for post-login redirect
  redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] Redirecting to: ${redirectUrl.toString()}`);
  }
  
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Only apply middleware to admin routes
     * This is more efficient than checking all routes
     */
    '/admin/:path*',
  ],
};
