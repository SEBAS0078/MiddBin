// import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/CreateListing.module.css";

export default function CreateListing({
  collection,
  setCollection,
  setCreateListing,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");
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
  const availableSubcategories = {
    furniture: ["Desk", "Chair", "Bed Frame", "Couch", "Dresser"],
    electronics: ["Laptop", "Headphones", "Phone", "Monitor", "Speakers"],
    clothing: ["Shirt", "Pants", "Jacket", "Shoes", "Accessories"],
    books: ["Textbooks", "Novels", "Course Readers", "Comics"],
    dorm: ["Mini Fridge", "Lamp", "Storage Bins", "Rug", "Decor"],
    tickets: ["Concert", "Sports", "Theater", "Student Events"],
    transportation: ["Bike", "Skateboard", "Carpool", "Scooter"],
    free: ["Miscellaneous", "Giveaways", "Leftovers"],
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((title === "") | (price === "") | (contact === "")) {
      alert("⚠️ Please fill out all the required fields before submitting.");
      return;
    } else {
      //Max ID
      const maxId = collection.reduce((max, listing) => {
        return listing.id > max ? listing.id : max;
      }, 0); // 0 is the initial max

      const listing = {
        title: title,
        details: description,
        picture: "INSERT URL",
        id: maxId + 1,
        seller: "Sebastian",
        price: price,
        category: "clothes",
        subCategory: "shirt",
        color: "blue",
        size: "M",
        condition: "used",
        gender: "M",
      };

      const newArray = [...collection, listing];
      setCollection(newArray);
      //setCurrentArticle(article);
      setCreateListing(false);
    }
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
        <label for="title" className={styles.label}>
          Title *
        </label>
        <input
          className={styles.title}
          id="title"
          type="text"
          value={title}
          placeHolder="Amazing and descriptive title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Picture URL */}
        <label htmlFor="picture" className={styles.label}>
          Picture URL *
        </label>
        <input
          className={styles.title}
          id="picture"
          type="url"
          value={picture}
          placeholder="https://example.com/image.jpg"
          onChange={(e) => setPicture(e.target.value)}
        />

        <label for="description" className={styles.label}>
          Description
        </label>
        <textarea
          className={styles.textArea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label for="price" className={styles.label}>
          Price *
        </label>
        <input
          id="price"
          className={styles.price}
          type="number"
          value={price}
          placeholder="PRICE"
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* Contact */}
        <label htmlFor="contact" className={styles.label}>
          Contact Info *
        </label>
        <input
          className={styles.title}
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {/* Category */}
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

        {/* Subcategory (changes dynamically) */}
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
        {/* Color */}
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
        {/* Size */}
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

        {/* Condition */}
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

        {/* Gender */}
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

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setCreateListing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
