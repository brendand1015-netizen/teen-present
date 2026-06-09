import Image from "next/image";
import type { Submission } from "@/lib/types";

export function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <article className="grid gap-8 border-t border-ink/10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] md:gap-14 md:py-24">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={submission.image_url}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center">
        <div>
          <p className="font-serif text-3xl leading-snug text-ink/85">
            {`"${submission.reflection}"`}
          </p>
          {submission.name ? (
            <p className="mt-8 text-sm uppercase tracking-[0.22em] text-ink/45">
              {submission.name}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
