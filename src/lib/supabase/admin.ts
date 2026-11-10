import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service Role Admin client - used exclusively in secure Server Actions or Cron handlers.
 * Bypasses RLS to perform administrative tasks (e.g. data purge after grace period, cron check).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

