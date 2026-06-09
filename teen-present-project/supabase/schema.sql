create type submission_section as enum ('general', 'portledge');
create type submission_status as enum ('pending', 'approved', 'rejected');

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  reflection text not null check (char_length(reflection) <= 700),
  name text,
  section submission_section not null default 'general',
  status submission_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

create policy "Approved submissions are public"
  on public.submissions
  for select
  using (status = 'approved');

create policy "Visitors can create pending submissions"
  on public.submissions
  for insert
  with check (status = 'pending');

insert into storage.buckets (id, name, public)
values ('submissions', 'submissions', true)
on conflict (id) do update set public = true;

create policy "Submission images are public"
  on storage.objects
  for select
  using (bucket_id = 'submissions');

create policy "Visitors can upload submission images"
  on storage.objects
  for insert
  with check (bucket_id = 'submissions');
