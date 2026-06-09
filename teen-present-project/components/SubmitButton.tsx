"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring rounded-full border border-ink/20 px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink/75 transition hover:border-ink/40 hover:bg-white/40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending..." : label}
    </button>
  );
}
