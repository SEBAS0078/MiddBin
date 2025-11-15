// biome-ignore-all lint/performance/noImgElement:temporary fix to allow <img> usage in this file

//import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import type { Listing } from "@/types/Listing";
import styles from "../styles/ListingCard.module.css";

type ListingCardProps = {
  item: Listing;
};

export default function ListingCard({ item }: ListingCardProps) {
  const router = useRouter();
  return (
    <Link className={styles.card} href={`/listing/${item.id}`}>
      <img src={item.img} alt={item.title} className={styles.image} />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.price}>${item.price}</p>
      <p className={styles.condition}>Condition: {item.condition}</p>
    </Link>
  );
}
