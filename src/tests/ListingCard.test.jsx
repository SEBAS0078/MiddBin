import { render, screen } from "@testing-library/react";
import ListingCard from "../components/ListingCard";

test("renders title, price, condition, and image", () => {
  const item = {
    title: "Lamp",
    price: "$45",
    condition: "Used",
    picture: "/lamp.jpg",
  };

  render(<ListingCard item={item} />);

  expect(screen.getByText("Lamp")).toBeTruthy();
  expect(screen.getByText(/\$45/)).toBeTruthy();
  expect(screen.getByText("Condition: Used")).toBeTruthy();
  const img = screen.getByAltText("Lamp");
  expect(img).toHaveAttribute("src", "/lamp.jpg");
});
