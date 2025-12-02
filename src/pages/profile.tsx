import Image from "next/image";
import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import ProfileHeader from "@/components/ProfileHeader";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingsByUser, fetchProfile } from "@/lib/db_functions";
import { supabase } from "@/lib/supabase_client";
import type { Listing, UserProfile } from "@/types";

export default function ProfilePage() {
  const { user, error, signIn, signOut } = useUserContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

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

        // NEW: load avatar
        setAvatarUrl(p?.avatar_url ?? "");
      } catch {
        setProfile(null);
        setListings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // NEW: upload handler
  async function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      await supabase
        .from("profiles")
        // biome-ignore lint/style/useNamingConvention: Supabase column is snake_case
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      setAvatarUrl(`${publicUrl}?t=${Date.now()}`);
    } catch (_err) {
      // log removed (biome noConsole)
      alert("Upload failed");
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  }
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
        {/* Avatar section */}
        <div
          className="profile-avatar"
          style={{ marginRight: "20px", textAlign: "center" }}
        >
          <Image
            src={avatarUrl || "/default-avatar.png"}
            alt="Profile avatar"
            width={120}
            height={120}
            unoptimized
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
              marginBottom: "10px",
            }}
          />
          <label
            style={{
              padding: "6px 12px",
              backgroundColor: "#4285F4",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {uploading ? "Uploading..." : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

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
