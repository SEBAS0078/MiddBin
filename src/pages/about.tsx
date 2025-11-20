import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />

      <h1 style={{ fontSize: "2rem", marginTop: "1.5rem" }}>About</h1>

      <p style={{ maxWidth: "600px", marginTop: "0.5rem" }}>
        This marketplace project was built to give Middlebury students an easier
        way to buy, sell, and exchange items around campus. Our goal is to make
        student-to-student transactions simple, fast, and reliable.
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "10px",
          border: "1px solid #ccc",
          maxWidth: "450px",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>What this site offers</h2>

        <ul style={{ marginLeft: "1rem", lineHeight: "1.6" }}>
          <li>Browse items listed by other students</li>
          <li>Create your own listings with pictures and details</li>
          <li>Easy contact between buyers and sellers</li>
          <li>A clean, simple interface focused on usability</li>
        </ul>
      </div>
    </div>
  );
}
