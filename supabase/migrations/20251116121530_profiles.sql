-- Clear out old material (if necessary)
drop table if exists public.messages cascade; 
drop table if exists public.profiles cascade; 
drop function if exists public.handle_new_user;
drop trigger if exists on_auth_user_created on auth.users;


-- Create the profiles table
create table public.profiles (
    id uuid not null primary key references auth.users(id) on delete cascade,
    email text unique
);

--  Set up a trigger to auto-populate profiles

create or replace function public.handle_new_user()
returns trigger
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name'); 
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();