import Image from "next/image";
import { useRouter } from "next/router";
import { useUserContext } from "@/hooks/useUser";
import styles from "@/styles/ListingDetail.module.css";
import type { Listing } from "@/types";
import ContactSection from "./ContactSection";

interface ListingDetailProps {
  listing: Listing | null;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  const router = useRouter();
  const { user } = useUserContext();

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Listing not found.
      </div>
    );
  }

  const isOwner = user?.id === listing.seller_id;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* IMAGE COLUMN */}
        <div className={styles.imageCol}>
          <Image
            src={listing.img}
            alt={listing.title}
            className={styles.image}
            width={800}
            height={600}
            unoptimized
          />
        </div>

        {/* INFO COLUMN */}
        <div className={styles.infoCol}>
          {/* Title + price + edit button */}
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{listing.title}</h1>
              <p className={styles.price}>${listing.price}</p>
            </div>

            {isOwner && (
              <button
                type="button"
                onClick={() => router.push(`/listing/${listing.id}/edit`)}
                className={styles.editButton}
              >
                Edit listing
              </button>
            )}
          </div>

          {/* Metadata chips */}
          <div className={styles.metaRow}>
            {listing.category && (
              <span className={styles.badge}>{listing.category}</span>
            )}
            {listing.condition && (
              <span className={styles.badge}>{listing.condition}</span>
            )}
            {listing.color && (
              <span className={styles.badge}>{listing.color}</span>
            )}
          </div>

          {/* Description section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>
              {listing.description || "No description provided."}
            </p>
          </div>

          {/* Contact card, bottom-right of the big card */}
          <div className={styles.contactCard}>
            <ContactSection seller_id={listing.seller_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
