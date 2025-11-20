import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/Home.module.css";
import type { Listing } from "@/types";

type ListingGridProps = {
  collection: Listing[];
};

export default function ListingGrid({ collection = [] }: ListingGridProps) {
  const [currentCat, setCurrentCat] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const prices = collection.map((i: Listing) => Math.floor(i.price));

  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 0;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    if (collection.length > 0) {
      const prices = collection.map((i) => Math.floor(i.price));
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [collection]);

  const catCategory = [...new Set(collection.map((i: Listing) => i.category))];
  const catColor = [...new Set(collection.map((i: Listing) => i.color))];

  const filteredListings = collection.filter((item) => {
    return (
      (query === "" ||
        (item.title?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.description?.toLowerCase().includes(query.toLowerCase()) ??
          false) ||
        (item.category?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.color?.toLowerCase().includes(query.toLowerCase()) ?? false)) &&
      (currentCat === "" || item.category === currentCat) &&
      (currentColor === "" || item.color === currentColor) &&
      (priceRange[0] === null ||
        priceRange[1] === null ||
        (item.price >= priceRange[0] && item.price <= priceRange[1]))
    );
  });

  return (
    <div className={styles.pageContent}>
      <SearchBar search={setQuery} />

      <div className={styles.filters}>
        <div style={{ padding: 40 }}>
          <p>
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
          <Slider.Root
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            min={minPrice}
            max={maxPrice}
            step={1}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: 300,
              height: 30,
            }}
          >
            <Slider.Track
              style={{
                background: "#ccc",
                position: "relative",
                flexGrow: 1,
                height: 4,
                borderRadius: 2,
              }}
            >
              <Slider.Range
                style={{
                  background: "blue",
                  position: "absolute",
                  height: "100%",
                  borderRadius: 2,
                }}
              />
            </Slider.Track>
            <Slider.Thumb
              style={{
                display: "block",
                width: 16,
                height: 16,
                background: "white",
                border: "2px solid black",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            <Slider.Thumb
              style={{
                display: "block",
                width: 16,
                height: 16,
                background: "white",
                border: "2px solid black",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Slider.Root>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            onChange={(e) => setCurrentCat(e.target.value)}
            id="category"
            value={currentCat}
          >
            <option value="">All</option>
            {catCategory.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <select
            onChange={(e) => setCurrentColor(e.target.value)}
            id="color"
            value={currentColor}
          >
            <option value="">All</option>
            {catColor.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className={styles.clearButton}
            type="button"
            onClick={() => {
              setPriceRange([minPrice, maxPrice]);
              setCurrentCat("");
              setCurrentColor("");
              setQuery("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className={styles.listingGrid}>
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} item={listing} />
        ))}
        {filteredListings.length === 0 && <p>No listings found.</p>}
      </div>
    </div>
  );
}
