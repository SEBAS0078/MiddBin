import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingsUser } from "@/lib/db_functions";
import styles from "@/styles/Home.module.css";
import type { Listing } from "@/types";
import { fetchListings } from "../lib/db_functions";

export default function Home() {
  const [collection, setCollection] = useState<Listing[]>([]);
  const { user, error, signIn, signOut } = useUserContext();
  useEffect(() => {
    async function loadListings() {
      if (!user) {
        const { data, error } = await fetchListings();

        if (error) {
          alert("Error fetching listings:");
        } else {
          setCollection(data);
        }
      } else {
        const { data, error } = await fetchListingsUser(user.id);

        if (error) {
          alert("Error fetching listings:");
        } else {
          setCollection(data);
        }
      }
    }

    loadListings();
  }, [user]);
  return (
    <>
      <Head>
        <title>MiddBin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1>MiddBin</h1>
          <p>A marketplace for Middlebury college students</p>

          {/* <button onClick={signInWithGoogle} className={styles.createButton}>
            Login with Google
          </button> */}

          <Link className={styles.createButton} href="/CreateListing">
            Create Listing!
          </Link>
          <ListingGrid collection={collection} />
        </main>

        <footer className={styles.footer}>© 2025 MiddBin</footer>
      </div>
    </>
  );
}
