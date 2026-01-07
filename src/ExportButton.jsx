// ExportButton.jsx
// Export at high resolution by creating a temporary high-res canvas

import React from "react";

function ExportButton({ canvasRef }) {
  const handleExport = () => {
    const canvas = canvasRef?.current;

    if (!canvas) {
      alert("Avatar is not ready yet. Please wait a moment and try again.");
      return;
    }

    try {
      // Get the original canvas size
      const originalWidth = canvas.width;
      const originalHeight = canvas.height;

      // Define export scale (2x, 3x, or 4x for higher quality)
      const scale = 3; // Try 2, 3, or 4 depending on desired quality

      // Create a high-resolution temporary canvas
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = originalWidth * scale;
      exportCanvas.height = originalHeight * scale;

      const ctx = exportCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Disable image smoothing for crisp pixel-perfect scaling
      ctx.imageSmoothingEnabled = false;

      // Scale up and draw the original canvas
      ctx.scale(scale, scale);
      ctx.drawImage(canvas, 0, 0);

      // Convert to PNG
      const dataURL = exportCanvas.toDataURL("image/png");

      // Trigger download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `avatar-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Exported at ${exportCanvas.width}×${exportCanvas.height}px (${scale}x scale)`);
    } catch (err) {
      console.error("Error exporting avatar:", err);
      alert("Could not export the avatar. Check the console for details.");
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <button
        onClick={handleExport}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#ff9800",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Save Avatar as PNG
      </button>
    </div>
  );
}

export default ExportButton;