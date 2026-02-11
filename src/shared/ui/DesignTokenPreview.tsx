import type { ReactNode } from "react";

type Theme = "light" | "dark";

type DesignTokenPreviewProps = {
  theme?: Theme;
};

function DesignTokenPreview({ theme = "light" }: DesignTokenPreviewProps) {
  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
        padding: "var(--spacing-xl)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "var(--spacing-lg)",
          fontSize: "var(--font-size-xl)",
          color: "var(--color-text)",
        }}
      >
        디자인 토큰 미리보기 — {theme === "light" ? "라이트" : "다크"} 모드
      </h1>

      {/* 배경 도형 */}
      <PreviewSection title="배경 도형">
        <div
          style={{
            width: 200,
            height: 120,
            backgroundColor: "var(--color-bg-surface)",
            border: `2px solid var(--color-primary)`,
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
            surface
          </span>
        </div>
        <div
          style={{
            width: 160,
            height: 100,
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-accent-warm) 100%)",
            borderRadius: "var(--radius-md)",
            marginTop: "var(--spacing-md)",
          }}
        />
      </PreviewSection>

      {/* 텍스트 */}
      <PreviewSection title="텍스트">
        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text)", marginBottom: "var(--spacing-sm)" }}>
          본문 텍스트 (color-text)
        </p>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
          보조 텍스트 (color-text-muted)
        </p>
      </PreviewSection>

      {/* 버튼 */}
      <PreviewSection title="버튼">
        <button
          type="button"
          style={{
            padding: "var(--spacing-sm) var(--spacing-lg)",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-base)",
            cursor: "pointer",
            transition: "var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary)";
          }}
        >
          Primary 버튼
        </button>
        <button
          type="button"
          style={{
            marginLeft: "var(--spacing-md)",
            padding: "var(--spacing-sm) var(--spacing-lg)",
            backgroundColor: "transparent",
            color: "var(--color-accent)",
            border: `2px solid var(--color-accent)`,
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-base)",
            cursor: "pointer",
            transition: "var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-accent)";
          }}
        >
          Accent 버튼
        </button>
        <button
          type="button"
          style={{
            marginLeft: "var(--spacing-md)",
            padding: "var(--spacing-sm) var(--spacing-lg)",
            backgroundColor: "var(--color-accent-warm)",
            color: "var(--color-on-accent-warm)",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-base)",
            cursor: "pointer",
            transition: "var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent-warm-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent-warm)";
          }}
        >
          스토리 강조 (warm)
        </button>
      </PreviewSection>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--spacing-2xl)" }}>
      <h2
        style={{
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text)",
          marginBottom: "var(--spacing-md)",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default DesignTokenPreview;
export type { DesignTokenPreviewProps };
