import * as Slider from "@radix-ui/react-slider";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/Home.module.css";
import type { Filters, Listing } from "@/types";

type ListingGridProps = {
  collection: Listing[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

export default function ListingGrid({
  collection,
  filters,
  onFilterChange,
}: ListingGridProps) {
  const catCategory = [
    "Furniture",
    "Electronics",
    "Clothing",
    "Books",
    "Dorm",
    "Other",
  ];

  const catColor = [
    "blue",
    "black",
    "white",
    "green",
    "red",
    "gray",
    "yellow",
    "brown",
    "purple",
    "orange",
  ];

  const minPrice = 0;
  const maxPrice = 2000;

  return (
    <div className={styles.pageContent}>
      {/* Search */}
      <SearchBar search={(query) => onFilterChange({ ...filters, query })} />

      {/* Filters */}
      <div className={styles.filters}>
        {/* Price Slider */}
        <div style={{ padding: "20px 0", width: 300 }}>
          <p style={{ marginBottom: 8, fontWeight: 500 }}>
            ${filters.minPrice ?? minPrice} - ${filters.maxPrice ?? maxPrice}
          </p>

          <Slider.Root
            value={[filters.minPrice ?? minPrice, filters.maxPrice ?? maxPrice]}
            min={minPrice}
            max={maxPrice}
            step={1}
            onValueChange={(val) =>
              onFilterChange({
                ...filters,
                minPrice: val[0],
                maxPrice: val[1],
              })
            }
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 24,
            }}
          >
            {/* Track */}
            <Slider.Track
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                height: 6,
                background: "#e0e0e0", // light gray track
                borderRadius: 3,
              }}
            >
              {/* Range */}
              <Slider.Range
                style={{
                  position: "absolute",
                  height: "100%",
                  background: "#ffffff", // Indigo-blue range
                  borderRadius: 3,
                }}
              />
            </Slider.Track>

            {/* Thumbs */}
            {[0, 1].map((i) => (
              <Slider.Thumb
                key={i}
                style={{
                  display: "block",
                  width: 20,
                  height: 20,
                  background: "#ffffff",
                  border: "2px solid #4f46e5",
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                }}
              />
            ))}
          </Slider.Root>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category">Category</label>
          <select
            value={filters.category ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            id="category"
          >
            <option value="">All</option>
            {catCategory.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label htmlFor="color">Color</label>
          <select
            value={filters.color ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filters, color: e.target.value })
            }
            id="color"
          >
            <option value="">All</option>
            {catColor.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div>
          <button
            className={styles.clearButton}
            type="button"
            onClick={() =>
              onFilterChange({
                category: "",
                color: "",
                query: "",
                minPrice,
                maxPrice,
              })
            }
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className={styles.listingGrid}>
        {collection.length > 0 ? (
          collection.map((listing) => (
            <ListingCard key={listing.id} item={listing} />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}
