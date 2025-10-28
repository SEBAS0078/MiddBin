export default function ListingCard() {
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
        src="https://via.placeholder.com/200x120"
        alt="Item"
        style={{ width: "100%", borderRadius: "6px" }}
      />
      <h3 style={{ margin: "8px 0 4px", fontSize: "18px" }}>Sample Item</h3>
      <p style={{ margin: 0, color: "#555" }}>$20</p>
    </div>
  );
}
