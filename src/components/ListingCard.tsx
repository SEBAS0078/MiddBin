import styles from "../styles/ListingCard.module.css";

type ListingItem = {
  title: string;
  picture: string;
  price: number;
  condition: string;
};

type ListingCardProps = {
  item: ListingItem;
};

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <div className={styles.card}>
      <img src={item.picture} alt={item.title} className={styles.image} />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.price}>${item.price}</p>
      <p className={styles.condition}>Condition: {item.condition}</p>
    </div>
  );
}
