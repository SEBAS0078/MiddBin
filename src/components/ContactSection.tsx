import React from "react";

interface ContactSectionProps {
  sellerName: string;
  sellerEmail: string;
}

export default function ContactSection({
  sellerName,
  sellerEmail,
}: ContactSectionProps) {
  return (
    <div
      style={{
        backgroundColor: "rgba(30,30,60,0.6)",
        border: "1px solid rgba(99,102,241,0.5)",
        borderRadius: "0.75rem",
        padding: "1rem",
        color: "white",
        marginTop: "1.5rem",
      }}
    >
      <h2
        style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}
      >
        Contact Seller
      </h2>
      <p style={{ marginBottom: "1rem" }}>
        Seller: <span style={{ fontWeight: "bold" }}>{sellerName}</span>
      </p>

      <a
        href={`mailto:${sellerEmail}?subject=Interested in your listing`}
        style={{
          display: "inline-block",
          backgroundColor: "#4f46e5",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          color: "white",
          textDecoration: "none",
        }}
      >
        Email Seller
      </a>
    </div>
  );
}
