import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { SubmitButton } from "@/components/SubmitButton";
import {
  approveSubmission,
  loginAdmin,
  logoutAdmin,
  rejectSubmission
} from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

async function getPendingSubmissions() {
  const supabase = createAdminSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

function LoginForm({ status }: { status?: string }) {
  return (
    <section className="mx-auto max-w-md px-6 pb-24 md:px-10">
      {status === "bad-password" ? (
        <p className="mb-6 border-l border-clay/40 py-3 pl-5 text-ink/65">
          That password did not match.
        </p>
      ) : null}
      <form action={loginAdmin} className="space-y-6">
        <label className="block">
          <span className="mb-3 block text-sm uppercase tracking-[0.22em] text-ink/50">
            Admin password
          </span>
          <input
            name="password"
            type="password"
            required
            className="focus-ring w-full border border-ink/15 bg-white/35 px-5 py-4 text-ink/75"
          />
        </label>
        <SubmitButton label="Enter admin" />
      </form>
    </section>
  );
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: { status?: string };
}) {
  const authenticated = isAdminAuthenticated();
  const submissions = authenticated ? await getPendingSubmissions() : [];

  return (
    <>
      <PageIntro eyebrow="Admin" title="Moderate submissions.">
        <p>
          Review pending photographs and reflections before they appear publicly.
        </p>
      </PageIntro>
      {!authenticated ? (
        <LoginForm status={searchParams.status} />
      ) : (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
          <form action={logoutAdmin} className="mb-12">
            <button
              type="submit"
              className="quiet-link text-sm uppercase tracking-[0.2em] text-ink/45 underline decoration-ink/20"
            >
              Sign out
            </button>
          </form>
          {searchParams.status === "update-error" ? (
            <p className="mb-8 border-l border-clay/40 py-3 pl-5 text-ink/65">
              The submission could not be updated. Please try again.
            </p>
          ) : null}
          {searchParams.status === "unconfigured" ? (
            <p className="mb-8 border-l border-clay/40 py-3 pl-5 text-ink/65">
              Supabase is not configured yet, so moderation is paused.
            </p>
          ) : null}
          {submissions.length > 0 ? (
            <div className="space-y-14">
              {submissions.map((submission) => (
                <article
                  key={submission.id}
                  className="grid gap-8 border-t border-ink/10 py-12 md:grid-cols-[18rem_1fr] md:gap-12"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                    <Image
                      src={submission.image_url}
                      alt=""
                      fill
                      sizes="18rem"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-ink/45">
                      {submission.section}
                    </p>
                    <p className="mt-5 font-serif text-3xl leading-snug text-ink/85">
                      {`"${submission.reflection}"`}
                    </p>
                    <p className="mt-6 text-sm text-ink/45">
                      {submission.name || "Anonymous"} ·{" "}
                      {new Date(submission.created_at).toLocaleString()}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <form action={approveSubmission}>
                        <input type="hidden" name="id" value={submission.id} />
                        <button
                          type="submit"
                          className="focus-ring rounded-full border border-dusk/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-dusk"
                        >
                          Approve
                        </button>
                      </form>
                      <form action={rejectSubmission}>
                        <input type="hidden" name="id" value={submission.id} />
                        <button
                          type="submit"
                          className="focus-ring rounded-full border border-clay/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-clay"
                        >
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="border-t border-ink/10 py-16 text-lg leading-8 text-ink/55">
              There are no pending submissions right now.
            </p>
          )}
        </section>
      )}
    </>
  );
}
