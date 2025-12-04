import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import styles from "@/styles/Home.module.css";

interface SearchBarProps {
  search: (query: string) => void;
}
export default function SearchBar({ search }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const doSearch = () => {
    search(inputValue);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search...."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchButton} type="button" onClick={doSearch}>
        Search
      </button>
    </div>
  );
}
