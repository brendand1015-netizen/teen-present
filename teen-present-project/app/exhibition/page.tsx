import { CuratedPiece } from "@/components/CuratedPiece";
import { PageIntro } from "@/components/PageIntro";
import { curatedExhibition } from "@/lib/curated-exhibition";

export default function ExhibitionPage() {
  return (
    <>
      <PageIntro eyebrow="Original exhibition" title="Take one photograph at a time.">
        <p>
          Brendan and Bo each share six photographs with short reflections.
          Move through one person, one image, and one thought at a time.
        </p>
      </PageIntro>
      <section aria-label="Curated exhibition">
        {curatedExhibition.map((contributor) => (
          <section key={contributor.id} aria-labelledby={`${contributor.id}-heading`}>
            <div className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:px-10 md:pt-28">
              <p className="mb-5 text-sm uppercase tracking-[0.28em] text-dusk/60">
                Contributor
              </p>
              <h2
                id={`${contributor.id}-heading`}
                className="font-serif text-6xl font-medium leading-none text-ink md:text-8xl"
              >
                {contributor.name}
              </h2>
            </div>
            {contributor.items.map((piece, index) => (
              <CuratedPiece
                key={piece.id}
                piece={piece}
                index={index}
                contributorName={contributor.name}
              />
            ))}
          </section>
        ))}
      </section>
    </>
  );
}
