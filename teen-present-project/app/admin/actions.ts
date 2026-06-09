"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  isAdminAuthenticated,
  setAdminCookie,
  verifyAdminPassword
} from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { SubmissionStatus } from "@/lib/types";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin?status=bad-password");
  }

  setAdminCookie(password);
  redirect("/admin");
}

export async function logoutAdmin() {
  clearAdminCookie();
  redirect("/admin");
}

async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  if (!isAdminAuthenticated()) {
    redirect("/admin");
  }

  const supabase = createAdminSupabaseClient();

  if (!supabase) {
    redirect("/admin?status=unconfigured");
  }

  const { error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error);
    redirect("/admin?status=update-error");
  }

  revalidatePath("/admin");
  revalidatePath("/portledge");
}

export async function approveSubmission(formData: FormData) {
  await updateSubmissionStatus(String(formData.get("id")), "approved");
}

export async function rejectSubmission(formData: FormData) {
  await updateSubmissionStatus(String(formData.get("id")), "rejected");
}
