import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingsByUser, fetchProfile } from "@/lib/db_functions";
import type { Listing, UserProfile } from "@/types";

export default function ProfilePage() {
  const { user, error, signIn, signOut } = useUserContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setListings([]);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const p = await fetchProfile(user.id);
        const l = await fetchListingsByUser(user.id);

        setProfile(p);
        setListings(l);
      } catch {
        setProfile(null);
        setListings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Not signed in
  if (!user) {
    return (
      <main className="profile-page">
        <h1>Please Sign In</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={signIn}>
          Sign In with Google
        </button>
      </main>
    );
  }

  // Still loading
  if (loading) {
    return (
      <main className="profile-page">
        <p>Loading...</p>
      </main>
    );
  }

  // Build display values:
  // name/email primarily from auth, but fall back to profiles if needed
  const displayName =
    (profile?.name as string | undefined) ??
    (user.user_metadata?.full_name as string | undefined) ??
    (user.email ? user.email.split("@")[0] : "") ??
    "";

  const displayEmail = profile?.email ?? user.email ?? "";

  const displayRating = profile?.rating ?? null;

  return (
    <main className="profile-page">
      <div className="profile-header-row">
        <ProfileHeader
          user={{
            username: displayName,
            email: displayEmail,
            rating: displayRating ?? undefined,
          }}
        />
        <button type="button" onClick={signOut} className="profile-signout">
          Sign Out
        </button>
      </div>

      <section className="profile-listings">
        <h2 className="profile-listings-title">My Listings</h2>
        <ListingGrid collection={listings} />
      </section>
    </main>
  );
}
