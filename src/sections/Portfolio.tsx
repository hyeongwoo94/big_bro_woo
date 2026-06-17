import { useEffect, useState } from "react";
import {
    PORTFOLIO_DATA,
    INNER_ORBIT_DATA,
    OUTER_ORBIT_DATA,
    PROFILE_IMAGE,
} from "../shared/content/portfolioData";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import "./styles/Portfolio.css";

export default function Portfolio() {
    const [isMobile, setIsMobile] = useState(false);

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
                <h2 className="portfolio-sec_heading">포트폴리오</h2>

                {/* PC: 원형 궤도 */}
                {!isMobile && (
                    <div className="portfolio-sec_orbit-wrapper">
                        <div className="portfolio-sec_orbit">
                            {/* 가운데 프로필 + 호버 툴팁 */}
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

                            {/* 안쪽 궤도 위성 */}
                            <div className="portfolio-sec_satellites portfolio-sec_satellites--inner">
                                {INNER_ORBIT_DATA.map((item, i) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="portfolio-sec_satellite portfolio-sec_satellite--inner"
                                        style={
                                            {
                                                "--angle": `${(360 / INNER_ORBIT_DATA.length) * i}deg`,
                                            } as React.CSSProperties
                                        }
                                        title={item.title}
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="portfolio-sec_thumb"
                                        />
                                        <span className="portfolio-sec_label">
                                            {item.title}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            {/* 바깥쪽 궤도 위성 */}
                            <div className="portfolio-sec_satellites portfolio-sec_satellites--outer">
                                {OUTER_ORBIT_DATA.map((item, i) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="portfolio-sec_satellite portfolio-sec_satellite--outer"
                                        style={
                                            {
                                                "--angle": `${(360 / OUTER_ORBIT_DATA.length) * i}deg`,
                                            } as React.CSSProperties
                                        }
                                        title={item.title}
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="portfolio-sec_thumb"
                                        />
                                        <span className="portfolio-sec_label">
                                            {item.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* 회전하는 별 + 호버 시 메시지 */}
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

                {/* Mobile: 프로필 + 리스트 */}
                {isMobile && (
                    <div className="portfolio-sec_mobile">
                        {/* 안내 문구 */}
                        <p className="portfolio-sec_mobile-notice">
                            ※ 본 프로젝트의 기획 및 개발은 재직 기간 중
                            수행하였으며,
                            <br />
                            현재 서비스 화면은 운영 및 유지보수 과정에서 일부
                            변경되었을 수 있습니다.
                        </p>

                        {/* 프로필 사진 */}
                        <div className="portfolio-sec_mobile-profile">
                            <img
                                src={PROFILE_IMAGE}
                                alt="프로필"
                                className="portfolio-sec_profile--square"
                            />
                        </div>

                        {/* 포트폴리오 리스트 */}
                        <ul className="portfolio-sec_list">
                            {PORTFOLIO_DATA.map((item) => (
                                <li
                                    key={item.id}
                                    className="portfolio-sec_list-item"
                                >
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="portfolio-sec_link"
                                    >
                                        <span className="portfolio-sec_link-title">
                                            {item.title}
                                        </span>
                                        <span className="portfolio-sec_link-arrow">
                                            →
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
