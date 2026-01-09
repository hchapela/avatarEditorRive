// OptionsSelector.jsx
// Shows options for the currently selected category and lets
// the user choose one.
//
// Props:
// - category: "hair" | "skin" | "lips" | ...
// - options: array of strings (labels to show)
// - selectedOption: string (current choice for this category)
// - onOptionSelect: function(option: string)

import React from "react";

function OptionsSelector({ category, options, selectedOption, onOptionSelect }) {
  const labelByCategory = {
    hair: "Choose a hairstyle:",
    skin: "Choose a skin tone:",
    lips: "Choose a lip color:",
  };

  const title = labelByCategory[category] || "Choose an option:";

  return (
    <div style={{ marginTop: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onOptionSelect(opt)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: opt === selectedOption ? "1px solid #28a745" : "1px solid #ccc",
              backgroundColor: opt === selectedOption ? "#28a745" : "#fafafa",
              color: opt === selectedOption ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OptionsSelector;
