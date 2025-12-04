-- Clear out old material (if necessary)
drop table if exists public.listings cascade;
drop function if exists public.handle_new_listing;
drop trigger if exists on_listing_created on public.listings;

-- Create the listings table
create table public.listings (
    id uuid not null default gen_random_uuid() primary key,
    title text not null,
    description text,
    price numeric,
    created date default now(),
    category text,
    subCategory text,
    color text,
    condition text,
    gender text,
    size text,
    user_id uuid not null references auth.users(id) on delete cascade,
    sold boolean default false,
    imgs text[]
);

-- Optional: Trigger to auto-populate created date or enforce logic
-- Remove this whole section if you do NOT need an insert trigger

create function public.handle_new_listing()
returns trigger as $$
begin
  -- Example logic: ensure created date auto-sets if NULL
  if new.created is null then
    new.created := now();
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_listing_created
  before insert on public.listings
  for each row execute procedure public.handle_new_listing();
