import { useEffect, useState } from "react";
import { CONTACT_DATA, phoneDigits } from "../shared/content/contactData";
import { CAREER_STATS } from "../shared/content/statsData";
import "./styles/Contact.css";

function CareerStatsMarquee() {
    const items = [...CAREER_STATS, ...CAREER_STATS];

    return (
        <div
            className="contact-footer_marquee"
            aria-label="경력 하이라이트"
        >
            <div className="contact-footer_marquee-track">
                {items.map((stat, i) => (
                    <span
                        key={`${stat.label}-${i}`}
                        className="contact-footer_stat"
                    >
                        <strong className="contact-footer_stat-value">
                            {stat.value}
                        </strong>
                        <span className="contact-footer_stat-label">
                            {stat.label}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Contact() {
    const [isMobile, setIsMobile] = useState(false);
    const year = new Date().getFullYear();

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const phoneHref = isMobile
        ? `sms:${phoneDigits(CONTACT_DATA.phone)}`
        : `tel:${CONTACT_DATA.phone}`;

    const phoneLabel = isMobile ? "문자" : "전화";

    return (
        <footer className="contact-footer" aria-label="연락처">
            <CareerStatsMarquee />
            <div className="contact-footer_cont">
                <span className="contact-footer_copy">
                    © {year} {CONTACT_DATA.name}
                </span>
                <span className="contact-footer_sep" aria-hidden>
                    |
                </span>
                <a
                    className="contact-footer_link"
                    href={`mailto:${CONTACT_DATA.email}`}
                >
                    {CONTACT_DATA.email}
                </a>
                <span className="contact-footer_sep" aria-hidden>
                    |
                </span>
                <a
                    className="contact-footer_link"
                    href={phoneHref}
                    aria-label={`${CONTACT_DATA.phone} ${phoneLabel}`}
                >
                    {CONTACT_DATA.phone}
                </a>
                <span className="contact-footer_sep" aria-hidden>
                    |
                </span>
                <a
                    className="contact-footer_link"
                    href={CONTACT_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}
