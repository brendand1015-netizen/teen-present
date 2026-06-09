import { createClient } from "@supabase/supabase-js";
import type { Submission } from "@/lib/types";

type Database = {
  public: {
    Tables: {
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Submission, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      submission_section: "general" | "portledge";
      submission_status: "pending" | "approved" | "rejected";
    };
  };
};

function readEnv(name: string) {
  return process.env[name]?.trim() || undefined;
}

export function isSupabaseConfigured() {
  return Boolean(
    readEnv("NEXT_PUBLIC_SUPABASE_URL") &&
      readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}

export function isAdminSupabaseConfigured() {
  return Boolean(isSupabaseConfigured() && readEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function createPublicSupabaseClient() {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    return null;
  }

  return createClient<Database>(url, anonKey);
}

export function createAdminSupabaseClient() {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
