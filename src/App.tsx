import DesignTokenPreview from "./shared/ui/DesignTokenPreview";

function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", minHeight: "100vh" }}>
      <div style={{ flex: "1 1 50%", minWidth: 320 }}>
        <DesignTokenPreview theme="light" />
      </div>
      <div style={{ flex: "1 1 50%", minWidth: 320 }}>
        <DesignTokenPreview theme="dark" />
      </div>
    </div>
  );
}

export default App;
