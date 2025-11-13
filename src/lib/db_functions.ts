import { supabase } from "@/lib/supabase_client";

type Listing = {
  title: string; // required
  description?: string; // optional, defaults to ""
  img: string; // required (picture URL)
  price: number; // required
  category?: string; // optional, defaults to ""
  subCategory?: string; // optional, defaults to ""
  color?: string; // optional, defaults to ""
  size?: string; // optional, defaults to ""
  condition?: string; // optional, defaults to ""
  gender?: string; // optional, defaults to ""
  created?: string; // auto-set timestamp
};

export async function fetchListings() {
  const { error, data } = await supabase.from("Listings").select("*");

  if (error) {
    alert("Error fetching listings:");
    return { error, data: [] };
  }

  return { error: null, data: data ?? [] };
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
