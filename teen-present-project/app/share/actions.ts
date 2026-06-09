"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPublicSupabaseClient } from "@/lib/supabase";
import type { SubmissionSection } from "@/lib/types";

const MAX_REFLECTION_LENGTH = 700;
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export async function submitReflection(formData: FormData) {
  const reflection = String(formData.get("reflection") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const section: SubmissionSection =
    formData.get("portledge") === "on" ? "portledge" : "general";
  const image = formData.get("image");

  if (!reflection || reflection.length > MAX_REFLECTION_LENGTH) {
    redirect("/share?status=reflection");
  }

  if (!(image instanceof File) || image.size === 0 || image.size > MAX_IMAGE_SIZE) {
    redirect("/share?status=image");
  }

  if (!image.type.startsWith("image/")) {
    redirect("/share?status=image");
  }

  const supabase = createPublicSupabaseClient();
  const extension = image.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("submissions")
    .upload(fileName, image, {
      cacheControl: "3600",
      upsert: false
    });

  if (uploadError) {
    console.error(uploadError);
    redirect("/share?status=upload");
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("submissions").getPublicUrl(fileName);

  const { error: insertError } = await supabase.from("submissions").insert({
    image_url: publicUrl,
    reflection,
    name: name || null,
    section,
    status: "pending"
  });

  if (insertError) {
    console.error(insertError);
    redirect("/share?status=upload");
  }

  revalidatePath("/admin");
  redirect("/share?status=sent");
}
