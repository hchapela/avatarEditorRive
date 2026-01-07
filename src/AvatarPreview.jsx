// AvatarPreview.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useViewModel,
  useViewModelInstance,
} from "@rive-app/react-webgl2";
import avatarRive from "./assets/avatar.riv";

function AvatarPreview({ canvasRef, selectedOptions, onEnumValuesLoaded }) {
  const containerRef = useRef(null);
  const [enumsLoaded, setEnumsLoaded] = useState(false); // Track if already loaded

  const { rive, RiveComponent } = useRive({
    src: avatarRive,
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const viewModel = useViewModel(rive, { name: "AvatarCustomizer" });
  const viewModelInstance = useViewModelInstance(viewModel, { rive });

  // Extract enum values ONCE when instance is ready
  useEffect(() => {
    if (!viewModelInstance || !viewModelInstance._runtimeInstance) return;
    if (enumsLoaded) return; // Already loaded, skip
    if (!onEnumValuesLoaded) return;

    const runtimeInst = viewModelInstance._runtimeInstance;

    try {
      const enumProperties = {
        lips: "Lips Color",
        // Add more:
        // hair: "Hair Style",
      };

      const enumValues = {};

      Object.entries(enumProperties).forEach(([category, enumName]) => {
        try {
          const enumProp = runtimeInst.enum(enumName);
          if (enumProp && enumProp.values) {
            enumValues[category] = enumProp.values;
            console.log(`[ENUM] Loaded ${category}:`, enumProp.values);
          }
        } catch (e) {
          console.warn(`[ENUM] Could not load ${enumName}:`, e);
        }
      });

      onEnumValuesLoaded(enumValues);
      setEnumsLoaded(true); // Mark as loaded
    } catch (e) {
      console.error("[ENUM] Error loading enum values:", e);
    }
  }, [viewModelInstance, onEnumValuesLoaded, enumsLoaded]);

  // Sync selected options to ViewModel
  useEffect(() => {
    if (!viewModelInstance || !viewModelInstance._runtimeInstance) return;
    if (!selectedOptions) return;

    const runtimeInst = viewModelInstance._runtimeInstance;

    const propertyMappings = {
      lips: { type: "enum", propertyName: "Lips Color" },
    };

    Object.entries(propertyMappings).forEach(([category, config]) => {
      const selectedValue = selectedOptions[category];
      if (!selectedValue) return;

      try {
        if (config.type === "enum") {
          const property = runtimeInst.enum(config.propertyName);
          if (property && property.value !== selectedValue) {
            console.log(`[SYNC] ${category}: ${selectedValue}`);
            property.value = selectedValue;
          }
        }
      } catch (e) {
        console.error(`[SYNC] Error setting ${config.propertyName}:`, e);
      }
    });
  }, [selectedOptions, viewModelInstance]);

  // Canvas capture
  useEffect(() => {
    if (!containerRef.current) return;
    const canvas = containerRef.current.querySelector("canvas");
    if (canvas && canvasRef) {
      canvasRef.current = canvas;
    }
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: "400px",
        height: "400px",
        maxWidth: "100%",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default AvatarPreview;