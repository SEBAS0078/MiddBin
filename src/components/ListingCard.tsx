import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Listing } from "@/types";
import { getOneListingImgUrl } from "../lib/db_functions";
import styles from "../styles/ListingCard.module.css";

type ListingCardProps = {
  item: Listing;
};

export default function ListingCard({ item }: ListingCardProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item.id) return; // exit if undefined

    async function fetchImages() {
      setLoading(true);
      const urls = await getOneListingImgUrl(item.id);
      setImgUrl(urls || "");
      setLoading(false);
    }
    fetchImages();
  }, [item.id]);

  return (
    <Link className={styles.card} href={`/listing/${item.id}`}>
      {loading ? (
        <div className={styles.imagePlaceholder}>Loading...</div>
      ) : imgUrl.length > 0 ? (
        <Image
          src={imgUrl}
          alt={item.title}
          className={styles.image}
          width={300}
          height={200}
          unoptimized
        />
      ) : null}

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.price}>${item.price}</p>
      <div className={styles.badgeContainer}>
        {item.condition ? (
          <p className={styles.badge}>{item.condition}</p>
        ) : null}
        {/* {item.category?<p className={styles.badge}> {item.category}</p> : null} */}
      </div>
    </Link>
  );
}
