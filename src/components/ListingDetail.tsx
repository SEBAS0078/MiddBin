import styles from "@/styles/ListingDetail.module.css";
import type { Listing } from "@/types/Listing";
import ContactSection from "./ContactSection";

interface ListingDetailProps {
  listing: Listing | null;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  if (!listing) {
    return (
      <div className="text-center tet-gray-400 mt-10">No listing selected.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={listing.img}
            alt={listing.title}
            className={styles.ListingDetail}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-xl text-indigo-300 mb-4">${listing.price}</p>

            {listing.category && (
              <p className="text-sm text-gray-300 mb-2">
                Condition: <span>{listing.condition}</span>
              </p>
            )}
            {listing.category && (
              <p className="text-sm text-gray-300 mb-2">
                Category: <span>{listing.category}</span>
              </p>
            )}
            {listing.color && (
              <p className="text-sm text-gray-300 mb-2">
                Color: <span>{listing.color}</span>
              </p>
            )}

            <p className="text-gray-200 mt-4">{listing.description}</p>
          </div>

          <ContactSection
            sellerName={listing.title || "Unknown Seller"}
            sellerEmail={listing.title || "example@middlebury.edu"}
          />
        </div>
      </div>
    </div>
  );
}
