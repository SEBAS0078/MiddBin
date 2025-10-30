import { useState } from "react";
import SectionsView from "./SectionsView.jsx";
import TitlesView from "./TitlesView.jsx";

export default function Filter({ collection = [], setCurrentListing }) {
  const [currentPrice, setCurrentPrice] = useState();
  const [currentCat, setCurrentCat] = useState();
  const [currentColor, setCurrentColor] = useState();
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

  const filteredListings = itemsData.filter((item) => {
    return (
      ((category === "" || item.category === category) &&
        (color === "" || item.color === color) &&
        (maxPrice === "" || item.price <= Number(maxPrice))) ??
      "No items matched the criteria."
    );
  });

  return (
    <div>
      {" "}
      <SectionsView sections={sections} setCurrentSection={newSection} />
      {currentSection ? (
        <TitlesView
          articles={filteredTitles}
          setCurrentListing={setCurrentListing}
        />
      ) : (
        <p>Select a section</p>
      )}
    </div>
  );
}
