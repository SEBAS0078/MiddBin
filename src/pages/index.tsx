import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import styles from "@/styles/Home.module.css";
import Navbar from "../components/Navbar";
import { fetchListings } from "../lib/db_functions";

export type Listing = {
  title: string; // required
  description?: string; // optional, defaults to ""
  img: string; // required (picture URL)
  price: number; // required
  category?: string; // optional, defaults to ""
  subCategory?: string; // optional, defaults to ""
  color?: string; // optional, defaults to ""
  size?: string; // optional, defaults to ""
  condition?: string; // optional, defaults to ""
  gender?: string; // optional, defaults to ""
  created?: string; // auto-set timestamp
};

export default function Home() {
  const [collection, setCollection] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadListings() {
      const { data, error } = await fetchListings();

      if (error) {
        alert("Error fetching listings:");
      } else {
        setCollection(data);
      }
    }

    loadListings();
  }, []);

  return (
    <>
      <Head>
        <title>MiddBin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <div className={styles.logoWrapper}>
            <Image
              src="/MiddBinLogo.jpeg"
              alt="MiddBin Logo"
              width={100}
              height={100}
            />
          </div>

          <h1>MiddBin</h1>
          <p>A Market place for Middlebury college students</p>

          <Link className={styles.createButton} href="/CreateListing">
            Create Listing!
          </Link>
          <ListingGrid collection={collection} />
        </main>

        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
