import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREER_DATA, CAREER_YEAR_RANGE, CAREER_LEVEL_RANGE, SKILL_LABELS } from "../shared/content/careerData";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 그래프 설정
  const padding = { top: 40, right: 40, bottom: 60, left: 120 };
  const graphWidth = 480;
  const graphHeight = 300;
  const innerWidth = graphWidth - padding.left - padding.right;
  const innerHeight = graphHeight - padding.top - padding.bottom;

  // 좌표 계산 함수
  const getX = (year: number) => {
    const range = CAREER_YEAR_RANGE.end - CAREER_YEAR_RANGE.start;
    return padding.left + ((year - CAREER_YEAR_RANGE.start) / range) * innerWidth;
  };

  const getY = (level: number) => {
    return graphHeight - padding.bottom - (level / CAREER_LEVEL_RANGE.max) * innerHeight;
  };

  // SVG path 생성
  const pathD = CAREER_DATA.map((item, i) => {
    const x = getX(item.year);
    const y = getY(item.level);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(" ");

  // 그리드 Y 좌표들
  const gridLevels = Array.from({ length: CAREER_LEVEL_RANGE.max + 1 }, (_, i) => i);

  // 모바일 감지
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // GSAP ScrollTrigger 설정
  useEffect(() => {
    if (!sectionRef.current) return;

    const path = pathRef.current;
    let pathLength = 0;

    // PC: 선 애니메이션 초기화
    if (path) {
      pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    }

    // 스크롤에 따라 선 그리기 + activeIndex 변경
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * CAREER_DATA.length),
            CAREER_DATA.length - 1
          );
          setActiveIndex(newIndex);

          // PC: 스크롤 진행도에 따라 선 그리기
          if (path && pathLength > 0) {
            const drawLength = pathLength * (1 - progress);
            path.style.strokeDashoffset = String(drawLength);
          }
        },
      },
    });

    // PC: 선 애니메이션 (초기 설정용, 실제 업데이트는 onUpdate에서)
    if (path) {
      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="career-sec">
      <div className="career-sec_cont">
        {/* 왼쪽: 그래프 (PC만) */}
        {!isMobile && (
          <div className="career-sec_graph">
            <svg
              ref={graphRef}
              viewBox={`0 0 ${graphWidth} ${graphHeight}`}
              className="career-sec_svg"
            >
              {/* 그라데이션 정의 */}
              <defs>
                {/* 선 그라데이션 */}
                <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--color-accent-warm)" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* 그리드 라인 (가로) */}
              {gridLevels.map((level) => (
                <line
                  key={level}
                  x1={padding.left}
                  y1={getY(level)}
                  x2={graphWidth - padding.right}
                  y2={getY(level)}
                  className="career-sec_grid"
                />
              ))}

              {/* Y축 */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={graphHeight - padding.bottom}
                className="career-sec_axis"
              />
              {/* X축 */}
              <line
                x1={padding.left}
                y1={graphHeight - padding.bottom}
                x2={graphWidth - padding.right}
                y2={graphHeight - padding.bottom}
                className="career-sec_axis"
              />

              {/* Y축 기술 스택 라벨 */}
              {gridLevels.map((level) => (
                SKILL_LABELS[level] && (
                  <text
                    key={`skill-${level}`}
                    x={padding.left - 10}
                    y={getY(level) + 4}
                    className={`career-sec_skill-label ${CAREER_DATA[activeIndex]?.level >= level ? "career-sec_skill-label--active" : ""}`}
                    textAnchor="end"
                  >
                    {SKILL_LABELS[level]}
                  </text>
                )
              ))}

              {/* X축 년도 라벨 */}
              {CAREER_DATA.map((item, i) => (
                <text
                  key={item.year}
                  x={getX(item.year)}
                  y={graphHeight - padding.bottom + 25}
                  className={`career-sec_label ${i <= activeIndex ? "career-sec_label--active" : ""}`}
                  textAnchor="middle"
                >
                  {item.year}
                </text>
              ))}

              {/* 선 (애니메이션 대상) */}
              <path
                ref={pathRef}
                d={pathD}
                className="career-sec_line"
                fill="none"
                stroke="url(#lineGradient)"
              />

              {/* 점 */}
              {CAREER_DATA.map((item, i) => (
                <circle
                  key={item.year}
                  cx={getX(item.year)}
                  cy={getY(item.level)}
                  r={i === activeIndex ? 8 : i <= activeIndex ? 6 : 4}
                  className={`career-sec_dot ${i <= activeIndex ? "career-sec_dot--active" : ""} ${i === activeIndex ? "career-sec_dot--current" : ""}`}
                />
              ))}
            </svg>
          </div>
        )}

        {/* 오른쪽: 히스토리 (PC + Mobile 모두) */}
        <div className="career-sec_history">
          {CAREER_DATA.map((item, i) => (
            <div
              key={item.year}
              className={`career-sec_item ${i === activeIndex ? "career-sec_item--active" : ""}`}
            >
              <h3 className="career-sec_year">{item.year}</h3>
              <h4 className="career-sec_title">{item.title}</h4>
              <p className="career-sec_desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
