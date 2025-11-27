import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingById, fetchProfile } from "@/lib/db_functions";
import styles from "@/styles/ListingDetail.module.css";
import type { Listing, UserProfile } from "@/types";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [sellerError, setSellerError] = useState<string | null>(null);

  const { user, signIn } = useUserContext();

  // Fetch listing
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    (async () => {
      const l = await fetchListingById(id);
      setListing(l);
    })();
  }, [id]);

  // Fetch seller info only if logged in
  useEffect(() => {
    if (!user || !listing?.seller_id) return;

    (async () => {
      setSellerLoading(true);
      setSellerError(null);

      try {
        const profile = await fetchProfile(listing.seller_id);
        setSeller(profile);
      } catch {
        setSellerError("Unable to load contact info.");
      } finally {
        setSellerLoading(false);
      }
    })();
  }, [user, listing?.seller_id]);

  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">Listing not found.</div>
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
            width={800}
            height={600}
            className={styles.image}
            unoptimized
          />
        </div>

        {/* INFO COLUMN */}
        <div className={styles.infoCol}>
          {/* Header row */}
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

          {/* Metadata */}
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

          {/* Description */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>
              {listing.description || "No description provided."}
            </p>
          </div>

          {/* CONTACT SECTION */}
          <div className={styles.contactCard}>
            <h2 className={styles.contactHeader}>Contact</h2>

            {/* Not logged in */}
            {!user && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>
                  You must be signed in to view the seller&apos;s contact
                  information.
                </p>
                <button
                  type="button"
                  onClick={signIn}
                  className={styles.signInButton}
                >
                  Sign in with Google
                </button>
              </div>
            )}

            {/* Loading seller info */}
            {user && sellerLoading && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>Loading contact info…</p>
              </div>
            )}

            {/* Error or null seller */}
            {user && !sellerLoading && (sellerError || !seller) && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>Contact info unavailable.</p>
              </div>
            )}

            {/* Seller info */}
            {user && seller && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>
                  <span className={styles.contactTitle}>Name:</span>{" "}
                  {seller.name ?? "Unknown"}
                </p>

                <p className={styles.contactText}>
                  <span className={styles.contactTitle}>Email:</span>{" "}
                  <a
                    href={`mailto:${seller.email}?subject=${encodeURIComponent(
                      `Interested in your MiddBin listing: ${listing.title}`,
                    )}&body=${encodeURIComponent(
                      `Hi ${seller.name ?? "there"},\n\nI saw your listing for "${
                        listing.title
                      }" and I'm interested. Could you provide more details?\n\nThanks!`,
                    )}`}
                    className={styles.emailLink}
                  >
                    Email Seller
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
