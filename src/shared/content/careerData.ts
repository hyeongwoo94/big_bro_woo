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
        title: "아카데미 입학",
        description:
            "웹 퍼블리싱 아카데미에서 HTML, CSS, JavaScript 기초를 배우며 개발에 입문했습니다.",
    },
    {
        year: 2021,
        level: 1,
        title: "아카데미 졸업 → 스타트업",
        description:
            "아카데미를 졸업하고 첫 스타트업에 입사. 6개월간 실무를 경험하며 빠르게 성장했습니다.",
    },
    {
        year: 2022,
        level: 2,
        title: "여성병원·산부인과",
        description:
            "PHP 그누보드를 활용한 병원 웹사이트 유지보수 및 신규 페이지 개발을 담당했습니다.",
    },
    {
        year: 2023,
        level: 2,
        title: "여성병원·산부인과 (계속)",
        description:
            "병원 웹사이트 유지보수를 계속하며 PHP와 그누보드 경험을 쌓았습니다.",
    },
    {
        year: 2024,
        level: 3,
        title: "안과 마케팅회사",
        description:
            "안과 전문 마케팅회사에서 다양한 랜딩페이지와 프로모션 페이지를 제작했습니다.",
    },
    {
        year: 2025,
        level: 4,
        title: "ERP 회사",
        description:
            "ERP 시스템 회사에서 프론트엔드 개발을 담당하며 React, TypeScript를 본격적으로 활용하기 시작했습니다.",
    },
    {
        year: 2026,
        level: 5,
        title: "프론트엔드 전향",
        description:
            "퍼블리셔에서 프론트엔드 개발자로 전향을 준비하며, 이 포트폴리오를 제작 중입니다.",
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
