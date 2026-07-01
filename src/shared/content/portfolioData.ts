/**
 * Portfolio 섹션에서 사용하는 포트폴리오 데이터.
 * 프로젝트 목록을 한곳에서 관리.
 * 정적 이미지 파일은 public/images/portfolio/ 에 두고, URL은 /images/portfolio/ 로 참조한다.
 */

/** public/images/portfolio/ 기준 정적 이미지 URL */
const portfolioImage = (filename: string) => `/images/portfolio/${filename}`;

export type PortfolioType = "work" | "toy";

export interface PortfolioItem {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    orbit: "inner" | "outer";
    /** inner=실무, outer=토이 (궤도와 함께 UI 뱃지에 사용) */
    type: PortfolioType;
    challenge: string;
    solution: string;
    result: string;
}

export const PORTFOLIO_TYPE_LABEL: Record<PortfolioType, string> = {
    work: "실무",
    toy: "토이",
};

/** 안쪽 궤도 포트폴리오 */
export const INNER_ORBIT_DATA: PortfolioItem[] = [
    {
        id: "seoulmiz",
        title: "서울미즈병원",
        thumbnail: portfolioImage("seoulmiz.png"),
        url: "http://seoulmizhealthcare.com/",
        orbit: "inner",
        type: "work",
        challenge:
            "관리자 페이지와 연동되는 화면을 처음 제작하는 프로젝트였습니다.\n의료진마다 다른 약력 길이와 데이터 양에도 화면이 자연스럽게 표시되어야 했습니다.\n또한 검진 설문은 답변에 따라 다음 질문이 달라지는 구조라 다양한 예외 상황까지 고려해야 했습니다.",
        solution:
            "데이터 길이와 조건이 달라져도 UI가 깨지지 않도록 구조를 세분화했습니다.\n또한 풀스택 개발자가 데이터를 쉽게 연동하고 유지보수할 수 있도록 의미 있는 클래스명과 구조적인 마크업을 설계했으며,\n 설문은 모든 조건 분기를 고려해 구현했습니다.",
        result: "관리자에서 데이터가 변경되어도 별도의 코드 수정 없이 화면이 안정적으로 반영되는 구조를 구현했습니다.\n데이터 변화에 유연하게 대응하는 UI와 협업을 고려한 마크업 설계를 경험하며 유지보수성과 협업의 중요성을 배울 수 있었습니다.",
    },
    {
        id: "bweye",
        title: "하늘안과",
        thumbnail: portfolioImage("bweye.png"),
        url: "https://bweye.co.kr/",
        orbit: "inner",
        type: "work",
        challenge: "9층 건물을 클릭하면 층이 열리는 인터랙션 구현",
        solution:
            "GSAP와 ChatGPT, 공식 문서를 참고하며 Timeline과 Transform을 활용해 구현",
        result: "디자이너의 요구사항을 그대로 구현했고, 이후 GSAP를 활용한 인터랙션 제작에 자신감을 얻었습니다.",
    },
    {
        id: "thebon",
        title: "더본안과",
        thumbnail: portfolioImage("thebon.png"),
        url: "https://theboneye.com/",
        orbit: "inner",
        type: "work",
        challenge:
            "20페이지 가량의 상세페이지를 촉박한 마감 일정 안에 제작해야 함",
        solution:
            "디자이너와 협의해 섹션을 템플릿화하고, 각 페이지를 섹션 조합으로 구조화해 제작",
        result: "제작 시간을 줄이면서 유지보수·확장이 쉬운 상세페이지 구조를 완성했습니다.",
    },
    {
        id: "yale",
        title: "예일안과",
        thumbnail: portfolioImage("yale.png"),
        url: "https://lasikmasan.mycafe24.com/",
        orbit: "inner",
        type: "work",
        challenge:
            "프로젝트 일정은 촉박했지만 모바일 디자인 시안이 제공되지 않았고,일부 디자인 가이드도 부족한 상태였습니다.",
        solution:
            "PC 디자인을 기준으로 콘텐츠 우선순위를 재정리하고, 모바일 환경에 맞게 레이아웃과 요소를 직접 설계하고 반응형 UI를 구현했습니다. ",
        result: "추가 디자인 시안 없이도 프로젝트 일정을 맞춰 반응형 홈페이지를 완성했으며, 디자인 의도와 사용성을 모두 고려한 UI를 구현했습니다.",
    },
];

/** 바깥쪽 궤도 포트폴리오 */
export const OUTER_ORBIT_DATA: PortfolioItem[] = [
    {
        id: "toy1",
        title: "업무관리 대시보드",
        thumbnail: portfolioImage("toy1.png"),
        url: "https://toy-dashboard-big-bro-woo.vercel.app/",
        orbit: "outer",
        type: "toy",
        challenge:
            "AI를 활용해 실제 서비스 수준의 프로젝트를 완성하는 것이 목표였습니다.\n기존에는 화면 구현 중심이었지만, 로그인과 게시글 관리 기능까지 직접 구현해 보고자 했습니다.",
        solution:
            "AI에게 구현 방법뿐 아니라 설계 이유를 질문하며 학습했고,\nReact와 TypeScript를 활용해 로그인, CRUD, 상태 관리 기능을 단계적으로 구현했습니다.",
        result: "처음으로 데이터와 화면이 연결되는 웹 서비스를 완성하며 퍼블리싱을 넘어 프론트엔드 개발의 전체 흐름을 경험할 수 있었습니다.",
    },
    {
        id: "toy2",
        title: "토이프로젝트2",
        thumbnail: portfolioImage("toy2.png"),
        url: "https://daum.net",
        orbit: "outer",
        type: "toy",
        challenge:
            "새로운 기술 스택으로 빠르게 프로토타입 만들기 (내용 수정 예정)",
        solution: "기획부터 구현·배포까지 한 번에 진행 (내용 수정 예정)",
        result: "전 과정을 경험하며 학습 (내용 수정 예정)",
    },
];

/** 전체 포트폴리오 (모바일 리스트용) */
export const PORTFOLIO_DATA: PortfolioItem[] = [
    ...INNER_ORBIT_DATA,
    ...OUTER_ORBIT_DATA,
];

/** 프로필 이미지 경로 (placeholder) */
export const PROFILE_IMAGE = portfolioImage("이력서사진.jpg");
