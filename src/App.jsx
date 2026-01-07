// App.jsx
import React, { useState, useRef, useCallback } from "react";
import AvatarPreview from "./AvatarPreview";
import CategoryNavigation from "./CategoryNavigation";
import OptionsSelector from "./OptionsSelector";
import ExportButton from "./ExportButton";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("lips");
  const [availableOptions, setAvailableOptions] = useState({
    lips: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    lips: null,
  });

  const canvasRef = useRef(null);

  // Wrap in useCallback to prevent infinite loop
  const handleEnumValuesLoaded = useCallback((enumValues) => {
    console.log("[APP] Enum values loaded from Rive:", enumValues);
    
    setAvailableOptions(enumValues);

    // Set default selections (first value of each enum)
    const defaults = {};
    Object.entries(enumValues).forEach(([category, values]) => {
      if (values && values.length > 0) {
        defaults[category] = values[0];
      }
    });
    setSelectedOptions(defaults);
  }, []); // Empty deps = only created once

  const getOptionsForCategory = (category) => {
    return availableOptions[category] || [];
  };

  const handleOptionChange = (category, option) => {
    console.log("[APP] Changing option", category, "->", option);
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
            Selected category: <strong>{selectedCategory}</strong>
          </p>

          {selectedOptions.lips && (
            <p>
              Current selection:
              <br />
              Lips: <strong>{selectedOptions.lips}</strong>
            </p>
          )}

          {availableOptions[selectedCategory] && availableOptions[selectedCategory].length > 0 ? (
            <OptionsSelector
              category={selectedCategory}
              options={getOptionsForCategory(selectedCategory)}
              selectedOption={selectedOptions[selectedCategory]}
              onOptionSelect={(opt) =>
                handleOptionChange(selectedCategory, opt)
              }
            />
          ) : (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>
              Loading options from Rive...
            </p>
          )}

          <ExportButton canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default App;