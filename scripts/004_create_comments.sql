-- Create comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.comments enable row level security;

-- Create policies for comments
create policy "comments_select_all"
  on public.comments for select
  using (true);

create policy "comments_insert_own"
  on public.comments for insert
  with check (auth.uid() = author_id);

create policy "comments_update_own"
  on public.comments for update
  using (auth.uid() = author_id);

create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = author_id);

-- Create indexes for better performance
create index if not exists comments_post_id_idx on public.comments(post_id);
create index if not exists comments_author_id_idx on public.comments(author_id);
create index if not exists comments_created_at_idx on public.comments(created_at desc);
