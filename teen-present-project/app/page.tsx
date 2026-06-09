import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center px-6 py-20 md:px-10">
      <div className="max-w-3xl animate-slow-rise">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-dusk/70">
          A photography exhibition
        </p>
        <h1 className="font-serif text-6xl font-medium leading-[0.95] text-ink md:text-8xl">
          Teen Present
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-8 text-ink/70 md:text-2xl md:leading-9">
          A quiet space for presence, reflection, and teen well-being.
        </p>
        <p className="mt-10 max-w-2xl text-lg leading-8 text-ink/65">
          This exhibition invites you to pause with one image and one honest
          reflection at a time. No rush, no feed, no performance. Just a moment
          to notice what it feels like to be here.
        </p>
        <Link
          href="/exhibition"
          className="focus-ring mt-14 inline-flex rounded-full border border-ink/20 px-7 py-3 text-sm uppercase tracking-[0.22em] text-ink/75 transition hover:border-ink/40 hover:bg-white/40"
        >
          Enter the exhibition
        </Link>
      </div>
    </section>
  );
}
