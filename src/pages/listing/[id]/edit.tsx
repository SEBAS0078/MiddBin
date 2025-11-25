import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import { fetchListingById, updateListing } from "@/lib/db_functions";
import styles from "@/styles/CreateListing.module.css";
import type { Listing } from "@/types";

export default function EditListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUserContext();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");

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
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Furniture: ["Desk", "Chair", "Bed Frame", "Couch", "Dresser", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Electronics: [
      "Laptop",
      "Headphones",
      "Phone",
      "Monitor",
      "Speakers",
      "Other",
    ],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Clothing: ["Shirt", "Pants", "Jacket", "Shoes", "Accessories", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Books: ["Textbooks", "Novels", "Course Readers", "Comics", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Dorm: ["Mini Fridge", "Lamp", "Storage Bins", "Rug", "Decor", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Tickets: ["Concert", "Sports", "Theater", "Student Events", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Transportation: ["Bike", "Skateboard", "Carpool", "Scooter", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Free: ["Miscellaneous", "Giveaways", "Leftovers", "Other"],
    // biome-ignore lint/style/useNamingConvention: category keys are human-readable labels
    Other: ["Other"],
  };

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    (async () => {
      try {
        setLoading(true);
        const l = await fetchListingById(id);
        setListing(l);

        // pre-fill form from listing
        setTitle(l.title);
        setPrice(l.price);
        setDescription(l.description ?? "");
        setPicture(l.img);
        setCategory(l.category ?? "");
        setSubCategory(l.subCategory ?? "");
        setColor(l.color ?? "");
        setSize(l.size ?? "");
        setCondition(l.condition ?? "");
        setGender(l.gender ?? "");
      } catch {
        setError("Could not load listing.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Auth / ownership guards
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>You must be signed in to edit a listing.</p>
      </main>
    );
  }

  if (!loading && listing && user.id !== listing.seller_id) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>You can only edit your own listings.</p>
      </main>
    );
  }

  if (loading || !listing) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>{error ?? "Loading listing..."}</p>
      </main>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateListing(String(listing.id), {
        title,
        description,
        price,
        img: picture,
        category,
        subCategory,
        color,
        size,
        condition,
        gender,
      });
      alert("✅ Listing updated!");
      router.push(`/listing/${listing.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(`❌ Something went wrong: ${message}`);
    }
  };

  const handleCancel = () => {
    router.push(`/listing/${listing.id}`);
  };

  return (
    <div>
      <h1 className={styles.header}>Edit Listing</h1>

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
              id="description"
              className={styles.textArea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
              onChange={(e) => {
                const val = Number(e.target.value);
                setPrice(val < 0 ? 0 : val);
              }}
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
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
                  {/* shoe sizes here if you want */}
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
            Save changes
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
