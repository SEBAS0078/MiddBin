export default function Contact() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginTop: "1.5rem" }}>Contact Us</h1>

      <p style={{ maxWidth: "600px", marginTop: "0.5rem" }}>
        If you have questions, suggestions, or need support while using the
        marketplace, feel free to reach out using the information below.
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "10px",
          border: "1px solid #ccc",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Contact Info</h2>

        <p style={{ margin: "0.25rem 0" }}>
          <strong>Email:</strong> MiddBin@gmail.com
        </p>

        <p style={{ margin: "0.25rem 0" }}>
          <strong>Active Hours:</strong> Mon–Fri, 10am–4pm
        </p>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          We're here to help with listing issues, login problems, and general
          feedback.
        </p>
      </div>
    </div>
  );
}
