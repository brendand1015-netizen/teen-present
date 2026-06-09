import Image from "next/image";
import type { CuratedPhotoReflection } from "@/lib/types";

export function CuratedPiece({
  piece,
  index,
  contributorName
}: {
  piece: CuratedPhotoReflection;
  index: number;
  contributorName: string;
}) {
  return (
    <article className="min-h-screen border-t border-ink/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_0.72fr] md:gap-20 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist shadow-[0_28px_80px_rgba(44,42,38,0.08)]">
          <Image
            src={piece.photo}
            alt={piece.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="animate-slow-rise">
          <p className="mb-8 text-sm uppercase tracking-[0.28em] text-dusk/60">
            {contributorName} · Photo {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            {piece.title}
          </h3>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-ink/42">
            {piece.date}
          </p>
          <p className="mt-10 text-xl leading-9 text-ink/68">
            {`"${piece.reflection}"`}
          </p>
        </div>
      </div>
    </article>
  );
}
