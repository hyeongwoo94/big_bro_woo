import { useEffect } from "react";
import type { PortfolioItem } from "../shared/content/portfolioData";
import PortfolioTypeBadge from "./PortfolioTypeBadge";

type PortfolioModalProps = {
    item: PortfolioItem | null;
    onClose: () => void;
};

const DETAIL_SECTIONS = [
    { key: "challenge" as const, label: "문제" },
    { key: "solution" as const, label: "해결" },
    { key: "result" as const, label: "효과" },
];

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
    useEffect(() => {
        if (!item) return;

        document.body.style.overflow = "hidden";
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [item, onClose]);

    if (!item) return null;

    return (
        <>
            <button
                type="button"
                className="portfolio-sec_modal-overlay portfolio-sec_modal-overlay--open"
                aria-label="모달 닫기"
                onClick={onClose}
            />
            <div
                className="portfolio-sec_modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-modal-title"
            >
                <div className="portfolio-sec_modal-header">
                    <div className="portfolio-sec_modal-title-wrap">
                        <h3
                            id="portfolio-modal-title"
                            className="portfolio-sec_modal-title"
                        >
                            {item.title}
                        </h3>
                        <PortfolioTypeBadge type={item.type} />
                    </div>
                    <button
                        type="button"
                        className="portfolio-sec_modal-close"
                        aria-label="닫기"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="portfolio-sec_modal-body">
                    <div className="portfolio-sec_modal-thumb-wrap">
                        <img
                            src={item.thumbnail}
                            alt=""
                            className="portfolio-sec_modal-thumb"
                        />
                    </div>

                    <div className="portfolio-sec_modal-details">
                        {DETAIL_SECTIONS.map(({ key, label }) => (
                            <div
                                key={key}
                                className="portfolio-sec_modal-section"
                            >
                                <h4 className="portfolio-sec_modal-label">
                                    {label}
                                </h4>
                                <p className="portfolio-sec_modal-text">
                                    {item[key]}
                                </p>
                            </div>
                        ))}
                    </div>

                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-sec_modal-link"
                    >
                        바로가기 →
                    </a>
                </div>
            </div>
        </>
    );
}
