//biome-ignore-all lint/style/useNamingConvention: uppercase names

import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase_client";
import type { Listing } from "@/types";
import { createListing } from "../lib/db_functions";
import styles from "../styles/CreateListing.module.css";

export default function CreateListing() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const { user, signIn } = useUserContext();

  const availableCategories = [
    "Furniture",
    "Electronics",
    "Clothing",
    "Books",
    "Dorm",
    "Tickets",
    "Transportation",
    "Free",
    "Other",
  ];

  const availableSubcategories: Record<string, string[]> = {
    Furniture: ["Desk", "Chair", "Bed Frame", "Couch", "Dresser", "Other"],
    Electronics: [
      "Laptop",
      "Headphones",
      "Phone",
      "Monitor",
      "Speakers",
      "Other",
    ],
    Clothing: ["Shirt", "Pants", "Jacket", "Shoes", "Accessories", "Other"],
    Books: ["Textbooks", "Novels", "Course Readers", "Comics", "Other"],
    Dorm: ["Mini Fridge", "Lamp", "Storage Bins", "Rug", "Decor", "Other"],
    Tickets: ["Concert", "Sports", "Theater", "Student Events", "Other"],
    Transportation: ["Bike", "Skateboard", "Carpool", "Scooter", "Other"],
    Free: ["Miscellaneous", "Giveaways", "Leftovers", "Other"],
    Other: ["Other"],
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to create a listing.");
      return;
    }

    const sellerId = user.id;

    const listing: Listing = {
      title: title, // required
      description: description || "", // default empty
      price: price, // required
      img: picture, // required (maps to 'picture' input)
      created: new Date().toISOString(), // timestamp for when created
      category: category || "",
      subCategory: subCategory || "",
      color: color || "",
      condition: condition || "",
      gender: gender || "",
      seller_id: sellerId,
    };

    try {
      await createListing(listing);
      router.back(); // navigate back after success
    } catch (_error) {
      //console.error("Unexpected error:", error);
      alert("❌ Something went wrong.");
    }
  };

  const handleCancel = () => {
    router.back(); // Navigates to the home page
  };

  return (
    <div>
      {/* If user is NOT logged in → Show Login + Cancel buttons */}
      {!user && (
        <div>
          <h1 className={styles.header}>Please Login to create a listing</h1>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.submitButton}
              onClick={signIn}
            >
              Login
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* If user IS logged in → Show full form */}
      {user && (
        <div>
          <h1 className={styles.header}>Create Listing</h1>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            {/* LEFT COLUMN */}
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <label htmlFor="title" className={styles.label}>
                  Title *
                </label>
                <input
                  id="title"
                  className={styles.title}
                  type="text"
                  value={title}
                  placeholder="Amazing and descriptive title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.inputLabel}>
                <label htmlFor="picture" className={styles.label}>
                  Picture URL *
                </label>
                <input
                  id="picture"
                  className={styles.title}
                  type="url"
                  value={picture}
                  placeholder="https://example.com/image.jpg"
                  onChange={(e) => setPicture(e.target.value)}
                />
              </div>

              <div className={styles.inputLabel}>
                <label htmlFor="description" className={styles.label}>
                  Description
                </label>
                <textarea
                  className={styles.textArea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className={styles.inputLabel}>
                <label htmlFor="price" className={styles.label}>
                  Price *
                </label>
                <input
                  id="price"
                  className={styles.price}
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  placeholder="0"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPrice(val < 0 ? 0 : val);
                  }}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <label htmlFor="category" className={styles.label}>
                  Category
                </label>
                <select
                  id="category"
                  className={styles.title}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputLabel}>
                <label htmlFor="subCategory" className={styles.label}>
                  Subcategory
                </label>
                <select
                  id="subCategory"
                  className={styles.title}
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select subcategory</option>
                  {availableSubcategories[category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputLabel}>
                <label htmlFor="condition" className={styles.label}>
                  Condition
                </label>
                <select
                  id="condition"
                  className={styles.title}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Select condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div
                className={`${styles.clothingWrapper} ${
                  category === "Clothing" ? styles.show : ""
                }`}
              >
                <div className={styles.inputLabel}>
                  <label htmlFor="color" className={styles.label}>
                    Color
                  </label>
                  <select
                    id="color"
                    className={styles.title}
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Select color</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>

                <div className={styles.inputLabel}>
                  <label htmlFor="size" className={styles.label}>
                    Size
                  </label>
                  {subCategory !== "Shoes" ? (
                    <select
                      id="size"
                      className={styles.title}
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  ) : (
                    <select
                      id="size"
                      className={styles.title}
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="">Select shoe size</option>

                      <optgroup label="Men's US">
                        <option value="6">6</option>
                        <option value="6.5">6.5</option>
                        <option value="7">7</option>
                        <option value="7.5">7.5</option>
                        <option value="8">8</option>
                        <option value="8.5">8.5</option>
                        <option value="9">9</option>
                        <option value="9.5">9.5</option>
                        <option value="10">10</option>
                        <option value="10.5">10.5</option>
                        <option value="11">11</option>
                        <option value="11.5">11.5</option>
                        <option value="12">12</option>
                      </optgroup>

                      <optgroup label="Women's US">
                        <option value="5">5</option>
                        <option value="5.5">5.5</option>
                        <option value="6">6</option>
                        <option value="6.5">6.5</option>
                        <option value="7">7</option>
                        <option value="7.5">7.5</option>
                        <option value="8">8</option>
                        <option value="8.5">8.5</option>
                        <option value="9">9</option>
                        <option value="9.5">9.5</option>
                        <option value="10">10</option>
                      </optgroup>
                    </select>
                  )}
                </div>

                <div className={styles.inputLabel}>
                  <label htmlFor="gender" className={styles.label}>
                    Gender
                  </label>
                  <select
                    id="gender"
                    className={styles.title}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="unisex">Unisex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
