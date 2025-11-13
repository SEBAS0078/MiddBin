import Image from "next/image";
import styles from "../styles/ListingCard.module.css";

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

type ListingCardProps = {
  item: Listing;
};

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <div className={styles.card}>
      <Image src={item.img} alt={item.title} className={styles.image} />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.price}>${item.price}</p>
      <p className={styles.condition}>Condition: {item.condition}</p>
    </div>
  );
}
