// CategoryNavigation.jsx
import React from "react";
import { getCategoryList } from "./avatarConfig";

function CategoryNavigation({ selectedCategory, onCategoryChange }) {
  const categories = getCategoryList();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Changed to column for vertical stack
        gap: "8px",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 16px",
            borderRadius: "6px",
            border: selectedCategory === cat.id ? "2px solid #007bff" : "1px solid #ccc",
            backgroundColor: selectedCategory === cat.id ? "#007bff" : "#ffffff",
            color: selectedCategory === cat.id ? "#fff" : "#333",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: selectedCategory === cat.id ? "700" : "700",
            textTransform: "capitalize",
            textAlign: "left",
            whiteSpace: "nowrap",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryNavigation;
