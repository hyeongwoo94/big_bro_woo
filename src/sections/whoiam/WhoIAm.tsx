import { useState, useEffect } from "react";
import {
    WHO_I_AM_CARDS,
    WHO_I_AM_TECH_STACK,
    type WhoIAmCard,
} from "./whoIAmData";
import { getTechNoteContent } from "../../shared/content/techNotes";
import { TechNote } from "../../shared/ui/TechNote";
import "./styles/WhoIAm.css";

export default function WhoIAm() {
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
        <section className="whoiam-sec">
            {!isMobile && (
                <div
                    style={{
                        position: "absolute",
                        top: "var(--spacing-lg)",
                        right: "var(--spacing-lg)",
                        zIndex: 10,
                    }}
                >
                    <TechNote {...getTechNoteContent("whoiam")} />
                </div>
            )}

            <div className="whoiam-sec_cont">
                <h2 className="whoiam-sec_heading">WHO I AM</h2>

                <ul className="whoiam-sec_stack" aria-label="기술 스택">
                    {WHO_I_AM_TECH_STACK.map((skill) => (
                        <li key={skill} className="whoiam-sec_stack-item">
                            {skill}
                        </li>
                    ))}
                </ul>

                <div className="whoiam-sec_cards">
                    {WHO_I_AM_CARDS.map((card) => (
                        <AccordionCard
                            key={card.id}
                            card={card}
                            isOpen={openCardId === card.id}
                            onClick={() => handleCardClick(card.id)}
                        />
                    ))}
                </div>

                <div className="whoiam-sec_resume-wrap">
                    <a
                        href="/이력서.pdf"
                        download
                        className="whoiam-sec_resume-btn"
                    >
                        이력서 자세히보기
                    </a>
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
    card: WhoIAmCard;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div
            className={`whoiam-sec_card ${isOpen ? "whoiam-sec_card--open" : ""}`}
        >
            <button
                type="button"
                className="whoiam-sec_card-header"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="whoiam-sec_card-icon">{card.icon}</span>
                <div className="whoiam-sec_card-info">
                    <span className="whoiam-sec_card-title">{card.title}</span>
                    <span className="whoiam-sec_card-keywords">
                        {card.keywords.join(" · ")}
                    </span>
                </div>
                <span className="whoiam-sec_card-toggle">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            <div className="whoiam-sec_card-body">
                <div className="whoiam-sec_card-content">
                    <p>{card.content}</p>
                </div>
            </div>
        </div>
    );
}
