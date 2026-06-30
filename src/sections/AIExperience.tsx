import React, { useState, useEffect } from "react";
import {
    AI_EXPERIENCE_DATA,
    WORKFLOW_COLORS,
    WORKFLOW_EXAMPLE,
    type AIProject,
    type WorkflowStep,
} from "../shared/content/aiExperienceData";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import "./styles/AIExperience.css";

export default function AIExperience() {
    const [activeTab, setActiveTab] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showExamplePanel, setShowExamplePanel] = useState(false);

    const activeProject = AI_EXPERIENCE_DATA[activeTab];

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return (
        <section className="ai-exp-sec">
            {!isMobile && (
                <div
                    style={{
                        position: "absolute",
                        top: "var(--spacing-lg)",
                        right: "var(--spacing-lg)",
                        zIndex: 10,
                    }}
                >
                    <TechNote {...getTechNoteContent("aiexperience")} />
                </div>
            )}

            <div className="ai-exp-sec_cont">
                <h2 className="ai-exp-sec_heading">HOW I USE AI</h2>

                {/* 탭 네비게이션 */}
                <div className="ai-exp-sec_tabs" role="tablist">
                    {AI_EXPERIENCE_DATA.map((project, i) => (
                        <button
                            key={project.id}
                            id={`ai-exp-tab-${project.id}`}
                            role="tab"
                            aria-selected={activeTab === i}
                            aria-controls={`ai-exp-panel-${project.id}`}
                            className={`ai-exp-sec_tab ${activeTab === i ? "ai-exp-sec_tab--active" : ""}`}
                            onClick={() => setActiveTab(i)}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>

                {/* 프로젝트 상세 */}
                <div
                    className="ai-exp-sec_content"
                    role="tabpanel"
                    id={`ai-exp-panel-${activeProject.id}`}
                    aria-labelledby={`ai-exp-tab-${activeProject.id}`}
                >
                    <ProjectDetail project={activeProject} />

                    {/* AI 워크플로우 */}
                    {activeProject.workflow.length > 0 ? (
                        <WorkflowVisualization
                            workflow={activeProject.workflow}
                            isMobile={isMobile}
                            showExampleBtn={activeProject.id === "portfolio"}
                            onExampleClick={() => setShowExamplePanel(true)}
                        />
                    ) : (
                        <div className="ai-exp-sec_placeholder">
                            <span className="ai-exp-sec_placeholder-icon">🚧</span>
                            <p className="ai-exp-sec_placeholder-text">
                                상세 내용 준비 중입니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 예시 슬라이드 패널 */}
            <ExampleSlidePanel
                isOpen={showExamplePanel}
                onClose={() => setShowExamplePanel(false)}
            />
        </section>
    );
}

/** 프로젝트 상세 컴포넌트 */
function ProjectDetail({ project }: { project: AIProject }) {
    return (
        <div className="ai-exp-sec_detail">
            <h3 className="ai-exp-sec_title">{project.title}</h3>
            <p className="ai-exp-sec_desc">{project.description}</p>

            {project.techStack.length > 0 && (
                <div className="ai-exp-sec_tags">
                    <span className="ai-exp-sec_tag-label">기술:</span>
                    {project.techStack.map((tech) => (
                        <span key={tech} className="ai-exp-sec_tag">
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {project.aiTools.length > 0 && (
                <div className="ai-exp-sec_tags">
                    <span className="ai-exp-sec_tag-label">AI 도구:</span>
                    {project.aiTools.map((tool) => (
                        <span
                            key={tool}
                            className="ai-exp-sec_tag ai-exp-sec_tag--ai"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            )}

            {project.automations && project.automations.length > 0 && (
                <div className="ai-exp-sec_tags">
                    <span className="ai-exp-sec_tag-label">자동화:</span>
                    {project.automations.map((item, i) => (
                        <span
                            key={i}
                            className="ai-exp-sec_tag ai-exp-sec_tag--auto"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}

            {project.implementationAreas &&
                project.implementationAreas.length > 0 && (
                    <div className="ai-exp-sec_impl">
                        <h4 className="ai-exp-sec_impl-title">구현 범위</h4>
                        {project.implementationIntro && (
                            <p className="ai-exp-sec_impl-intro">
                                {project.implementationIntro}
                            </p>
                        )}
                        <div className="ai-exp-sec_impl-grid">
                            {project.implementationAreas.map((area) => (
                                <div
                                    key={area.title}
                                    className="ai-exp-sec_impl-card"
                                >
                                    <strong className="ai-exp-sec_impl-label">
                                        {area.title}
                                    </strong>
                                    <p className="ai-exp-sec_impl-desc">
                                        {area.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {/* AI 활용 장점 */}
            {project.aiBenefits && project.aiBenefits.length > 0 && (
                <div className="ai-exp-sec_benefits">
                    <h4 className="ai-exp-sec_benefits-title">AI 활용 장점</h4>
                    <div className="ai-exp-sec_benefits-grid">
                        {project.aiBenefits.map((benefit, i) => (
                            <div key={i} className="ai-exp-sec_benefit-card">
                                <div className="ai-exp-sec_benefit-header">
                                    <span className="ai-exp-sec_benefit-icon">
                                        ✦
                                    </span>
                                    <strong className="ai-exp-sec_benefit-title">
                                        {benefit.title}
                                    </strong>
                                </div>
                                <p className="ai-exp-sec_benefit-desc">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/** 워크플로우 시각화 컴포넌트 */
function WorkflowVisualization({
    workflow,
    isMobile,
    showExampleBtn,
    onExampleClick,
}: {
    workflow: WorkflowStep[];
    isMobile: boolean;
    showExampleBtn: boolean;
    onExampleClick: () => void;
}) {
    return (
        <div className="ai-exp-sec_workflow">
            <div className="ai-exp-sec_workflow-header">
                <h4 className="ai-exp-sec_workflow-title">AI 페르소나</h4>
                {showExampleBtn && (
                    <button
                        type="button"
                        className="ai-exp-sec_example-btn"
                        onClick={onExampleClick}
                    >
                        예시 보기
                    </button>
                )}
            </div>

            <div
                className={`ai-exp-sec_workflow-chart ${isMobile ? "ai-exp-sec_workflow-chart--vertical" : ""}`}
            >
                {workflow.map((step, i) => (
                    <React.Fragment key={step.id}>
                        <div className="ai-exp-sec_workflow-item">
                            <div
                                className="ai-exp-sec_workflow-node"
                                style={{
                                    borderColor: WORKFLOW_COLORS[step.role],
                                    boxShadow: `0 0 12px ${WORKFLOW_COLORS[step.role]}40`,
                                }}
                            >
                                <span className="ai-exp-sec_workflow-label">
                                    {step.label}
                                </span>
                            </div>
                            <p className="ai-exp-sec_workflow-desc">
                                {step.description}
                            </p>
                        </div>

                        {/* 화살표 (마지막 제외) */}
                        {i < workflow.length - 1 && (
                            <span className="ai-exp-sec_workflow-arrow">
                                {isMobile ? "↓" : "→"}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

/** 예시 슬라이드 패널 컴포넌트 */
function ExampleSlidePanel({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);

    // ESC 키로 닫기 + 포커스 트랩
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            // 패널 열릴 때 닫기 버튼에 포커스
            setTimeout(() => closeButtonRef.current?.focus(), 100);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* 배경 오버레이 */}
            <div
                className={`ai-exp-sec_panel-overlay ${isOpen ? "ai-exp-sec_panel-overlay--open" : ""}`}
                onClick={onClose}
            />

            {/* 슬라이드 패널 */}
            <aside
                className={`ai-exp-sec_panel ${isOpen ? "ai-exp-sec_panel--open" : ""}`}
                aria-hidden={!isOpen}
            >
                <div className="ai-exp-sec_panel-header">
                    <h3 className="ai-exp-sec_panel-title">워크플로우 예시</h3>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="ai-exp-sec_panel-close"
                        onClick={onClose}
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                <p className="ai-exp-sec_panel-subtitle">
                    Portfolio 섹션 제작 과정
                </p>

                <div className="ai-exp-sec_panel-content">
                    {WORKFLOW_EXAMPLE.map((item, i) => (
                        <div key={i} className="ai-exp-sec_panel-item">
                            <div
                                className="ai-exp-sec_panel-role"
                                style={{
                                    borderColor: WORKFLOW_COLORS[item.role],
                                    color: WORKFLOW_COLORS[item.role],
                                }}
                            >
                                {item.label}
                            </div>
                            <div className="ai-exp-sec_panel-bubble">
                                {item.content.split("\n").map((line, j) => (
                                    <span key={j}>
                                        {line}
                                        {j <
                                            item.content.split("\n").length -
                                                1 && <br />}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}
