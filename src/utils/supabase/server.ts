import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client with the service_role key.
 * ONLY use in server-side code (API routes, webhooks).
 * This bypasses RLS — use with extreme caution.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
