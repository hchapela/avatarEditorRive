// AvatarPreview.js
// Minimal version: just load and render the Rive file.
// We'll add customization later.

import React from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

// Adjust the path to your actual file name if needed
import avatarRive from "./assets/avatar.riv";

function AvatarPreview() {
  // Set up Rive with the given .riv file.
  // For now we don't care about state machines, we just want to SEE something.
  const { RiveComponent, rive } = useRive({
    src: avatarRive,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // For debugging: log when rive is ready
  if (rive) {
    console.log("Rive instance is ready");
  }

  return (
    <div
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
      {/* Renders the actual canvas with your animation */}
      <RiveComponent
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default AvatarPreview;