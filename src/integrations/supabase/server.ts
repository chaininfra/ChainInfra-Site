import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dopqjqrbkqplmmotybwo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcHFqcXJia3FwbG1tb3R5YndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2ODUxMDMsImV4cCI6MjA3MjI2MTEwM30.OR4975b0j7XTVboxkPGTgy4nQUBv7AQT0vSJsUnHf_U";

// Singleton pattern to prevent multiple instances
let supabaseServerInstance: ReturnType<typeof createClient<Database>> | null = null;

// Server-side Supabase client (no auth persistence)
export const supabaseServer = (() => {
  if (!supabaseServerInstance) {
    supabaseServerInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });
  }
  return supabaseServerInstance;
})();
