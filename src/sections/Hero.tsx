/**
 * Hero: 커서 트레일 + 찾기 컨셉
 * 마우스를 움직이면 궤적에 단어들이 드러나고, 이름(accent-warm)을 찾게 함
 */
import { useCallback, useMemo, useRef, useState } from "react";

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

function Hero({ name = "김개발" }: HeroProps) {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const trailRafRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const words = useMemo(() => {
    const decoys = DECOY_WORDS.filter((w) => w !== name);
    return shuffle([...decoys, name]);
  }, [name]);

  const nameCharSet = useMemo(() => new Set([name]), [name]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      const content = contentRef.current;
      const cursor = cursorRef.current;
      if (!el || !content) return;

      // 컨텐츠 영역을 기준으로 좌표 계산
      const contentRect = content.getBoundingClientRect();
      const x = (e.clientX - contentRect.left) / contentRect.width;
      const y = (e.clientY - contentRect.top) / contentRect.height;

      if (cursor) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          // 브러시와 동일한 좌표 기준 사용
          cursor.style.left = `${contentRect.left + x * contentRect.width}px`;
          cursor.style.top = `${contentRect.top + y * contentRect.height}px`;
          cursor.style.display = "block";
        });
      }

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
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={() => {
        cursorRef.current?.style.setProperty("display", "none");
      }}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        cursor: "none",
      }}
    >
      <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <mask id="hero-cursor-trail" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            {trail.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={BRUSH_RADIUS} fill="white" />
            ))}
          </mask>
        </defs>
      </svg>

      <div
        ref={contentRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: "clamp(0.5rem, 2vw, 1.5rem)",
          padding: "2rem",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          WebkitMaskImage: "url(#hero-cursor-trail)",
          maskImage: "url(#hero-cursor-trail)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {words.map((word, i) => {
          const isNameChar = nameCharSet.has(word);
          return (
            <span
              key={i}
              style={{
                fontSize: "clamp(1rem, 3.5vw, 1.75rem)",
                fontWeight: isNameChar ? 700 : 500,
                color: isNameChar ? "var(--color-accent-warm)" : "var(--color-text-muted)",
                opacity: isNameChar ? 1 : 0.85,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "2px solid var(--color-accent-warm)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
          display: "none",
          zIndex: 9999,
        }}
      />
    </section>
  );
}

export default Hero;
