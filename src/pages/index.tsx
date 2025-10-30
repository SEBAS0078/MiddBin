import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import styles from "@/styles/Home.module.css";
import data from "../../data/seed.json";
import SearchBar from "../components/searchBar";
import CreateListing from "./listings/CreateListing";

export default function Home() {
  const [collection, setCollection] = useState(data);
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
      <div className={styles.logoWrapper}>
        <Image
          src="/MiddBinLogo.jpeg"
          alt="MiddBin Logo"
          width={100}
          height={100}
        />
      </div>
      <SearchBar />

      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1>MiddBin</h1>
          <p>A Market place for Middlebury college students</p>
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            {collection.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                price={listing.price}
                image={listing.picture}
              />
            ))}
          </div>
        </main>

        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
