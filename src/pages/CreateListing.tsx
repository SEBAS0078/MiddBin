//biome-ignore-all lint/style/useNamingConvention: uppercase names
import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase_client";
import type { NewListing } from "@/types";
import { createListing } from "../lib/db_functions";
import styles from "../styles/CreateListing.module.css";

export default function CreateListing() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const { user, signIn } = useUserContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // Get current logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to create a listing.");
      return;
    }

    const sellerId = user.id;

    // Create listing object WITHOUT imgs
    const newListing: NewListing = {
      title,
      description: description || "",
      price,
      category,
      subCategory,
      color,
      condition,
      gender,
      user_id: sellerId,
      sold: false,
      imgs: [""],
    };

    try {
      const listingId = await createListing(newListing, selectedFiles);
      router.push(`/listing/${listingId}`);
    } catch (_error) {
      alert("❌ Something went wrong.");
    }
  };

  const handleCancel = () => {
    router.back(); // Navigates to the home page
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url); // now this is a statement, not an expression
      });
    };
  }, [previewUrls]);

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
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
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className={styles.fileInput} // hidden input
                />
                <label htmlFor="image" className={styles.uploadButton}>
                  Upload Images *
                </label>
              </div>
              <div className={styles.previewContainer}>
                {previewUrls.map((url, idx) => (
                  <div key={url} className={styles.previewWrapper}>
                    <Image
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      width={150}
                      height={100}
                      className={styles.previewImage}
                      unoptimized
                    />
                    <button
                      type="button"
                      className={styles.deleteImageButton}
                      onClick={() => removeSelectedFile(idx)}
                    >
                      X
                    </button>
                  </div>
                ))}
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
      {isLoading && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Creating your listing…</p>
            <div className={styles.spinner}></div>
          </div>
        </div>
      )}
    </div>
  );
}
