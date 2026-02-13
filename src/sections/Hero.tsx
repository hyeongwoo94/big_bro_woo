/**
 * Hero: 커서 트레일 + 찾기 컨셉
 * 마우스를 움직이면 궤적에 단어들이 드러나고, 이름(accent-warm)을 찾게 함
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import "./styles/Hero.css";

type HeroProps = {
  name?: string;
};

const TRAIL_MAX = 100;
const BRUSH_RADIUS = 0.05;

const DECOY_WORDS = [
  "퍼블리셔",
  "프론트엔드",
  "HTML",
  "CSS",
  "React",
  "TypeScript",
  "디자인",
  "코딩",
  "웹",
  "사이트",
  "마크업",
  "JavaScript",
  "퍼블",
  "개발",
  "포트폴리오",
  "프로젝트",
  "UI",
  "UX",
  "컴포넌트",
  "스타일",
  "레이아웃",
  "반응형",
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function Hero({ name = "박형우" }: HeroProps) {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const trailRafRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const contentSizeRef = useRef({ w: 1, h: 1 });

  const words = useMemo(() => {
    const decoys = DECOY_WORDS.filter((w) => w !== name);
    return shuffle([...decoys, name]);
  }, [name]);

  const nameCharSet = useMemo(() => new Set([name]), [name]);

  const updateTrailFromPoint = useCallback((clientX: number, clientY: number) => {
    const content = contentRef.current;
    if (!content) return;

    const contentRect = content.getBoundingClientRect();
    contentSizeRef.current = { w: contentRect.width, h: contentRect.height };
    const x = (clientX - contentRect.left) / contentRect.width;
    const y = (clientY - contentRect.top) / contentRect.height;

    if (x < 0 || x > 1 || y < 0 || y > 1) return;

    pendingRef.current = { x, y };

    if (trailRafRef.current) return;
    trailRafRef.current = requestAnimationFrame(() => {
      trailRafRef.current = 0;
      const p = pendingRef.current;
      if (!p) return;
      pendingRef.current = null;
      setTrail((prev) => {
        const next = [...prev, p];
        return next.length > TRAIL_MAX ? next.slice(-TRAIL_MAX) : next;
      });
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      updateTrailFromPoint(e.clientX, e.clientY);
    },
    [updateTrailFromPoint]
  );

  // Hero가 보이는 동안 전역 mousemove로만 커서 위치 갱신 (PC만, 모바일에서는 커서 비표시)
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onGlobalMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.display = "block";
      });
    };

    document.addEventListener("mousemove", onGlobalMove);
    return () => {
      document.removeEventListener("mousemove", onGlobalMove);
      cursor.style.display = "none";
    };
  }, []);

  return (
    <section
      className="hero-sec"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
    >
      <div className="_cont">
      <div
        style={{
          position: "absolute",
          top: "var(--spacing-lg)",
          right: "var(--spacing-lg)",
          zIndex: 10,
        }}
      >
        <TechNote {...getTechNoteContent("hero")} />
      </div>
      <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <mask id="hero-cursor-trail" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            {trail.map((p, i) => {
              const { w, h } = contentSizeRef.current;
              const aspect = w / (h || 1);
              return (
                <ellipse
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  rx={BRUSH_RADIUS}
                  ry={BRUSH_RADIUS * aspect}
                  fill="white"
                />
              );
            })}
          </mask>
        </defs>
      </svg>

      <div className="_hero-words">
        <div className="_hero-words-frame">
          <div
            ref={contentRef}
            className="_hero-words-mask"
          >
            {words.map((word, i) => {
              const isNameChar = nameCharSet.has(word);
              return (
                <span
                  key={i}
                  className="_text"
                  data-name-char={isNameChar ? "true" : undefined}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "2px solid var(--color-accent)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
          display: "none",
          zIndex: 10010,
        }}
      />
      </div>
    </section>
  );
}

export default Hero;
