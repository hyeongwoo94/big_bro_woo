import { useEffect, useState, useRef } from "react";

type HeroModalProps = {
  question: string;
  defaultName: string;
  onConfirm: (name: string) => void;
};

function HeroModal({ question, defaultName, onConfirm }: HeroModalProps) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(defaultName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 히어로 섹션 로딩 후 3초 뒤 표시
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (name.trim()) {
      setVisible(false);
      setTimeout(() => onConfirm(name.trim()), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-modal-question"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        padding: "var(--spacing-xl)",
        paddingBottom: "max(var(--spacing-xl), env(safe-area-inset-bottom))",
        zIndex: 10001,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 400,
          backgroundColor: "var(--color-bg)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-xl)",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.15)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="hero-modal-question"
          style={{
            margin: "0 0 var(--spacing-lg) 0",
            fontSize: "var(--font-size-lg)",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {question}
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-md)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="이름을 입력하세요"
            style={{
              padding: "var(--spacing-sm) var(--spacing-md)",
              fontSize: "var(--font-size-base)",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-accent-warm)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border)";
            }}
          />
          <button
            onClick={handleConfirm}
            disabled={!name.trim()}
            style={{
              padding: "var(--spacing-sm) var(--spacing-lg)",
              fontSize: "var(--font-size-base)",
              fontWeight: 600,
              backgroundColor: "var(--color-accent-warm)",
              color: "var(--color-on-accent-warm)",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: name.trim() ? "pointer" : "not-allowed",
              opacity: name.trim() ? 1 : 0.5,
              transition: "opacity 0.2s, transform 0.1s",
            }}
            onMouseDown={(e) => {
              if (name.trim()) e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroModal;
