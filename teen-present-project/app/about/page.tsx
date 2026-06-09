import { PageIntro } from "@/components/PageIntro";

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="A slower way to look.">
        <p>
          Teen Present began as an in-person photography exhibition about
          presence and teen well-being. Visitors were invited to pause with the
          photographs, then leave their own responses on a reflection wall of
          sticky notes.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-6 pb-24 text-lg leading-8 text-ink/65 md:px-10">
        <p>
          This online space carries that same idea forward. A photograph can be
          small, ordinary, and still meaningful. A reflection can be short and
          still true. Together, they create a place where teen experience is not
          rushed past or turned into a performance.
        </p>
        <p className="mt-8">
          The goal is simple: to help visitors slow down long enough to notice
          what is already present.
        </p>
      </section>
    </>
  );
}
