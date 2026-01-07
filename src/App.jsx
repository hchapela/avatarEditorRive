// App.jsx
import React from "react";
import AvatarPreview from "./AvatarPreview";

function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Rive Avatar Test</h1>
      <p>If everything is correct, your avatar should appear below.</p>
      <AvatarPreview />
    </div>
  );
}

export default App;