-- 001_pipeline.sql
-- Ein content_item ist ein Thema, das durch die fünf Stationen der Pipeline wandert.

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  topic text,
  stage text not null default 'radar'
    check (stage in ('radar', 'autor', 'stimme', 'regisseur', 'studio', 'fertig', 'verworfen')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index content_items_user_id_stage_idx on public.content_items (user_id, stage);

-- updated_at bei jeder Änderung automatisch setzen
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger content_items_set_updated_at
  before update on public.content_items
  for each row execute function public.set_updated_at();

-- Row Level Security: jeder Account sieht und ändert nur seine eigenen Einträge
alter table public.content_items enable row level security;

create policy "content_items_select_own" on public.content_items
  for select to authenticated
  using (user_id = auth.uid());

create policy "content_items_insert_own" on public.content_items
  for insert to authenticated
  with check (user_id = auth.uid());

create policy "content_items_update_own" on public.content_items
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "content_items_delete_own" on public.content_items
  for delete to authenticated
  using (user_id = auth.uid());
