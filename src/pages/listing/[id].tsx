import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import {
  deleteListing,
  fetchListingById,
  fetchProfile,
  updateListing,
} from "@/lib/db_functions";
import styles from "@/styles/ListingDetail.module.css";
import type { Listing, UserProfile } from "@/types";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [sellerError, setSellerError] = useState<string | null>(null);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { user, signIn } = useUserContext();

  const handleDelete = async () => {
    if (!id) return;

    // Ensure id is a string, not an array
    const listingId = Array.isArray(id) ? id[0] : id;

    try {
      await deleteListing(listingId);
      router.push("/");
    } catch (_error) {
      alert("❌ Something went wrong.");
    }
  };

  const handleSold = async () => {
    if (!id || !listing) return;

    // Ensure id is a string, not an array
    const listingId = Array.isArray(id) ? id[0] : id;

    try {
      await updateListing(listingId, { sold: !listing.sold });
      router.reload();
    } catch (_error) {
      alert("❌ Something went wrong.");
    }
  };
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
    if (!user || !listing?.user_id) return;

    (async () => {
      setSellerLoading(true);
      setSellerError(null);

      try {
        const profile = await fetchProfile(listing.user_id);
        setSeller(profile);
      } catch {
        setSellerError("Unable to load contact info.");
      } finally {
        setSellerLoading(false);
      }
    })();
  }, [user, listing?.user_id]);

  if (!listing) {
    return (
      <div className="text-center text-gray-400 mt-10">Listing not found.</div>
    );
  }

  const isOwner = user?.id === listing.user_id;

  const handlePrevImage = () => {
    setCurrentImgIndex((prev) =>
      prev === 0 ? listing.imgs.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImgIndex((prev) =>
      prev === listing.imgs.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => router.push("/")}
        className={styles.backButton}
      >
        ← Back to Listings
      </button>
      <div className={styles.card}>
        {isOwner && (
          <div className={styles.buttons}>
            {!listing.sold && (
              <>
                <button
                  type="button"
                  onClick={() => router.push(`/listing/${listing.id}/edit`)}
                  className={styles.editButton}
                >
                  Edit listing ✏️
                </button>
                <button
                  type="button"
                  onClick={handleSold}
                  className={styles.soldButton}
                >
                  Mark as Sold ✅
                </button>
              </>
            )}
            {listing.sold && (
              <button
                type="button"
                onClick={handleSold}
                className={styles.editButton}
              >
                Unmark as Sold
              </button>
            )}

            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete Listing 🗑️
            </button>
          </div>
        )}
        {/* IMAGE COLUMN */}
        <div className={styles.imageCol}>
          {listing.imgs.length > 0 ? (
            <div className={styles.simpleCarousel}>
              {listing.imgs.length > 1 && (
                <button
                  type="button"
                  className={styles.prevArrow}
                  onClick={handlePrevImage}
                >
                  &#8592;
                </button>
              )}

              <Image
                src={listing.imgs[currentImgIndex]}
                alt={`${listing.title} image`}
                width={800}
                height={600}
                className={styles.simpleImage}
                unoptimized
              />

              {listing.imgs.length > 1 && (
                <button
                  type="button"
                  className={styles.nextArrow}
                  onClick={handleNextImage}
                >
                  &#8594;
                </button>
              )}
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>No images available</div>
          )}
        </div>

        {/* INFO COLUMN */}
        <div className={styles.infoCol}>
          {/* Header row */}
          {listing.sold ? <h2 className={styles.soldBadge}>Sold</h2> : null}
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{listing.title}</h1>
              <p className={styles.price}>${listing.price}</p>
            </div>
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

            {user && sellerLoading && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>Loading contact info…</p>
              </div>
            )}

            {user && !sellerLoading && (sellerError || !seller) && (
              <div className={styles.contactWrapper}>
                <p className={styles.contactText}>Contact info unavailable.</p>
              </div>
            )}

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
                      `Hi ${seller.name ?? "there"},\n\nI saw your listing for "${listing.title}" and I'm interested. Could you provide more details?\n\nThanks!`,
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
