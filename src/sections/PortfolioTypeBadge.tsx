import {
    PORTFOLIO_TYPE_LABEL,
    type PortfolioType,
} from "../shared/content/portfolioData";

type PortfolioTypeBadgeProps = {
    type: PortfolioType;
    variant?: "default" | "orbit" | "inline";
};

export default function PortfolioTypeBadge({
    type,
    variant = "default",
}: PortfolioTypeBadgeProps) {
    return (
        <span
            className={`portfolio-sec_type-badge portfolio-sec_type-badge--${type} portfolio-sec_type-badge--${variant}`}
        >
            {PORTFOLIO_TYPE_LABEL[type]}
        </span>
    );
}
