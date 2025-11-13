import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ListingGrid from "@/components/ListingGrid";
import styles from "@/styles/Home.module.css";
import data from "../../data/seed.json";
import CreateListing from "../components/CreateListing";

export interface Listing {
  id: number;
  title: string;
  price: number;
  details: string;
  picture: string;
  seller: string;
  category: string;
  subCategory: string;
  color: string;
  size: string;
  condition: string;
  gender: string;
}

export default function Home() {
  const [collection, setCollection] = useState<Listing[]>(
    (data as any[]).map((item) => ({
      ...item,
      subCategory: item["sub-category"],
    })),
  );
  const [createListing, setCreateListing] = useState(false);

  return (
    <>
      <Head>
        <title>MiddBin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul className={styles.navBar}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.page}>
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
          <p>A marketplace for Middlebury College students</p>

          {!createListing && (
            <button
              type="button"
              className={styles.createButton}
              onClick={() => setCreateListing(true)}
            >
              Create Listing!
            </button>
          )}

          {createListing && (
            <CreateListing
              collection={collection}
              setCollection={setCollection}
              setCreateListing={setCreateListing}
            />
          )}

          <ListingGrid collection={collection} />
        </main>

        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
