/**
 * 다크 모드 토글 버튼.
 * html[data-theme]과 localStorage('theme')로 라이트/다크 전환.
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

export function DarkModeToggle() {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      type="button"
      className="dark-mode-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
      title={theme === "light" ? "다크 모드" : "라이트 모드"}
    >
      <span className="dark-mode-toggle__icon" aria-hidden>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
