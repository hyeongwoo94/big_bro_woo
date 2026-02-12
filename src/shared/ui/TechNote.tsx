import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type TechNoteTemplateId = "a" | "b" | "c";

type TechNoteContextValue = {
  open: (title: string, content: ReactNode, template?: TechNoteTemplateId) => void;
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
  const [template, setTemplate] = useState<TechNoteTemplateId>("a");
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const open = useCallback((t: string, c: ReactNode, tmpl: TechNoteTemplateId = "a") => {
    setTitle(t);
    setContent(c);
    setTemplate(tmpl);
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
          template={template}
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
  template: TechNoteTemplateId;
  isAnimatingOut: boolean;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  previousActiveElementRef: React.MutableRefObject<HTMLElement | null>;
};

function TechNoteModal({
  title,
  content,
  template,
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
      data-animating-out={isAnimatingOut ? "true" : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tech-note-modal"
        role="document"
        data-animating-out={isAnimatingOut ? "true" : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="tech-note-title" className="tech-note-title">
          {title}
        </h2>
        <div className="tech-note-body">
          <div className={`tech-note-tpl-${template}`}>{content}</div>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="닫기"
          className="tech-note-close"
          onClick={onClose}
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
  template?: TechNoteTemplateId;
};

/**
 * 섹션별 "기술 설명" 버튼. 769px 이상에서만 표시.
 * 클릭 시 기술 설명 모달을 해당 title/content로 연다 (동시에 하나만 열림).
 * template으로 tpl-a / tpl-b / tpl-c 스타일 적용 (기본 "a").
 */
export function TechNote({ title, content, template = "a" }: TechNoteProps) {
  const { open } = useTechNote();

  return (
    <div className="tech-note-pc-only tech-note-trigger">
      <button
        type="button"
        aria-label="이 섹션 구현 설명 보기"
        className="tech-note-btn"
        onClick={() => open(title, content, template)}
      >
        기술 설명
      </button>
    </div>
  );
}
