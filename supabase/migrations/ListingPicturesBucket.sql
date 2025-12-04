-- Delete bucket if it already exists (safe for re-runs)
select storage.delete_bucket('listing-pictures');

-- Create the bucket
select storage.create_bucket(
  'listing-pictures',
  is_public := true
);

-- Allow public read access (so images load on your site)
create policy "Allow public read access to listing pictures"
on storage.objects
for select
using (bucket_id = 'Listing Pictures');

-- Allow authenticated users to upload images
create policy "Authenticated users can upload images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'Listing Pictures');

-- Allow authenticated users to delete their own listing images
create policy "Listing owners can delete their own images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'Listing Pictures'
  and (
    -- The folder name equals the user's listing ID
    -- Example path: listingID/uniqueImageName.jpg
    (select user_id from public.listings 
      where id::text = (storage.foldername(name))
    ) = auth.uid()
  )
);
