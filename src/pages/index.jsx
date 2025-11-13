import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// 👇 import your new component
import ListingDetail from "@/components/ListingDetail";
import ListingGrid from "@/components/ListingGrid";
import styles from "@/styles/Home.module.css";
import data from "../../data/seed.json";
import CreateListing from "../components/CreateListing";

export default function Home() {
  const [collection, setCollection] = useState(data);
  const [createListing, setCreateListing] = useState(false);

  // 👇 temporary mock listing for previewing your detail page
  const mockListing = {
    title: "Modern Wooden Coffee Table",
    price: 220,
    condition: "new",
    category: "Furniture",
    color: "Brown",
    description: "Beautiful modern wooden table perfect for dorm rooms.",
    image: "/coffee-table.jpg",
    sellerName: "Alex Johnson",
    sellerEmail: "alex@middlebury.edu",
  };

  return (
    <>
      <Head>
        <title>MiddBin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- NAVBAR --- */}
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

      {/* --- MAIN PAGE --- */}
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

          {/* --- CREATE LISTING --- */}
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

          {/* --- EXISTING LISTINGS GRID --- */}
          <ListingGrid collection={collection} />

          {/* --- TEMPORARY: Your ListingDetail preview --- */}
        </main>

        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
