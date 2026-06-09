type PageIntroProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-20 md:px-10 md:pt-28">
      <div className="animate-slow-rise">
        {eyebrow ? (
          <p className="mb-6 text-sm uppercase tracking-[0.28em] text-dusk/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-serif text-5xl font-medium leading-tight text-ink md:text-7xl">
          {title}
        </h1>
        <div className="mt-8 max-w-2xl text-lg leading-8 text-ink/65">
          {children}
        </div>
      </div>
    </section>
  );
}
