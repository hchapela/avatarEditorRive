// App.jsx
import React, { useState, useRef, useCallback } from "react";
import AvatarPreview from "./AvatarPreview";
import CategoryNavigation from "./CategoryNavigation";
import OptionsSelector from "./OptionsSelector";
import ExportButton from "./ExportButton";
import { AVATAR_CATEGORIES } from "./avatarConfig";

function App() {
  const firstCategory = Object.keys(AVATAR_CATEGORIES)[0];
  
  const [selectedCategory, setSelectedCategory] = useState(firstCategory);
  const [availableOptions, setAvailableOptions] = useState({});
  const [categoryTitles, setCategoryTitles] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const canvasRef = useRef(null);

  // Helper to pick random value from array
  const getRandomValue = (array) => {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  };

  // Randomize all categories
  const randomizeAll = useCallback(() => {
    const randomSelections = {};
    Object.entries(availableOptions).forEach(([category, values]) => {
      if (values && values.length > 0) {
        randomSelections[category] = getRandomValue(values);
      }
    });
    console.log("[APP] Randomized:", randomSelections);
    setSelectedOptions(randomSelections);
  }, [availableOptions]);

  const handleEnumValuesLoaded = useCallback((enumValues, titles) => {
    console.log("[APP] Loaded enum values:", enumValues);
    console.log("[APP] Loaded titles:", titles);
    
    setAvailableOptions(enumValues);
    setCategoryTitles(titles || {});

    // Set RANDOM selection for each category on initial load
    const randomDefaults = {};
    Object.entries(enumValues).forEach(([category, values]) => {
      if (values && values.length > 0) {
        randomDefaults[category] = getRandomValue(values);
      }
    });
    console.log("[APP] Initial random selection:", randomDefaults);
    setSelectedOptions(randomDefaults);
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

          {/* Randomize button */}
          <div style={{ marginTop: "16px" }}>
            <button
              onClick={randomizeAll}
              disabled={Object.keys(availableOptions).length === 0}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#9c27b0",
                color: "#fff",
                fontSize: "1rem",
                cursor: Object.keys(availableOptions).length === 0 ? "not-allowed" : "pointer",
                opacity: Object.keys(availableOptions).length === 0 ? 0.5 : 1,
              }}
            >
              🎲 Randomize Avatar
            </button>
          </div>

          <ExportButton canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default App;