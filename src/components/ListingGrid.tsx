import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/Home.module.css";
import type { Listing } from "@/types";

type ListingGridProps = {
  collection: Listing[];
};
function matchesFilters(
  item: Listing,
  query: string,
  currentCat: string,
  currentColor: string,
  priceRange: [number, number],
) {
  const q = query.toLowerCase();

  const matchesQuery =
    q === "" ||
    item.title?.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.category?.toLowerCase().includes(q) ||
    item.color?.toLowerCase().includes(q);

  const matchesCategory = currentCat === "" || item.category === currentCat;
  const matchesColor = currentColor === "" || item.color === currentColor;
  const matchesPrice =
    item.price >= priceRange[0] && item.price <= priceRange[1];

  return matchesQuery && matchesCategory && matchesColor && matchesPrice;
}

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
      const priceVals = collection.map((i) => Math.floor(i.price));
      const minP = Math.floor(Math.min(...priceVals));
      const maxP = Math.ceil(Math.max(...priceVals));
      setPriceRange([minP, maxP]);
    }
  }, [collection]);

  const catCategory = [...new Set(collection.map((i: Listing) => i.category))];
  const catColor = [...new Set(collection.map((i: Listing) => i.color))];

  const filteredListings = collection.filter((item) =>
    matchesFilters(item, query, currentCat, currentColor, priceRange),
  );

  return (
    <div className={styles.pageContent}>
      <SearchBar search={setQuery} />

      <div className={styles.filters}>
        <div className={styles.sliderWrapper}>
          <p>
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>

          <Slider.Root
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            min={minPrice}
            max={maxPrice}
            step={1}
            className={styles.sliderRoot}
          >
            <Slider.Track className={styles.sliderTrack}>
              <Slider.Range className={styles.sliderRange} />
            </Slider.Track>
            <Slider.Thumb className={styles.sliderThumb} />
            <Slider.Thumb className={styles.sliderThumb} />
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
