import { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function SearchBar({ search }) {
  const [inputValue, setInputValue] = useState("");

  const doSearch = () => {
    search(inputValue);
  };

  const key = (i) => {
    if (i.key === "Enter") {
      doSearch();
    }
  };
  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search...."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={key}
      />
      <button className={styles.createButton} type="button" onClick={doSearch}>
        Search
      </button>
    </div>
  );
}
