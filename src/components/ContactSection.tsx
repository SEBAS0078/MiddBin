import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { fetchProfile } from "@/lib/db_functions";
import styles from "@/styles/ContactSection.module.css";
import type { UserProfile } from "@/types";

type ContactSectionProps = {
  // biome-ignore lint/style/useNamingConvention: DB requires snake_case
  seller_id: string;
};

export default function ContactSection({ seller_id }: ContactSectionProps) {
  const { user, signIn } = useUserContext();
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Not logged in
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.text}>
          You must be signed in to view the seller&apos;s contact information.
        </p>
        <button type="button" onClick={signIn} className={styles.button}>
          Sign in with Google
        </button>
      </div>
    );
  }

  // Loading seller info
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.text}>Loading contact info…</p>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.text}>Contact info unavailable.</p>
      </div>
    );
  }

  // Logged in, seller loaded
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Contact Seller</h2>

      <p className={styles.text}>
        <span className={styles.title}>Name:</span> {seller.name ?? "Unknown"}
      </p>

      <p className={styles.text}>
        <span className={styles.title}>Email:</span>{" "}
        <a href={`mailto:${seller.email}`} className={styles.email}>
          {seller.email}
        </a>
      </p>
    </div>
  );
}
