import { useRouter } from "next/router";
import ListingDetail from "@/components/ListingDetail";
import data from "../../../data/seed.json";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;

  // find item by id from your seed.json
  const listing = data.find((item) => item.id === Number(id));

  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">Listing not found.</div>
    );
  }

  return <ListingDetail listing={listing} />;
}
