import { PageIntro } from "@/components/PageIntro";
import { SubmitButton } from "@/components/SubmitButton";
import { submitReflection } from "@/app/share/actions";

const statusMessages: Record<string, string> = {
  sent: "Thank you. Your reflection was received and will appear only after it is approved.",
  reflection: "Please add a reflection under 700 characters.",
  image: "Please choose an image file under 8 MB.",
  upload: "Something went wrong while sending your reflection. Please try again.",
  unconfigured:
    "Sharing is currently paused while the submission database is being connected."
};

export default function SharePage({
  searchParams
}: {
  searchParams: { status?: string };
}) {
  const message = searchParams.status
    ? statusMessages[searchParams.status]
    : undefined;

  return (
    <>
      <PageIntro eyebrow="Share a moment" title="Contribute without rushing.">
        <p>
          Add one photograph and a short, honest reflection. Submissions are
          reviewed before they become public, so this space can stay careful and
          calm.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-6 pb-24 md:px-10">
        {message ? (
          <p className="mb-8 border-l border-dusk/30 py-3 pl-5 text-ink/65">
            {message}
          </p>
        ) : null}
        <form action={submitReflection} className="space-y-8">
          <div>
            <label
              htmlFor="image"
              className="mb-3 block text-sm uppercase tracking-[0.22em] text-ink/50"
            >
              Photograph
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              className="focus-ring block w-full rounded-none border border-ink/15 bg-white/35 px-4 py-4 text-sm text-ink/65 file:mr-5 file:rounded-full file:border-0 file:bg-mist file:px-5 file:py-2 file:text-ink/65"
            />
          </div>
          <div>
            <label
              htmlFor="reflection"
              className="mb-3 block text-sm uppercase tracking-[0.22em] text-ink/50"
            >
              Reflection
            </label>
            <textarea
              id="reflection"
              name="reflection"
              required
              maxLength={700}
              rows={7}
              placeholder="What did this moment help you notice?"
              className="focus-ring w-full border border-ink/15 bg-white/35 px-5 py-4 text-lg leading-8 text-ink/75 placeholder:text-ink/30"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="mb-3 block text-sm uppercase tracking-[0.22em] text-ink/50"
            >
              First name, optional
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={80}
              className="focus-ring w-full border border-ink/15 bg-white/35 px-5 py-4 text-ink/75"
            />
          </div>
          <label className="flex items-start gap-4 text-ink/65">
            <input
              name="portledge"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-ink/20 text-dusk focus:ring-dusk/30"
            />
            <span>Mark this submission as coming from Portledge.</span>
          </label>
          <SubmitButton label="Submit for review" />
        </form>
      </section>
    </>
  );
}
