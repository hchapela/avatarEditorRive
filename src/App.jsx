// App.jsx
import React, { useState, useRef, useCallback } from "react";
import AvatarPreview from "./AvatarPreview";
import CategoryNavigation from "./CategoryNavigation";
import OptionsSelector from "./OptionsSelector";
import ExportButton from "./ExportButton";
import { AVATAR_CATEGORIES } from "./avatarConfig";
import "./index.css"; // Make sure this line exists

function App() {
  const firstCategory = Object.keys(AVATAR_CATEGORIES)[0];

  const [selectedCategory, setSelectedCategory] = useState(firstCategory);
  const [availableOptions, setAvailableOptions] = useState({});
  const [categoryTitles, setCategoryTitles] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const canvasRef = useRef(null);

  const getRandomValue = (array) => {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  };

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
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        height: "100vh",
        width: "100vw", // ADD THIS
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDFCFE",
        overflow: "hidden",
        margin: 0, // ADD THIS
        padding: 0, // ADD THIS
      }}
    >
      <h2 style={{ margin: "24px 24px", flexShrink: 0 }}>Avatar Customizer</h2>

      {/* 3-column layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          minHeight: 0,
          width: "100%", // ADD THIS
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {/* Column 1: Category Controls (left) */}
        <div
          style={{
            display: "flex",
            width: "240px",
            flexDirection: "column",
            padding: "24px",
            backgroundColor: "#FDFCFE",
            borderRight: "1px solid #e0e0e0",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.2rem" }}>Categories</h3>
          <CategoryNavigation
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Column 2: Options Selector (middle) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            width: "400px",
            flexShrink: 0,
            backgroundColor: "#FDFCFE",
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
          }}
        >
          {availableOptions[selectedCategory] && availableOptions[selectedCategory].length > 0 ? (
            <OptionsSelector
              options={getOptionsForCategory(selectedCategory)}
              selectedOption={selectedOptions[selectedCategory]}
              onOptionSelect={(opt) => handleOptionChange(selectedCategory, opt)}
            />
          ) : (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>Loading options...</p>
          )}
        </div>

        {/* Column 3: Preview + Actions */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            backgroundColor: "#F5F2F8", // Changed from #fafafa - try a blue to see it clearly
            gap: "20px",
            overflow: "auto",
          }}
        >
          <AvatarPreview
            canvasRef={canvasRef}
            selectedOptions={selectedOptions}
            onEnumValuesLoaded={handleEnumValuesLoaded}
          />

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <ExportButton canvasRef={canvasRef} />
              <button
                onClick={randomizeAll}
                disabled={Object.keys(availableOptions).length === 0}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#E1DDE4",
                  color: "#6F6D71",
                  fontSize: "1rem",
                  cursor: Object.keys(availableOptions).length === 0 ? "not-allowed" : "pointer",
                  opacity: Object.keys(availableOptions).length === 0 ? 0.5 : 1,
                  fontWeight: "500",
                }}
              >
                🎲 Randomize Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
