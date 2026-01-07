// CategoryNavigation.jsx
import React from "react";

function CategoryNavigation({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: "hair", label: "Hair" },
    { id: "skin", label: "Skin" },
    { id: "lips", label: "Lips" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "16px",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          style={{
            flex: 1,
            minWidth: "70px",
            padding: "6px 10px",
            borderRadius: "6px",
            border:
              selectedCategory === cat.id
                ? "1px solid #007bff"
                : "1px solid #ccc",
            backgroundColor:
              selectedCategory === cat.id ? "#007bff" : "#f8f8f8",
            color: selectedCategory === cat.id ? "#fff" : "#333",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryNavigation;