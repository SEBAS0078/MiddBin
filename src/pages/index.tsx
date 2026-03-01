import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListingGrid from "@/components/ListingGrid";
import Login from "@/components/Login";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingsUser } from "@/lib/db_functions";
import styles from "@/styles/Home.module.css";
import type { Filters, Listing } from "@/types";
import { fetchListings } from "../lib/db_functions";

export default function Home() {
  //PAGINATION
  const PageSize = 20;
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  //FILTERING
  const [filters, setFilters] = useState<Filters>({});

  //LISTINGS AND USER
  const [collection, setCollection] = useState<Listing[]>([]);
  const { user } = useUserContext();

  //LOAD
  useEffect(() => {
    async function loadListings() {
      const result = user
        ? await fetchListingsUser(user.id, page, PageSize, filters)
        : await fetchListings(page, PageSize, filters);

      if (!result.error) {
        setCollection(result.data);
        setTotalCount(result.count);
      }
    }

    loadListings();
  }, [user, page, filters]);

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

          <ListingGrid
            collection={collection}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1); // reset page when filters change
            }}
          />
          {/* Pagination Controls */}
          <div>
            <button
              type={"button"}
              className={styles.prevBtn}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ⬅️
            </button>

            <span>
              Page {page} of {Math.ceil(totalCount / PageSize)}
            </span>

            <button
              type={"button"}
              className={styles.nxtBtn}
              disabled={page >= Math.ceil(totalCount / PageSize)}
              onClick={() => setPage((p) => p + 1)}
            >
              ➡️
            </button>
          </div>

          <Login />
        </main>

        <footer className={styles.footer}>© 2025 MiddBin</footer>
      </div>
    </>
  );
}
