/**
 * 사이드 퀵메뉴
 * PC: 오른쪽 하단 동그란 "클릭" 버튼 → 클릭 시 위로 메뉴 4개 펼침
 * 모바일: 하단 플로팅으로 4개 항목 항상 표시
 * 4개: 다크모드 + 예시 링크 3개(추후 링크 교체)
 */
import { useEffect, useState } from "react";

const THEME_KEY = "theme";
type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return "light";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

const PLACEHOLDER_LINKS = [
  { label: "예시1", href: "#" },
  { label: "예시2", href: "#" },
  { label: "예시3", href: "#" },
];

export function QuickMenu() {
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const handleThemeToggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <div className="quick-menu" data-open={open || undefined}>
      {/* PC: 펼쳐진 메뉴 4개 (위에서부터: 다크모드, 예시1, 예시2, 예시3) */}
      <div className="quick-menu__items" role="menu">
        <button
          type="button"
          className="quick-menu__item"
          role="menuitem"
          onClick={handleThemeToggle}
          aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
        >
          <span className="quick-menu__icon" aria-hidden>
            {theme === "light" ? "🌙" : "☀️"}
          </span>
          <span className="quick-menu__label">다크모드</span>
        </button>
        {PLACEHOLDER_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="quick-menu__item"
            role="menuitem"
            onClick={(e) => e.preventDefault()}
          >
            <span className="quick-menu__label">{link.label}</span>
          </a>
        ))}
      </div>
      {/* PC: 오른쪽 하단 동그란 "클릭" 버튼 (모바일에서는 숨김) */}
      <button
        type="button"
        className="quick-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "퀵메뉴 닫기" : "퀵메뉴 열기"}
        aria-haspopup="menu"
      >
        <span className="quick-menu__trigger-text">클릭</span>
      </button>
    </div>
  );
}
