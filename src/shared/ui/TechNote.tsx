import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type TechNoteContextValue = {
  open: (title: string, content: ReactNode) => void;
  close: () => void;
};

const TechNoteContext = createContext<TechNoteContextValue | null>(null);

function useTechNote() {
  const ctx = useContext(TechNoteContext);
  if (!ctx) throw new Error("TechNote must be used within TechNoteProvider");
  return ctx;
}

type TechNoteProviderProps = { children: ReactNode };

export function TechNoteProvider({ children }: TechNoteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const open = useCallback((t: string, c: ReactNode) => {
    setTitle(t);
    setContent(c);
    setIsAnimatingOut(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsAnimatingOut(true);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setTitle("");
      setContent(null);
      closeTimeoutRef.current = null;
      previousActiveElementRef.current?.focus();
    }, 220);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") close();
    },
    [close]
  );

  return (
    <TechNoteContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <TechNoteModal
          title={title}
          content={content}
          isAnimatingOut={isAnimatingOut}
          onClose={close}
          onKeyDown={handleKeyDown}
          previousActiveElementRef={previousActiveElementRef}
        />
      )}
    </TechNoteContext.Provider>
  );
}

type TechNoteModalProps = {
  title: string;
  content: ReactNode;
  isAnimatingOut: boolean;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  previousActiveElementRef: React.MutableRefObject<HTMLElement | null>;
};

function TechNoteModal({
  title,
  content,
  isAnimatingOut,
  onClose,
  onKeyDown,
  previousActiveElementRef,
}: TechNoteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => {
      previousActiveElementRef.current = null;
    };
  }, [previousActiveElementRef]);

  return (
    <div
      className="tech-note-pc-only tech-note-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-note-title"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-xl)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10002,
        opacity: isAnimatingOut ? 0 : 1,
        transition: "opacity 0.22s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="document"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1020,
          maxHeight: "90vh",
          overflow: "auto",
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-xl)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          opacity: isAnimatingOut ? 0 : 1,
          transition: "opacity 0.22s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="tech-note-title"
          style={{
            margin: "0 0 var(--spacing-lg) 0",
            paddingRight: "var(--spacing-2xl)",
            fontSize: "var(--font-size-lg)",
            fontWeight: 600,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontSize: "var(--font-size-base)",
            lineHeight: 1.6,
            color: "var(--color-text)",
          }}
        >
          {content}
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="닫기"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "var(--spacing-xl)",
            right: "var(--spacing-xl)",
            width: 32,
            height: 32,
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-md)",
            backgroundColor: "transparent",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            fontSize: "1.25rem",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

type TechNoteProps = {
  title: string;
  content: ReactNode;
};

/**
 * 섹션별 "기술 설명" 버튼. 769px 이상에서만 표시.
 * 클릭 시 기술 설명 모달을 해당 title/content로 연다 (동시에 하나만 열림).
 */
export function TechNote({ title, content }: TechNoteProps) {
  const { open } = useTechNote();

  return (
    <div className="tech-note-pc-only tech-note-trigger">
      <button
        type="button"
        aria-label="이 섹션 구현 설명 보기"
        onClick={() => open(title, content)}
        style={{
          padding: "var(--spacing-sm) var(--spacing-md)",
          fontSize: "var(--font-size-sm)",
          fontWeight: 500,
          color: "var(--color-text-muted)",
          backgroundColor: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent-warm)";
          e.currentTarget.style.color = "var(--color-accent-warm)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.color = "var(--color-text-muted)";
        }}
      >
        기술 설명
      </button>
    </div>
  );
}
