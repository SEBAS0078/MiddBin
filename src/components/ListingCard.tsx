import Link from "next/link";
import styles from "../styles/ListingCard.module.css";

export interface ListingItem {
  id: number;
  title: string;
  price: number;
  condition: string;
  picture: string;
}

interface ListingCardProps {
  item: ListingItem;
}

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <Link href={`/listing/${item.id}`} className={styles.card}>
      <img src={item.picture} alt={item.title} className={styles.image} />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.price}>${item.price}</p>
      <p className={styles.condition}>Condition: {item.condition}</p>
    </Link>
  );
}
