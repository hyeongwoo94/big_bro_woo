import { useEffect, useState } from "react";
import {
    PROJECTS_DATA,
    INNER_ORBIT_DATA,
    OUTER_ORBIT_DATA,
    PROJECTS_TYPE_LABEL,
    type ProjectItem,
} from "./projectsData";
import {
    PROFILE_IMAGE,
    PROFILE_GALLERY,
} from "./profileGalleryData";
import { getTechNoteContent } from "../../shared/content/techNotes";
import { TechNote } from "../../shared/ui/TechNote";
import ProjectsModal from "./ProjectsModal";
import ProfileGalleryModal from "./ProfileGalleryModal";
import ProjectsTypeBadge from "./ProjectsTypeBadge";
import "./styles/Projects.css";

function OrbitSatellite({
    item,
    orbit,
    index,
    total,
    onSelect,
}: {
    item: ProjectItem;
    orbit: "inner" | "outer";
    index: number;
    total: number;
    onSelect: (item: ProjectItem) => void;
}) {
    return (
        <button
            type="button"
            className={`projects-sec_satellite projects-sec_satellite--${orbit}`}
            style={
                {
                    "--angle": `${(360 / total) * index}deg`,
                } as React.CSSProperties
            }
            title={item.title}
            aria-label={`${PROJECTS_TYPE_LABEL[item.type]} ${item.title} 프로젝트 상세 보기`}
            onClick={() => onSelect(item)}
        >
            <img
                src={item.thumbnail}
                alt=""
                className="projects-sec_thumb"
            />
            <span className="projects-sec_label">
                {item.title}
                <ProjectsTypeBadge type={item.type} variant="orbit" />
            </span>
        </button>
    );
}

export default function Projects() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(
        null,
    );
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return (
        <section className="projects-sec">
            {!isMobile && (
                <div
                    style={{
                        position: "absolute",
                        top: "var(--spacing-lg)",
                        right: "var(--spacing-lg)",
                        zIndex: 10,
                    }}
                >
                    <TechNote {...getTechNoteContent("projects")} />
                </div>
            )}
            <div className="projects-sec_cont">
                <h2 className="projects-sec_heading">PROJECTS</h2>

                {!isMobile && (
                    <div className="projects-sec_orbit-wrapper">
                        <div className="projects-sec_orbit">
                            <div className="projects-sec_center">
                                <button
                                    type="button"
                                    className="projects-sec_profile-btn"
                                    aria-label="프로필 사진 갤러리 보기"
                                    onClick={() => setIsGalleryOpen(true)}
                                >
                                    <img
                                        src={PROFILE_IMAGE}
                                        alt="프로필"
                                        className="projects-sec_profile"
                                    />
                                </button>
                                <div className="projects-sec_profile-tooltip">
                                    <dl className="projects-sec_profile-info">
                                        <div className="projects-sec_profile-info-row">
                                            <dt>이름</dt>
                                            <dd>박형우</dd>
                                        </div>
                                        <div className="projects-sec_profile-info-row">
                                            <dt>생년월일</dt>
                                            <dd>1994.06.25</dd>
                                        </div>
                                        <div className="projects-sec_profile-info-row">
                                            <dt>전화번호</dt>
                                            <dd>010-9214-3819</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="projects-sec_satellites projects-sec_satellites--inner">
                                {INNER_ORBIT_DATA.map((item, i) => (
                                    <OrbitSatellite
                                        key={item.id}
                                        item={item}
                                        orbit="inner"
                                        index={i}
                                        total={INNER_ORBIT_DATA.length}
                                        onSelect={setSelectedItem}
                                    />
                                ))}
                            </div>

                            <div className="projects-sec_satellites projects-sec_satellites--outer">
                                {OUTER_ORBIT_DATA.map((item, i) => (
                                    <OrbitSatellite
                                        key={item.id}
                                        item={item}
                                        orbit="outer"
                                        index={i}
                                        total={OUTER_ORBIT_DATA.length}
                                        onSelect={setSelectedItem}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="projects-sec_star-orbit">
                            <div className="projects-sec_star-satellite">
                                <span className="projects-sec_star">✦</span>
                                <div className="projects-sec_star-message">
                                    <p>
                                        본 프로젝트의 기획 및 개발은 재직 기간
                                        중 수행하였으며, 현재 서비스 화면은 운영
                                        및 유지보수 과정에서 일부 변경되었을 수
                                        있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isMobile && (
                    <div className="projects-sec_mobile">
                        <p className="projects-sec_mobile-notice">
                            ※ 본 프로젝트의 기획 및 개발은 재직 기간 중
                            수행하였으며,
                            <br />
                            현재 서비스 화면은 운영 및 유지보수 과정에서 일부
                            변경되었을 수 있습니다.
                        </p>

                        <div className="projects-sec_mobile-profile">
                            <button
                                type="button"
                                className="projects-sec_profile-btn projects-sec_profile-btn--square"
                                aria-label="프로필 사진 갤러리 보기"
                                onClick={() => setIsGalleryOpen(true)}
                            >
                                <img
                                    src={PROFILE_IMAGE}
                                    alt="프로필"
                                    className="projects-sec_profile--square"
                                />
                            </button>
                        </div>

                        <ul className="projects-sec_list">
                            {PROJECTS_DATA.map((item) => (
                                <li
                                    key={item.id}
                                    className="projects-sec_list-item"
                                >
                                    <button
                                        type="button"
                                        className="projects-sec_link"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <span className="projects-sec_link-title">
                                            {item.title}
                                            <ProjectsTypeBadge
                                                type={item.type}
                                                variant="inline"
                                            />
                                        </span>
                                        <span className="projects-sec_link-arrow">
                                            →
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <ProjectsModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            <ProfileGalleryModal
                images={PROFILE_GALLERY}
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
            />
        </section>
    );
}
