import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import data from "../../data/seed.json";
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
          {collection.map((listing) => {
            return <h1 key={listing.id}>{listing.title}</h1>;
          })}
        </main>

        <footer className={styles.footer}>CS312 Project Template</footer>
      </div>
    </>
  );
}
