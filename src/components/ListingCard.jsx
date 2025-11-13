import Link from "next/link";
import styles from "../styles/ListingCard.module.css";

export default function ListingCard({ item }) {
  return (
    <Link href={`/listing/${item.id}`} className={styles.link}>
      <div className={styles.card}>
        <img
          src={item.picture || "/placeholder.png"}
          alt={item.title}
          className={styles.image}
        />
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>${item.price}</p>
        <p className={styles.condition}>Condition: {item.condition}</p>
      </div>
    </Link>
  );
}
