import { supabase } from "@/lib/supabase_client";
import type { Listing } from "../types/Listing";

export async function fetchListings() {
  const { error, data } = await supabase.from("Listings").select("*");

  if (error) {
    alert("Error fetching listings:");
    return { error, data: [] };
  }

  return { error: null, data: data ?? [] };
}

export async function fetchListingById(id: string | string[] | undefined) {
  const { error, data } = await supabase
    .from("Listings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    alert("Error fetching listing:");
    return { error, data: null };
  } else {
    return { error: null, data };
  }
}

export async function addListing(listing: Listing) {
  const { error, data } = await supabase

    .from("Listings")
    .insert({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      img: listing.img,
      created: listing.created,
      category: listing.category,
      subCategory: listing.subCategory,
      color: listing.color,
      condition: listing.condition,
      gender: listing.gender,
    })
    .select();

  return { data, error };
}
