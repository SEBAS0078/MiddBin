import React, { useState } from "react";
import styles from "../styles/searchBar.module.css";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="start typing here...."
        name="search"
        placeholder="Search...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
