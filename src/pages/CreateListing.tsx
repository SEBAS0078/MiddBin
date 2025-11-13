import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { addListing } from "../lib/db_functions";
import styles from "../styles/CreateListing.module.css";

type Listing = {
  title: string; // required
  description?: string; // optional, defaults to ""
  img: string; // required (picture URL)
  price: number; // required
  category?: string; // optional, defaults to ""
  subCategory?: string; // optional, defaults to ""
  color?: string; // optional, defaults to ""
  size?: string; // optional, defaults to ""
  condition?: string; // optional, defaults to ""
  gender?: string; // optional, defaults to ""
  created?: string; // auto-set timestamp
};

export default function CreateListing() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const availableCategories = [
    "furniture",
    "electronics",
    "clothing",
    "books",
    "dorm",
    "tickets",
    "transportation",
    "free",
  ];
  const availableSubcategories: Record<string, string[]> = {
    furniture: ["Desk", "Chair", "Bed Frame", "Couch", "Dresser"],
    electronics: ["Laptop", "Headphones", "Phone", "Monitor", "Speakers"],
    clothing: ["Shirt", "Pants", "Jacket", "Shoes", "Accessories"],
    books: ["Textbooks", "Novels", "Course Readers", "Comics"],
    dorm: ["Mini Fridge", "Lamp", "Storage Bins", "Rug", "Decor"],
    tickets: ["Concert", "Sports", "Theater", "Student Events"],
    transportation: ["Bike", "Skateboard", "Carpool", "Scooter"],
    free: ["Miscellaneous", "Giveaways", "Leftovers"],
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || price === 0 || contact === "") {
      alert("⚠️ Please fill out all the required fields before submitting.");
      return;
    }

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
    };

    try {
      // ✅ Call your imported DB function
      const { error } = await addListing(listing);

      if (error) {
        //console.error("Error adding listing:", error);
        alert("❌ There was an error creating the listing.");
        return;
      }

      alert("✅ Listing created successfully!");
      router.back(); // navigate back after success
    } catch (_err) {
      //console.error("Unexpected error:", err);
      alert("❌ Something went wrong.");
    }
  };

  const handleCancel = () => {
    router.back(); // Navigates to the home page
  };

  return (
    <div>
      <Navbar />
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

          <div className={styles.inputLabel}>
            <label htmlFor="contact" className={styles.label}>
              Contact Info *
            </label>
            <input
              id="contact"
              className={styles.title}
              type="text"
              value={contact}
              placeholder="@middlebury.edu"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
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
          {category === "clothing" ? (
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
          ) : null}
          {category === "clothing" ? (
            <div className={styles.inputLabel}>
              <label htmlFor="size" className={styles.label}>
                Size
              </label>
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
            </div>
          ) : null}

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
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="used">Used</option>
            </select>
          </div>
          {category === "clothing" ? (
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
          ) : null}
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
  );
}
