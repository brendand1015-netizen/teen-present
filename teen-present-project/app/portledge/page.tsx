import { PageIntro } from "@/components/PageIntro";
import { SubmissionCard } from "@/components/SubmissionCard";
import { getApprovedSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function PortledgePage() {
  const submissions = await getApprovedSubmissions("portledge");

  return (
    <>
      <PageIntro eyebrow="Portledge" title="Approved Portledge reflections.">
        <p>
          These shared moments have been reviewed and approved for this section.
          Each one is held with the same quiet pacing as the original exhibition.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        {submissions.length > 0 ? (
          submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))
        ) : (
          <p className="max-w-xl border-t border-ink/10 py-16 text-lg leading-8 text-ink/55">
            No Portledge submissions have been approved yet. When the first one
            is ready, it will appear here with space around it.
          </p>
        )}
      </section>
    </>
  );
}
