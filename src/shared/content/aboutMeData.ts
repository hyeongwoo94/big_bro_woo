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

export const ABOUT_TECH_STACK = [
    "HTML",
    "SCSS",
    "CSS",
    "JavaScript",
    "GSAP",
    "PHP",
    "그누보드",
    "Vue",
    "React",
    "TypeScript",
    "Photoshop",
    "Figma",
] as const;

export const ABOUT_CARDS: AboutCard[] = [
    {
        id: "why-frontend",
        title: "왜 프론트엔드인가",
        icon: "💡",
        keywords: ["정적페이지", "동적인 인터랙션", "데이터", "사용자 경험"],
        content:
            "비전공자로 웹 퍼블리싱을 배우며 처음 작성한 코드가 브라우저에서 화면으로 구현되는 과정에 큰 흥미를 느꼈습니다. 정적인 웹페이지를 시작으로 동적인 인터랙션을 구현하는 즐거움을 경험했고, 이제는 데이터에 따라 화면이 변화하며 사용자 경험을 완성하는 서비스를 만들고 싶다는 목표로 프론트엔드 개발자를 준비하고 있습니다.",
    },
    {
        id: "how-work",
        title: "어떻게 일하는가",
        icon: "⚙️",
        keywords: ["템플릿", "유지보수", "재사용"],
        content:
            "프로젝트는 개발보다 유지보수 기간이 더 길다고 생각합니다. 그래서 처음부터 규칙을 정하고 공통 요소를 템플릿과 컴포넌트로 구성하여 재사용성을 높입니다. 다른 개발자도 쉽게 이해하고 수정할 수 있는 구조를 만드는 것이 효율적인 개발이라고 생각합니다.",
    },
    {
        id: "team-lead",
        title: "팀리드 경험",
        icon: "👥",
        keywords: ["팀 리딩", "일정 조율", "프로세스 정립"],
        content:
            "1년 퍼블리셔 3명 팀을 리드했습니다.\n공통 페이지를 템플릿화해 홈페이지 제작 시간을 줄이고, 신규·유지보수 업무를 분담·조율했습니다.\n팀원별 강점에 맞게 업무를 배분하고, 제작 기준을 정리해 누구나 일관된 방식으로 작업할 수 있는 환경을 만들기 위해 노력했습니다.",
    },
    {
        id: "how-study",
        title: "어떻게 공부하는가",
        icon: "🤖",
        keywords: ["AI 활용", "자기주도 학습"],
        content:
            "새로운 기술을 배우면 단순히 동작하는 코드에서 멈추지 않습니다. AI에게 코드의 작성 이유와 구조를 질문하며 직접 정리하고, 배운 내용을 프로젝트에 적용하며 이해를 넓혀갑니다. 또한 퍼블리셔와 프론트엔드의 실무 차이를 이해하기 위해 항해 프론트엔드 과정에 참여해 SPA 설계 방식과 Vanilla JavaScript 기반 구현, 페르소나 중심의 문제 해결 방식을 학습했습니다.",
    },
    {
        id: "goal",
        title: "목표",
        icon: "🎯",
        keywords: ["프론트엔드", "성장"],
        content:
            "정적인 화면 구현을 넘어 사용자와 데이터를 연결하는 웹 서비스를 만드는 프론트엔드 개발자가 되고 싶습니다. 퍼블리싱 경험을 바탕으로 유지보수성과 사용자 경험을 함께 고민하며 꾸준히 성장하는 개발자가 되는 것이 목표입니다.",
    },
];
