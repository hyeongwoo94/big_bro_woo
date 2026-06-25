/**
 * ABOUT ME 섹션 데이터
 */

export interface AboutCard {
    id: string;
    title: string;
    icon: string;
    keywords: string[];
    content: string;
}

export const ABOUT_INTRO =
    "안녕하세요. 사용자 경험과 데이터의 흐름을 함께 고민하는 프론트엔드 개발자 박형우입니다.";

export const ABOUT_CARDS: AboutCard[] = [
    {
        id: "why-frontend",
        title: "왜 프론트엔드인가",
        icon: "💡",
        keywords: ["데이터", "사용자 경험"],
        content:
            "비전공자로 웹 퍼블리싱을 시작해 정적인 웹페이지를 만드는 즐거움을 느꼈습니다.\n 이후 동적인 인터랙션과 사용자 경험을 구현하는 과정에 흥미를 갖게 되었고, 나아가 화면과 데이터를 연결해 서비스를 완성하는 프론트엔드 개발자를 목표로 성장하고 있습니다.",
    },
    {
        id: "how-work",
        title: "어떻게 일하는가",
        icon: "⚙️",
        keywords: ["템플릿", "자동화"],
        content:
            "반복되는 작업은 템플릿과 컴포넌트로 자동화하는 것을 좋아합니다. 실제로 팀 내 반응형 제작 기준과 공통 컴포넌트 템플릿을 만들어 제작 효율을 높인 경험이 있습니다.",
    },
    {
        id: "what-developer",
        title: "어떤 개발자인가",
        icon: "🎨",
        keywords: ["퍼블리셔", "디테일"],
        content:
            "퍼블리셔 경험 덕분에 디자인 의도를 이해하고 디테일까지 구현하는 것을 강점으로 가지고 있습니다.",
    },
    {
        id: "how-study",
        title: "어떻게 공부하는가",
        icon: "🤖",
        keywords: ["AI 활용", "빠른 검증"],
        content:
            "AI를 적극 활용하며 새로운 기술을 빠르게 검증하고 프로젝트에 적용합니다.",
    },
    {
        id: "goal",
        title: "목표",
        icon: "🎯",
        keywords: ["프론트엔드", "성장"],
        content:
            "사용자 경험과 데이터를 연결하는 프론트엔드 개발자가 되고 싶습니다.",
    },
];
