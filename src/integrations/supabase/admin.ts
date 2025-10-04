import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dopqjqrbkqplmmotybwo.supabase.co";

// Singleton pattern to prevent multiple instances
let supabaseAdminInstance: ReturnType<typeof createClient<Database>> | null = null;

// Returns an admin client only on the server when the service role key is present
export function getSupabaseAdmin() {
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
	if (!serviceRoleKey) {
		// Avoid throwing during client-side bundles or when env is not yet provided
		return undefined as unknown as ReturnType<typeof createClient<Database>>
	}
	
	if (!supabaseAdminInstance) {
		supabaseAdminInstance = createClient<Database>(SUPABASE_URL, serviceRoleKey, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		})
	}
	
	return supabaseAdminInstance;
}
