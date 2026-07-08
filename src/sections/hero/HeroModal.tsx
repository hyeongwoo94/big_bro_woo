import { useEffect, useState, useRef } from "react";
import "./styles/HeroModal.css";

type HeroModalProps = {
  question: string;
  correctName: string;
  onConfirm: (name: string) => void;
};

function HeroModal({ question, correctName, onConfirm }: HeroModalProps) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 히어로 섹션 로딩 후 3초 뒤 표시
    const timer = setTimeout(() => {
      setVisible(true);
      // PC에서만 자동 포커스 (모바일에서는 확대 방지)
      const isMobile = window.innerWidth <= 768;
      if (!isMobile) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    if (trimmed !== correctName) {
      setError("이름이 일치하지 않아요. 다시 입력해주세요.");
      return;
    }

    setError("");
    setVisible(false);
    setTimeout(() => onConfirm(trimmed), 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
  };

  return (
    <div
      className="hero-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-modal-question"
      data-visible={visible || undefined}
    >
      <div className="hero-modal__panel" onClick={(e) => e.stopPropagation()}>
        <h2 id="hero-modal-question" className="hero-modal__question">
          {question}
        </h2>
        <div className="hero-modal__body">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="이름을 입력하세요"
            className={`hero-modal__input${error ? " hero-modal__input--error" : ""}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "hero-modal-error" : undefined}
          />
          {error && (
            <p id="hero-modal-error" className="hero-modal__error" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!name.trim()}
            className="hero-modal__btn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroModal;
