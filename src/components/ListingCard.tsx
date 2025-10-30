type ListingCardProps = {
  title: string;
  price: number;
  image: string;
};

export default function ListingCard({ title, price, image }: ListingCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        width: "250px",
        textAlign: "center",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", borderRadius: "6px" }}
      />
      <h3 style={{ margin: "8px 0 4px", fontSize: "18px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#555" }}>${price}</p>
    </div>
  );
}
