import { useEffect, useState } from "react";
import {
    PORTFOLIO_DATA,
    INNER_ORBIT_DATA,
    OUTER_ORBIT_DATA,
    PROFILE_IMAGE,
    PORTFOLIO_TYPE_LABEL,
    type PortfolioItem,
} from "../shared/content/portfolioData";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import PortfolioModal from "./PortfolioModal";
import PortfolioTypeBadge from "./PortfolioTypeBadge";
import "./styles/Portfolio.css";

function OrbitSatellite({
    item,
    orbit,
    index,
    total,
    onSelect,
}: {
    item: PortfolioItem;
    orbit: "inner" | "outer";
    index: number;
    total: number;
    onSelect: (item: PortfolioItem) => void;
}) {
    return (
        <button
            type="button"
            className={`portfolio-sec_satellite portfolio-sec_satellite--${orbit}`}
            style={
                {
                    "--angle": `${(360 / total) * index}deg`,
                } as React.CSSProperties
            }
            title={item.title}
            aria-label={`${PORTFOLIO_TYPE_LABEL[item.type]} ${item.title} 프로젝트 상세 보기`}
            onClick={() => onSelect(item)}
        >
            <img
                src={item.thumbnail}
                alt=""
                className="portfolio-sec_thumb"
            />
            <span className="portfolio-sec_label">
                {item.title}
                <PortfolioTypeBadge type={item.type} variant="orbit" />
            </span>
        </button>
    );
}

export default function Portfolio() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(
        null,
    );

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return (
        <section className="portfolio-sec">
            {!isMobile && (
                <div
                    style={{
                        position: "absolute",
                        top: "var(--spacing-lg)",
                        right: "var(--spacing-lg)",
                        zIndex: 10,
                    }}
                >
                    <TechNote {...getTechNoteContent("portfolio")} />
                </div>
            )}
            <div className="portfolio-sec_cont">
                <h2 className="portfolio-sec_heading">PROJECTS</h2>

                {!isMobile && (
                    <div className="portfolio-sec_orbit-wrapper">
                        <div className="portfolio-sec_orbit">
                            <div className="portfolio-sec_center">
                                <img
                                    src={PROFILE_IMAGE}
                                    alt="프로필"
                                    className="portfolio-sec_profile"
                                />
                                <div className="portfolio-sec_profile-tooltip">
                                    <dl className="portfolio-sec_profile-info">
                                        <div className="portfolio-sec_profile-info-row">
                                            <dt>이름</dt>
                                            <dd>박형우</dd>
                                        </div>
                                        <div className="portfolio-sec_profile-info-row">
                                            <dt>생년월일</dt>
                                            <dd>1994.06.25</dd>
                                        </div>
                                        <div className="portfolio-sec_profile-info-row">
                                            <dt>전화번호</dt>
                                            <dd>010-9214-3819</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="portfolio-sec_satellites portfolio-sec_satellites--inner">
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

                            <div className="portfolio-sec_satellites portfolio-sec_satellites--outer">
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

                        <div className="portfolio-sec_star-orbit">
                            <div className="portfolio-sec_star-satellite">
                                <span className="portfolio-sec_star">✦</span>
                                <div className="portfolio-sec_star-message">
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
                    <div className="portfolio-sec_mobile">
                        <p className="portfolio-sec_mobile-notice">
                            ※ 본 프로젝트의 기획 및 개발은 재직 기간 중
                            수행하였으며,
                            <br />
                            현재 서비스 화면은 운영 및 유지보수 과정에서 일부
                            변경되었을 수 있습니다.
                        </p>

                        <div className="portfolio-sec_mobile-profile">
                            <img
                                src={PROFILE_IMAGE}
                                alt="프로필"
                                className="portfolio-sec_profile--square"
                            />
                        </div>

                        <ul className="portfolio-sec_list">
                            {PORTFOLIO_DATA.map((item) => (
                                <li
                                    key={item.id}
                                    className="portfolio-sec_list-item"
                                >
                                    <button
                                        type="button"
                                        className="portfolio-sec_link"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <span className="portfolio-sec_link-title">
                                            {item.title}
                                            <PortfolioTypeBadge
                                                type={item.type}
                                                variant="inline"
                                            />
                                        </span>
                                        <span className="portfolio-sec_link-arrow">
                                            →
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <PortfolioModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
}
