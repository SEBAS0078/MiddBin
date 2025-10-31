import { render } from "@testing-library/react";
import Filter from "../components/Filter";

global.category = "";
global.color = "";
global.maxPrice = "";

test("renders Filter without crashing", () => {
  const mockCollection = [
    { price: 10, category: "Home", color: "Red" },
    { price: 60, category: "Office", color: "Blue" },
  ];
  render(<Filter collection={mockCollection} setCurrentListing={() => {}} />);
  expect(document.querySelector("div")).toBeTruthy();
});
