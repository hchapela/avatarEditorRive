// App.jsx
import React, { useState, useRef, useCallback } from "react";
import AvatarPreview from "./AvatarPreview";
import CategoryNavigation from "./CategoryNavigation";
import OptionsSelector from "./OptionsSelector";
import ExportButton from "./ExportButton";
import { AVATAR_CATEGORIES } from "./avatarConfig";

function App() {
  // Initialize state for ALL categories automatically
  const firstCategory = Object.keys(AVATAR_CATEGORIES)[0];
  
  const [selectedCategory, setSelectedCategory] = useState(firstCategory);
  const [availableOptions, setAvailableOptions] = useState({});
  const [categoryTitles, setCategoryTitles] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const canvasRef = useRef(null);

  const handleEnumValuesLoaded = useCallback((enumValues, titles) => {
    console.log("[APP] Loaded enum values:", enumValues);
    console.log("[APP] Loaded titles:", titles);
    
    setAvailableOptions(enumValues);
    setCategoryTitles(titles || {});

    // Set default selection (first value) for each category
    const defaults = {};
    Object.entries(enumValues).forEach(([category, values]) => {
      if (values && values.length > 0) {
        defaults[category] = values[0];
      }
    });
    setSelectedOptions(defaults);
  }, []);

  const getOptionsForCategory = (category) => {
    return availableOptions[category] || [];
  };

  const handleOptionChange = (category, option) => {
    console.log("[APP] Changing", category, "to", option);
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Avatar Customizer</h1>

      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "24px",
        }}
      >
        <div style={{ flex: 1, minWidth: "320px" }}>
          <AvatarPreview
            canvasRef={canvasRef}
            selectedOptions={selectedOptions}
            onEnumValuesLoaded={handleEnumValuesLoaded}
          />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "260px",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Controls</h2>

          <CategoryNavigation
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <p>
            Selected: <strong>{selectedCategory}</strong>
          </p>

          {/* Show current selections for all categories */}
          {Object.keys(selectedOptions).length > 0 && (
            <div style={{ fontSize: "0.9rem", marginBottom: "12px" }}>
              {Object.entries(selectedOptions).map(([cat, val]) => (
                <div key={cat}>
                  {AVATAR_CATEGORIES[cat]?.label}: <strong>{val}</strong>
                </div>
              ))}
            </div>
          )}

          {availableOptions[selectedCategory] && availableOptions[selectedCategory].length > 0 ? (
            <OptionsSelector
              category={selectedCategory}
              title={categoryTitles[selectedCategory] || AVATAR_CATEGORIES[selectedCategory]?.label}
              options={getOptionsForCategory(selectedCategory)}
              selectedOption={selectedOptions[selectedCategory]}
              onOptionSelect={(opt) =>
                handleOptionChange(selectedCategory, opt)
              }
            />
          ) : (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>
              Loading options...
            </p>
          )}

          <ExportButton canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default App;