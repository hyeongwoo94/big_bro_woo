import { useEffect } from "react";
import type { ProjectItem } from "./projectsData";
import ProjectsTypeBadge from "./ProjectsTypeBadge";

type ProjectsModalProps = {
    item: ProjectItem | null;
    onClose: () => void;
};

const DETAIL_SECTIONS = [
    { key: "challenge" as const, label: "문제" },
    { key: "solution" as const, label: "해결" },
    { key: "result" as const, label: "효과" },
];

export default function ProjectsModal({ item, onClose }: ProjectsModalProps) {
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
                className="projects-sec_modal-overlay projects-sec_modal-overlay--open"
                aria-label="모달 닫기"
                onClick={onClose}
            />
            <div
                className="projects-sec_modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="projects-modal-title"
            >
                <div className="projects-sec_modal-header">
                    <div className="projects-sec_modal-title-wrap">
                        <h3
                            id="projects-modal-title"
                            className="projects-sec_modal-title"
                        >
                            {item.title}
                        </h3>
                        <ProjectsTypeBadge type={item.type} />
                    </div>
                    <button
                        type="button"
                        className="projects-sec_modal-close"
                        aria-label="닫기"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="projects-sec_modal-body">
                    <div className="projects-sec_modal-thumb-wrap">
                        <img
                            src={item.thumbnail}
                            alt=""
                            className="projects-sec_modal-thumb"
                        />
                    </div>

                    <div className="projects-sec_modal-details">
                        {DETAIL_SECTIONS.map(({ key, label }) => (
                            <div
                                key={key}
                                className="projects-sec_modal-section"
                            >
                                <h4 className="projects-sec_modal-label">
                                    {label}
                                </h4>
                                <p className="projects-sec_modal-text">
                                    {item[key]}
                                </p>
                            </div>
                        ))}
                    </div>

                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-sec_modal-link"
                    >
                        바로가기 →
                    </a>
                </div>
            </div>
        </>
    );
}
