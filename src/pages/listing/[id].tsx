import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListingDetail from "@/components/ListingDetail";
import { fetchListingById } from "@/lib/db_functions";
import type { Listing } from "@/types";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    (async () => {
      const l = await fetchListingById(id);
      setListing(l);
    })();
  }, [id]);

  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">Listing not found.</div>
    );
  }

  return <ListingDetail listing={listing} />;
}
