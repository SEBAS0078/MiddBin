import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { fetchProfile } from "@/lib/db_functions";
import type { UserProfile } from "@/types";

type ContactSectionProps = {
  // biome-ignore lint/style/useNamingConvention: matches Listing type
  seller_id: string;
};

export default function ContactSection({ seller_id }: ContactSectionProps) {
  const { user, signIn } = useUserContext();
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only fetch the seller profile if the viewer is logged in
  useEffect(() => {
    if (!user || !seller_id) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const profile = await fetchProfile(seller_id);
        setSeller(profile);
      } catch {
        setError("Unable to load contact info.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, seller_id]);

  // Viewer NOT logged in: show “you must sign in”
  if (!user) {
    return (
      <div className="mt-6 p-4 bg-indigo-800/60 rounded-xl">
        <p className="mb-2 text-sm">
          You must be signed in to view the seller&apos;s contact information.
        </p>
        <button
          type="button"
          onClick={signIn}
          className="px-4 py-2 bg-white text-indigo-900 rounded-full text-sm font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // Viewer logged in but still loading seller profile
  if (loading) {
    return (
      <div className="mt-6 p-4 bg-indigo-800/60 rounded-xl text-sm">
        Loading contact info…
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="mt-6 p-4 bg-indigo-800/60 rounded-xl text-sm">
        Contact info unavailable.
      </div>
    );
  }

  // Viewer logged in AND seller profile loaded
  return (
    <div className="mt-6 p-4 bg-indigo-800/60 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">Contact Seller</h2>
      <p className="text-sm">
        <span className="font-semibold">Name:</span> {seller.name ?? "Unknown"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Email:</span>{" "}
        <a
          href={`mailto:${seller.email}`}
          className="underline text-indigo-200 break-all"
        >
          {seller.email}
        </a>
      </p>
    </div>
  );
}
