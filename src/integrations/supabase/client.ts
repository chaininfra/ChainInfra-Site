'use client';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dopqjqrbkqplmmotybwo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcHFqcXJia3FwbG1tb3R5YndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2ODUxMDMsImV4cCI6MjA3MjI2MTEwM30.OR4975b0j7XTVboxkPGTgy4nQUBv7AQT0vSJsUnHf_U";

// Singleton pattern to prevent multiple instances
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      }
    });
  }
  return supabaseInstance;
})();