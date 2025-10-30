import React from "react";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import ListingCard from "@/components/ListingCard";

export default function ListingGrid({ collection = [], setCurrentListing }) {
  const [currentPrice, setCurrentPrice] = useState();
  const [currentCat, setCurrentCat] = useState();
  const [currentColor, setCurrentColor] = useState();
const [query, setQuery] = useState("");

  const catPrice = [
    ...new Set(
      collection.map((i) => {
        if (i.price > 100) return "100+";
        else if (i.price > 50) return "50-100";
        else if (i.price > 20) return "20-50";
        else return "0-20";
      }),
    ),
  ];
  const catCategory = [...new Set(collection.map((i) => i.Category))];
  const catColor = [...new Set(collection.map((i) => i.color))];

  const filteredListings = collection.filter((item) => {
    return (
      ((currentCat=== "" || item.category === currentCat) &&
        (currentColor === "" || item.color === currentCat) &&
        (currentPrice === "" || item.price <= Number(maxPrice))) ??
      "No items matched the criteria."
    );
  });

  return (
        <div>
    <div className={styles.searchWrapper}>
      <label htmlFor="search"></label>
      <input
        type="text"
        id="start typing here...."
        name="search"
        placeholder="Search...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

      <div className={styles.listingGrid}>
            {collection.map((listing) => (
              <ListingCard key={listing.id} item={listing} />
            ))}
          </div>
        </div>
  );
}
