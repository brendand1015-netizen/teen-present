# Teen Present

A calm, contemplative online photography exhibition about presence and teen well-being. Built with Next.js App Router, React, TypeScript, Tailwind CSS, and Supabase.

## What is included

- Home: quiet landing page with a single invitation into the exhibition.
- Exhibition: curated photo and reflection pairs shown with generous spacing.
- Share: visitor contribution form with photo upload, short reflection, optional first name, and optional Portledge tag.
- Portledge: public page showing only approved Portledge submissions.
- About: short origin story for the in-person exhibition and reflection wall.
- Admin: password-protected moderation queue with Approve and Reject actions.

## File structure

- `app/`: Next.js routes and server actions.
- `components/`: reusable page intro, exhibition, submission, and form button components.
- `data/curated-exhibition.json`: editable seed content for the original curated exhibition.
- `lib/`: Supabase clients, shared types, admin auth, and submission queries.
- `supabase/schema.sql`: table, enum, storage bucket, and RLS policy setup.
- `.env.example`: environment variables needed locally and on Vercel.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. In Project Settings, copy:
   - Project URL
   - anon public key
   - service role key
4. Create a local `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=choose-a-long-admin-password
ADMIN_COOKIE_SECRET=choose-a-random-cookie-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Keep `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `ADMIN_COOKIE_SECRET` private.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit the curated exhibition

The exhibition is grouped by contributor in `data/curated-exhibition.json`.
There are exactly two contributors for now: Brendan and Bo. Each contributor has
six items, and each item has a `photo`, `alt`, `title`, `date`, and
`reflection`.

Put Brendan's six images here:

```text
public/exhibition/brendan/1.jpg
public/exhibition/brendan/2.jpg
public/exhibition/brendan/3.jpg
public/exhibition/brendan/4.jpg
public/exhibition/brendan/5.jpg
public/exhibition/brendan/6.jpg
```

Put Bo's six images here:

```text
public/exhibition/bo/1.jpg
public/exhibition/bo/2.jpg
public/exhibition/bo/3.jpg
public/exhibition/bo/4.jpg
public/exhibition/bo/5.jpg
public/exhibition/bo/6.jpg
```

Use this exact item format when replacing placeholder reflections:

```json
{
  "id": "brendan-1",
  "photo": "/exhibition/brendan/1.jpg",
  "alt": "Brendan photo 1",
  "title": "Autumn Departure",
  "date": "October 27, 2024",
  "reflection": "Write the real reflection for this photo here."
}
```

The `photo` path starts at `public`, so
`public/exhibition/brendan/1.jpg` is written in JSON as
`/exhibition/brendan/1.jpg`.

## Deploy to Vercel

1. Push this project to a Git repository.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL.
5. Deploy.

The `/admin` page will use `ADMIN_PASSWORD` for access. Visitor submissions remain pending until approved.
