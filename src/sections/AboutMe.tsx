import { useState, useEffect } from "react";
import {
  ABOUT_CARDS,
  type AboutCard,
} from "../shared/content/aboutMeData";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import "./styles/AboutMe.css";

export default function AboutMe() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const handleCardClick = (cardId: string) => {
    setOpenCardId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section className="aboutme-sec">
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: "var(--spacing-lg)",
            right: "var(--spacing-lg)",
            zIndex: 10,
          }}
        >
          <TechNote {...getTechNoteContent("aboutme")} />
        </div>
      )}

      <div className="aboutme-sec_cont">
        <h2 className="aboutme-sec_heading">ABOUT ME</h2>

        {/* 이력서 다운로드 버튼 */}
        <a
          href="/resume.pdf"
          download
          className="aboutme-sec_resume-btn"
        >
          이력서보기
        </a>

        {/* 카드 그리드 */}
        <div className="aboutme-sec_cards">
          {ABOUT_CARDS.map((card) => (
            <AccordionCard
              key={card.id}
              card={card}
              isOpen={openCardId === card.id}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 아코디언 카드 컴포넌트 */
function AccordionCard({
  card,
  isOpen,
  onClick,
}: {
  card: AboutCard;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`aboutme-sec_card ${isOpen ? "aboutme-sec_card--open" : ""}`}>
      <button
        type="button"
        className="aboutme-sec_card-header"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="aboutme-sec_card-icon">{card.icon}</span>
        <div className="aboutme-sec_card-info">
          <span className="aboutme-sec_card-title">{card.title}</span>
          <span className="aboutme-sec_card-keywords">
            {card.keywords.join(" · ")}
          </span>
        </div>
        <span className="aboutme-sec_card-toggle">{isOpen ? "−" : "+"}</span>
      </button>

      <div className="aboutme-sec_card-body">
        <div className="aboutme-sec_card-content">
          <p>{card.content}</p>
        </div>
      </div>
    </div>
  );
}
