import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { publicEnv } from "./env";

/**
 * Supabase-Client mit Service-Role-Key. Umgeht RLS!
 * Nur auf dem Server verwenden, z. B. später für /api/reel-worker. Immer selbst nach user_id filtern.
 */
export function createAdminClient() {
  const env = publicEnv();
  const serviceRoleKey = z.string().min(1).parse(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return createSupabaseClient(env.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
