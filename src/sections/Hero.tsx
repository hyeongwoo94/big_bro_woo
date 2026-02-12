/**
 * Hero: 커서 트레일 + 찾기 컨셉
 * 마우스를 움직이면 궤적에 단어들이 드러나고, 이름(accent-warm)을 찾게 함
 */
import { useCallback, useMemo, useRef, useState } from "react";
import { TechNote } from "../shared/ui/TechNote";

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
      <div
        style={{
          position: "absolute",
          top: "var(--spacing-lg)",
          right: "var(--spacing-lg)",
          zIndex: 10,
        }}
      >
        <TechNote
          title="Hero 섹션 — 구현 설명"
          content={
            <>
              <p style={{ marginBottom: "var(--spacing-md)" }}>
                이 포트폴리오는 바이브코딩(AI와 협업)으로 제작 중이며, 구현에서 그치지 않고
                학습한 내용까지 기록해 두려고 합니다. 이 섹션에서 쓴 기술과 이유를 정리했습니다.
              </p>
              <h3 style={{ fontSize: "var(--font-size-base)", fontWeight: 600, margin: "var(--spacing-lg) 0 var(--spacing-sm) 0" }}>
                활용한 점 → 만든 것
              </h3>
              <ul style={{ margin: "0 0 var(--spacing-lg) 0", paddingLeft: "var(--spacing-lg)" }}>
                <li>
                  <strong>SVG mask + objectBoundingBox 좌표계</strong>를 활용해, 마우스 궤적에
                  원형 브러시가 쌓이고 그 영역의 단어만 드러나는 찾기 효과를 만들었습니다.
                </li>
                <li>
                  <strong>컨텐츠 영역(ref) 기준 좌표</strong>를 쓰면 maxWidth 등 레이아웃과
                  브러시 위치가 일치한다는 걸 배워, section 전체가 아니라 contentRef 기준으로
                  정규화하도록 바꿨습니다.
                </li>
                <li>
                  <strong>requestAnimationFrame</strong>으로 커서·트레일을 갱신해 리렌더 없이
                  부드럽게 움직이도록 했습니다.
                </li>
              </ul>

              <p style={{ marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
                <strong>objectBoundingBox</strong>: SVG에서 좌표를 요소의 “경계 상자” 대비 0~1 비율로 쓰는 단위. 픽셀이 아니라 비율이라서, 영역 크기가 바뀌어도 같은 mask가 비율대로 적용됩니다.
                <br />
                <strong>requestAnimationFrame</strong>: 브라우저가 “다음 프레임을 그리기 직전”에 콜백을 실행해 달라고 예약하는 API. 여기서 커서·트레일 위치를 갱신해서, 화면 주사율에 맞춰 끊김 없이 움직이도록 했습니다.
              </p>

              <h3 style={{ fontSize: "var(--font-size-base)", fontWeight: 600, margin: "var(--spacing-lg) 0 var(--spacing-sm) 0" }}>
                이 설명 UI를 재사용하려면
              </h3>
              <p style={{ marginBottom: "var(--spacing-sm)" }}>
                이 기술 설명 버튼과 모달은 <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>TechNote</code>로
                구현되어 있습니다.
              </p>
              <p style={{ marginBottom: "var(--spacing-sm)" }}>
                <strong>왜 Provider로 감싸야 하나요?</strong> 모달은 화면에 하나만 있어야 하고, 어떤 버튼을 눌렀는지에 따라 제목·내용만 바뀌어야 합니다. <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>TechNoteProvider</code>가 그 “열린 모달 하나”의 상태와 내용을 한 곳에서 관리하고, 모달 UI도 여기서 한 번만 렌더링합니다. 그래서 Provider 밖에 있는 <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>TechNote</code> 버튼들이 context로 “지금 이 제목/내용으로 열어줘”라고만 알려 주면 됩니다. 따라서 TechNote를 쓰는 영역(예: App 전체)을 반드시 <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>TechNoteProvider</code>로 감싸야 합니다.
              </p>
              <p style={{ marginBottom: "var(--spacing-sm)" }}>
                사용 방법:
              </p>
              <ul style={{ margin: 0, paddingLeft: "var(--spacing-lg)" }}>
                <li>App(또는 TechNote를 쓰는 상위)을 <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>TechNoteProvider</code>로 감싼 뒤,</li>
                <li>섹션 안에 <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>&lt;TechNote title=&quot;...&quot; content=&#123;...&#125; /&gt;</code>를 넣으면 됩니다.</li>
                <li>파일: <code style={{ fontSize: "var(--font-size-sm)", padding: "0 0.2em", background: "var(--color-border)", borderRadius: "var(--radius-sm)" }}>src/shared/ui/TechNote.tsx</code>. 768px 이하에서는 버튼과 모달이 비표시됩니다.</li>
              </ul>
            </>
          }
        />
      </div>
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
