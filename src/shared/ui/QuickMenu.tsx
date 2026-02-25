/**
 * 사이드 퀵메뉴
 * PC: 오른쪽 하단 동그란 햄버거 아이콘 버튼 → 클릭 시 위로 메뉴 4개 펼침
 * 모바일: 하단 플로팅으로 4개 항목 항상 표시
 * 5개: 다크모드 + 토이·블로그·깃·디자인시스템
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

const QUICK_LINKS = [
  { label: "토이", href: "https://toy-dashboard-blond.vercel.app/" },
  { label: "블로그", href: "https://ineedurhelp.tistory.com/" },
  { label: "깃", href: "https://github.com/hyeongwoo94" },
  { label: "디자인시스템", href: "/storybook/" },
];

export function QuickMenu() {
  const [open, setOpen] = useState(true);
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
      {/* PC: 펼쳐진 메뉴 5개 (위에서부터: 다크모드, 토이, 블로그, 깃, 디자인시스템) */}
      <div className="quick-menu__items" role="menu">
        <button
          type="button"
          className="quick-menu__item quick-menu__item--icon-only"
          role="menuitem"
          onClick={handleThemeToggle}
          aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
        >
          <span className="quick-menu__label">{theme === "light" ? "🌙" : "☀️"}</span>
        </button>
        {QUICK_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="quick-menu__item"
            role="menuitem"
            target="_blank"
            onClick={link.href === "#" ? (e) => e.preventDefault() : undefined}
          >
            <span className="quick-menu__label">{link.label}</span>
          </a>
        ))}
      </div>
      {/* PC: 오른쪽 하단 동그란 햄버거 아이콘 버튼 (모바일에서는 숨김) */}
      <button
        type="button"
        className="quick-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "퀵메뉴 닫기" : "퀵메뉴 열기"}
        aria-haspopup="menu"
      >
        <span className="quick-menu__trigger-text">☰</span>
      </button>
    </div>
  );
}
