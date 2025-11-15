import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import ListingDetail from "@/components/ListingDetail";
//import { fetchListingByID } from "@/lib/db_functions";
import { fetchListingById, fetchListings } from "@/lib/db_functions";
import type { Listing } from "@/types/Listing";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    async function loadListing() {
      const { data, error } = await fetchListingById(
        id as string | string[] | undefined,
      );

      if (error) {
        alert("Error fetching listings:");
      } else {
        setListing(data);
      }
    }

    loadListing();
  }, [id]);

  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">Listing not found.</div>
    );
  }

  return <ListingDetail listing={listing} />;
}
