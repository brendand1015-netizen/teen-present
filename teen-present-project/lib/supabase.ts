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

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function createPublicSupabaseClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}

export function createAdminSupabaseClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
