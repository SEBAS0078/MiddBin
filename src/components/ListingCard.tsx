import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types";
import styles from "../styles/ListingCard.module.css";

type ListingCardProps = {
  item: Listing;
};

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <Link className={styles.card} href={`/listing/${item.id}`}>
      <Image
        src={item.imgs[0]}
        alt={item.title}
        className={styles.image}
        width={300}
        height={200}
        unoptimized
      />

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
