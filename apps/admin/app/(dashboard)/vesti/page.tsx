import React from "react";

export default function ComingSoonPage() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Coming Soon</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        This page is under construction. Please check back later!
      </p>
    </div>
  );
}
