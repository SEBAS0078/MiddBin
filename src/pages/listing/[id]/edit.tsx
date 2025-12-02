//biome-ignore-all lint/style/useNamingConvention: this is for easy Title case of the categories
import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUser";
import {
  deleteListingImg,
  fetchListingById,
  getPublicUrl,
  updateListing,
  uploadImage,
} from "@/lib/db_functions";
import styles from "@/styles/CreateListing.module.css"; // reuse create listing CSS
import type { Listing } from "@/types";

export default function EditListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, signIn } = useUserContext();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Controlled inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");

  //Images
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImgs, setExistingImgs] = useState<string[]>([]);
  const [deletedImgs, setDeletedImgs] = useState<string[]>([]); // track which existing images the user wants to delete

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

  const removeExistingImg = (imgUrl: string) => {
    setExistingImgs(existingImgs.filter((url) => url !== imgUrl));
    setDeletedImgs([...deletedImgs, imgUrl]);
  };

  // --- FETCH LISTING ---
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    (async () => {
      try {
        setLoading(true);
        const l = await fetchListingById(id);
        setExistingImgs(l.imgs ?? []);
        setListing(l);
        setExistingImgs(l.imgs ?? []);
        setTitle(l.title);
        setPrice(l.price);
        setDescription(l.description ?? "");
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

  // --- FILE UPLOAD PREVIEW ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url); // now this is a statement, not an expression
      });
    };
  }, [previewUrls]);

  // Remove a newly selected file (not yet uploaded)
  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };
  // --- FORM SUBMIT ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !listing || !id || Array.isArray(id)) return;

    setIsSubmitting(true);

    try {
      // 1Update all normal listing fields
      await updateListing(listing.id, {
        title,
        description,
        price,
        category,
        subCategory,
        color,
        size,
        condition,
        gender,
      });

      //  Delete any existing images the user removed
      for (const imgUrl of deletedImgs) {
        await deleteListingImg(id, imgUrl); // DB function to delete from storage
      }

      // Upload new selected files
      const newImagePaths: string[] = [];
      for (const file of selectedFiles) {
        const path = await uploadImage(file, listing.id);
        if (path) newImagePaths.push(path);
      }

      // Convert uploaded paths to public URLs
      const newUrls = newImagePaths.map((path) => getPublicUrl(path));

      // Merge remaining existing images with newly uploaded ones
      const updatedImgs = [...existingImgs, ...newUrls];

      // Update listing row with final imgs array
      await updateListing(listing.id, { imgs: updatedImgs });

      router.push(`/listing/${listing.id}`);
    } catch (_err) {
      alert("❌ Something went wrong");
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => router.back();

  // --- RENDER ---
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>{error ?? "Loading listing..."}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <p>You must be signed in to edit a listing.</p>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={signIn}
          >
            Sign In
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </main>
    );
  }

  if (listing && user.id !== listing.user_id) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>You can only edit your own listings.</p>
      </main>
    );
  }

  return (
    <div>
      <h1 className={styles.header}>Edit Listing</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              className={styles.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Amazing and descriptive title"
            />
          </div>

          <div className={styles.inputLabel}>
            <input
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <label htmlFor="image" className={styles.uploadButton}>
              Upload Images
            </label>
          </div>

          {/* PREVIEW - new class */}
          <div className={styles.previewContainer}>
            {/* Existing images */}
            {existingImgs.map((url, idx) => (
              <div key={url} className={styles.previewWrapper}>
                <Image
                  src={url}
                  alt={`Existing image ${idx + 1}`}
                  width={150}
                  height={100}
                  className={styles.previewImage}
                  unoptimized
                />
                <button
                  type="button"
                  className={styles.deleteImageButton}
                  onClick={() => removeExistingImg(url)}
                >
                  X
                </button>
              </div>
            ))}

            {/* New selected files */}
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
                  ×
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
            />
          </div>

          <div className={styles.inputLabel}>
            <label htmlFor="price" className={styles.label}>
              Price *
            </label>
            <input
              id="price"
              type="number"
              className={styles.price}
              value={price}
              min={0}
              step={0.01}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
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

          {/* Clothing fields */}
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
            Save Changes
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

      {isSubmitting && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Updating your listing…</p>
            <div className={styles.spinner}></div>
          </div>
        </div>
      )}
    </div>
  );
}
