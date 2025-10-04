import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dopqjqrbkqplmmotybwo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcHFqcXJia3FwbG1tb3R5YndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2ODUxMDMsImV4cCI6MjA3MjI2MTEwM30.OR4975b0j7XTVboxkPGTgy4nQUBv7AQT0vSJsUnHf_U";

// Server-side Supabase client for authentication
export const supabaseServer = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

/**
 * Check if user is authenticated by validating access token
 */
export async function checkAuth(accessToken: string): Promise<{ user: any; error: string | null }> {
  try {
    if (!accessToken) {
      return { user: null, error: 'No access token provided' };
    }

    // Set the session with the access token
    const { data: { user }, error } = await supabaseServer.auth.getUser(accessToken);

    if (error) {
      return { user: null, error: error.message };
    }

    if (!user) {
      return { user: null, error: 'Invalid user' };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Authentication failed' };
  }
}
