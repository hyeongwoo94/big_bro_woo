/**
 * Career 섹션에서 사용하는 경력 데이터.
 * 년도별 title, description을 한곳에서 관리.
 */

export interface CareerItem {
    year: number;
    level: number;
    title: string;
    description: string;
}

export const CAREER_DATA: CareerItem[] = [
    {
        year: 2020,
        level: 0,
        title: "웹 퍼블리싱 입문",
        description:
            "HTML, CSS, JavaScript를 처음 배우며 웹 개발에 입문했습니다.\n웹페이지 레이아웃 설계와 정적 페이지 제작을 학습했습니다.\n Photoshop 자격증을 취득하며 디자인 협업을 위한 기초 역량도 갖추었습니다.",
    },
    {
        year: 2021,
        level: 1,
        title: "스타트업",
        description:
            "비전공자로 첫 개발 회사에 입사해 실무를 시작했습니다.\n백엔드 개발자와 협업하며 홈페이지 제작 과정을 경험했고,\n웹사이트가 실제 수익으로 이어지는 비즈니스 구조를 배우며 실무의 흐름을 이해했습니다.",
    },
    {
        year: 2022,
        level: 2,
        title: "광고대행사(뷰티관련)",
        description:
            "병원 홈페이지와 DB 수집을 위한 랜딩페이지 제작에 참여했습니다.\n그누보드 설치와 기본 템플릿 커스터마이징, PHP 코드 수정을 경험하며 그누보드 기반 프로젝트의 구조를 이해하고 유지보수하는 방법을 익혔습니다.",
    },
    {
        year: 2023,
        level: 2,
        title: "광고대행사(뷰티관련)",
        description:
            "다양한 병원 홈페이지와 랜딩페이지를 제작하며 그누보드 기반 프로젝트를 안정적으로 유지보수했습니다.\n반복되는 작업을 효율적으로 수행하며 실무 역량을 높였습니다.",
    },
    {
        year: 2024,
        level: 3,
        title: "스카우트 · 광고대행사(안과 + 기업)",
        description:
            "이전 회사 백엔드 개발자의 제안으로 합류했습니다.\n공통 페이지를 템플릿화하여 홈페이지 제작 시간을 단축하고 제작 프로세스를 정립했습니다.\nGSAP 기반 인터랙션을 구현하며 20개 이상의 홈페이지,랜딩페이지를 제작했고, 퍼블리셔 팀 리딩과 업무 분담, 일정 조율을 담당했습니다.",
    },
    {
        year: 2025,
        level: 4,
        title: "ERP 회사",
        description:
            "프론트엔드 전향을 목표로 Vue·TypeScript 환경에서 퍼블리싱을 담당했습니다.\n부족한 부분을 보완하기 위해 항해 프론트엔드 과정을 수강하며 React, JavaScript, Storybook, TailwindCSS와 컴포넌트 설계를 학습했습니다.",
    },
    {
        year: 2026,
        level: 5,
        title: "프론트엔드로 도약",
        description:
            "정적 웹사이트 제작을 넘어 API 연동과 상태 관리, 사용자별 화면을 구현하는 서비스 개발을 목표로 프론트엔드 역량을 키우고 있습니다.\n프론트엔드 개발 환경과 AI를 활용하며 지속적으로 학습하고 있습니다.",
    },
];

/** 전체 년도 범위 (X축 표시용) */
export const CAREER_YEAR_RANGE = {
    start: CAREER_DATA[0].year,
    end: CAREER_DATA[CAREER_DATA.length - 1].year,
};

/** 전체 레벨 범위 (Y축 표시용) */
export const CAREER_LEVEL_RANGE = {
    min: 0,
    max: CAREER_DATA[CAREER_DATA.length - 1].level,
};

/** Y축 레벨별 기술 스택 라벨 */
export const SKILL_LABELS: Record<number, string> = {
    0: "HTML, CSS",
    1: "워드프레스",
    2: "PHP + 그누보드",
    3: "GSAP + JS",
    4: "Vue + TypeScript",
    5: "React",
};
