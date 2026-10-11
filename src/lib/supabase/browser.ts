import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "./env";

/** Supabase-Client für Client Components (läuft im Browser, unterliegt RLS). */
export function createClient() {
  const env = publicEnv();
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
