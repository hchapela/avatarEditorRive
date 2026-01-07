// AvatarPreview.jsx
// Now automatically loads ALL categories from config

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
import { AVATAR_CATEGORIES } from "./avatarConfig";

function AvatarPreview({ canvasRef, selectedOptions, onEnumValuesLoaded }) {
  const containerRef = useRef(null);
  const [enumsLoaded, setEnumsLoaded] = useState(false);

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

  // Load ALL enums and titles from config automatically
  useEffect(() => {
    if (!viewModelInstance || !viewModelInstance._runtimeInstance) return;
    if (enumsLoaded) return;
    if (!onEnumValuesLoaded) return;

    const runtimeInst = viewModelInstance._runtimeInstance;

    try {
      const enumValues = {};
      const categoryTitles = {};

      // Loop through ALL categories in config
      Object.values(AVATAR_CATEGORIES).forEach((category) => {
        // Load enum values
        if (category.enumProperty) {
          try {
            const enumProp = runtimeInst.enum(category.enumProperty);
            if (enumProp && enumProp.values) {
              enumValues[category.id] = enumProp.values;
              console.log(`[ENUM] ${category.id}:`, enumProp.values);
            }
          } catch (e) {
            console.warn(`[ENUM] Could not load ${category.enumProperty}:`, e);
          }
        }

        // Load title string
        if (category.titleProperty) {
          try {
            const titleProp = runtimeInst.string(category.titleProperty);
            if (titleProp && titleProp.value) {
              categoryTitles[category.id] = titleProp.value;
              console.log(`[TITLE] ${category.id}:`, titleProp.value);
            }
          } catch (e) {
            console.warn(`[TITLE] Could not load ${category.titleProperty}:`, e);
          }
        }
      });

      onEnumValuesLoaded(enumValues, categoryTitles);
      setEnumsLoaded(true);
    } catch (e) {
      console.error("[ENUM] Error loading values:", e);
    }
  }, [viewModelInstance, onEnumValuesLoaded, enumsLoaded]);

  // Sync ALL categories automatically
  useEffect(() => {
    if (!viewModelInstance || !viewModelInstance._runtimeInstance) return;
    if (!selectedOptions) return;

    const runtimeInst = viewModelInstance._runtimeInstance;

    // Loop through ALL categories and sync their selected values
    Object.values(AVATAR_CATEGORIES).forEach((category) => {
      const selectedValue = selectedOptions[category.id];
      if (!selectedValue || !category.enumProperty) return;

      try {
        const property = runtimeInst.enum(category.enumProperty);
        if (property && property.value !== selectedValue) {
          console.log(`[SYNC] ${category.id}: ${selectedValue}`);
          property.value = selectedValue;
        }
      } catch (e) {
        console.error(`[SYNC] Error setting ${category.enumProperty}:`, e);
      }
    });
  }, [selectedOptions, viewModelInstance]);

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