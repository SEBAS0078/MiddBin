import { supabase } from "@/lib/supabase_client";
import type { Listing, NewListing, UserProfile } from "@/types";

export async function checkUserExists(partial: Partial<UserProfile> = {}) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("Not signed in");

  const row = { id: user.id, email: user.email, rating: null, ...partial };

  const { data, error: upsertErr } = await supabase
    .from("profiles")
    .upsert(row, { onConflict: "id" })
    .select()
    .single();
  if (upsertErr) throw upsertErr;
  return data as UserProfile;
}

export async function fetchListings() {
  const { error, data } = await supabase.from("Listings").select("*");

  if (error) {
    alert("Error fetching listings:");
    return { error, data: [] };
  }

  return { error: null, data: data ?? [] };
}

export async function fetchListingById(listingId: string): Promise<Listing> {
  const { data, error } = await supabase
    .from("Listings")
    .select("*")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw error;
  return data as Listing;
}

export async function fetchListingsByUser(userId: string): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("Listings")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function createListing(
  newListing: NewListing,
  imageFiles: File[],
): Promise<string> {
  // Step 1: Create listing without images
  const { data: listing, error } = await supabase
    .from("Listings")
    .insert(newListing)
    .select()
    .single();

  if (error) throw error;
  const listingId = listing.id as string;

  // Step 2: Upload each image
  const uploadedPaths: string[] = [];
  for (const file of imageFiles) {
    const path = await uploadImage(file, listingId);
    if (path) uploadedPaths.push(path);
  }

  // Step 3: Convert paths to public URLs
  const urls = uploadedPaths.map((path) => getPublicUrl(path));

  // Step 4: Update the listing with imgs array
  const { error: updateError } = await supabase
    .from("Listings")
    .update({ imgs: urls })
    .eq("id", listingId);

  if (updateError) throw updateError;

  return listingId;
}

//updates in form {column: "text"} ex: {title: "newTitle"} or {title: "newTitle", contents: "newContents"}
export async function updateListing(
  listingId: string,
  updates: Partial<Listing>,
): Promise<Listing> {
  const { data, error } = await supabase
    .from("Listings")
    .update(updates)
    .eq("id", listingId)
    .select()
    .maybeSingle();
  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Listing not found when trying to update");
  }

  return data as Listing;
}

export async function deleteListing(listingId: string) {
  // List all files in the listing folder
  const { data: files, error: listError } = await supabase.storage
    .from("Listing Pictures")
    .list(listingId);

  if (listError) {
    throw listError;
  }

  // Delete all files if any exist
  if (files && files.length > 0) {
    const filePaths = files.map((file) => `${listingId}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from("Listing Pictures")
      .remove(filePaths);

    if (deleteError) {
      throw deleteError;
    }
  }

  // Delete the listing row from the database
  const { data, error } = await supabase
    .from("Listings")
    .delete()
    .eq("id", listingId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as UserProfile) || null;
}

export async function updateProfile(
  userId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      { id: userId, ...updates }, // ensure id is set for new row
      { onConflict: "id" },
    )
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data as UserProfile;
}

export async function deleteProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadImage(
  file: File,
  listingId: string,
): Promise<string | null> {
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${listingId}/${fileName}`;

  const { error } = await supabase.storage
    .from("Listing Pictures")
    .upload(filePath, file);

  if (error) return null;

  // return the path, not the URL (best practice)
  return filePath;
}

export async function getListingImgUrls(listingId?: string): Promise<string[]> {
  if (!listingId) return [];
  const { data: files, error } = await supabase.storage
    .from("Listing Pictures")
    .list(listingId); // no trailing slash

  if (error) {
    return [];
  }

  if (!files || files.length === 0) {
    return [];
  }

  // Map each file to its public URL
  const urls = files.map(
    (file) =>
      supabase.storage
        .from("Listing Pictures")
        .getPublicUrl(`${listingId}/${file.name}`).data.publicUrl,
  );

  return urls;
}

export function getPublicUrl(filePath: string): string {
  return supabase.storage.from("Listing Pictures").getPublicUrl(filePath).data
    .publicUrl;
}

// Deletes one image from storage AND updates the listing imgs[] field for editing and creating listings
export async function deleteListingImg(
  listingId: string,
  imageUrl: string,
): Promise<string[]> {
  // Get current listing to retrieve imgs array
  const { data: listingData, error: fetchError } = await supabase
    .from("Listings")
    .select("imgs")
    .eq("id", listingId)
    .single();

  if (fetchError || !listingData) {
    throw new Error("Failed to fetch listing images.");
  }

  const currentImgs: string[] = listingData.imgs ?? [];

  // Convert public URL to storage path
  const bucketBase = supabase.storage.from("Listing Pictures").getPublicUrl("")
    .data.publicUrl;

  const storagePath = imageUrl.replace(bucketBase, "").replace(/^\//, "");

  //Delete from storage
  const { error: storageError } = await supabase.storage
    .from("Listing Pictures")
    .remove([storagePath]);

  if (storageError) {
    throw new Error("Failed to delete image from storage.");
  }

  // Remove it from imgs[] in supabase
  const updatedImgs = currentImgs.filter((img) => img !== imageUrl);

  const { error: updateError } = await supabase
    .from("Listings")
    .update({ imgs: updatedImgs })
    .eq("id", listingId);

  if (updateError) {
    throw new Error("Failed to update listing image array.");
  }

  return updatedImgs;
}
