import { createPublicSupabaseClient } from "@/lib/supabase";
import type { SubmissionSection } from "@/lib/types";

export async function getApprovedSubmissions(section?: SubmissionSection) {
  const supabase = createPublicSupabaseClient();
  let query = supabase
    .from("submissions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
