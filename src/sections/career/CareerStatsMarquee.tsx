import { CAREER_STATS } from "./statsData";

export default function CareerStatsMarquee() {
    const items = [...CAREER_STATS, ...CAREER_STATS];

    return (
        <div className="career-sec_marquee" aria-label="경력 하이라이트">
            <div className="career-sec_marquee-track">
                {items.map((stat, i) => (
                    <span
                        key={`${stat.label}-${i}`}
                        className="career-sec_stat"
                    >
                        <strong className="career-sec_stat-value">
                            {stat.value}
                        </strong>
                        <span className="career-sec_stat-label">
                            {stat.label}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}
