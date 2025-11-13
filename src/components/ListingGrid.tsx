import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/Home.module.css";

type Listing = {
  id: number;
  name?: string;
  details?: string;
  picture: string;
  price: number;
  category?: string;
  color?: string;
  title: string;
  condition: string;
};
type ListingGridProps = {
  collection?: Listing[];
};

export default function ListingGrid({ collection = [] }: ListingGridProps) {
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [currentCat, setCurrentCat] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const catPrice = [
    ...new Set(
      collection.map((i: Listing) => {
        if (i.price > 100) return "100+";
        else if (i.price > 50) return "50-99";
        else if (i.price > 20) return "20-49";
        else return "0-19";
      }),
    ),
  ];
  const catCategory = [...new Set(collection.map((i: Listing) => i.category))];
  const catColor = [...new Set(collection.map((i: Listing) => i.color))];

  const priceInRange = (price: number): string => {
    if (price >= 100) return "100+";
    else if (price >= 50) return "50-99";
    else if (price >= 20) return "20-49";
    else return "0-19";
  };

  const filteredListings = collection.filter((item) => {
    return (
      (query === "" ||
        (item.name?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.details?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.category?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.color?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (item.price?.toString().includes(query) ?? false)) &&
      (currentCat === "" || item.category === currentCat) &&
      (currentColor === "" || item.color === currentColor) &&
      (currentPrice === "" || priceInRange(item.price) === currentPrice)
    );
  });

  return (
    <div>
      <SearchBar search={setQuery} />

      <div className={styles.filters}>
        <div>
          <label htmlFor="price">Price</label>
          <select
            onChange={(e) => setCurrentPrice(e.target.value)}
            id="price"
            value={currentPrice}
          >
            <option value="">All</option>
            {catPrice.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
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
            type="button"
            onClick={() => {
              setCurrentPrice("");
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
