import {
    PROJECTS_TYPE_LABEL,
    type ProjectType,
} from "./projectsData";

type ProjectsTypeBadgeProps = {
    type: ProjectType;
    variant?: "default" | "orbit" | "inline";
};

export default function ProjectsTypeBadge({
    type,
    variant = "default",
}: ProjectsTypeBadgeProps) {
    return (
        <span
            className={`projects-sec_type-badge projects-sec_type-badge--${type} projects-sec_type-badge--${variant}`}
        >
            {PROJECTS_TYPE_LABEL[type]}
        </span>
    );
}
