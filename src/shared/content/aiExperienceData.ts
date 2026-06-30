/**
 * AI 경험 섹션에서 사용하는 프로젝트 데이터.
 */

export interface WorkflowStep {
    id: string;
    role: "command" | "director" | "planning" | "code" | "review";
    label: string;
    description: string;
}

export interface AIBenefit {
    title: string;
    description: string;
}

/** 직접 설계·구현한 기능 영역 (토이 프로젝트 등) */
export interface ImplementationArea {
    title: string;
    description: string;
}

export interface AIProject {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    aiTools: string[];
    workflow: WorkflowStep[];
    aiBenefits?: AIBenefit[];
    automations?: string[];
    /** 프론트엔드 역량을 보여주는 구현 범위 목록 */
    implementationIntro?: string;
    implementationAreas?: ImplementationArea[];
}

/** 워크플로우 역할별 색상 */
export const WORKFLOW_COLORS: Record<WorkflowStep["role"], string> = {
    command: "#f59e0b",
    director: "#8b5cf6",
    planning: "#3b82f6",
    code: "#10b981",
    review: "#ec4899",
};

/** 워크플로우 예시 대화 */
export interface WorkflowExample {
    role: WorkflowStep["role"];
    label: string;
    content: string;
}

/** 공통 AI 페르소나 워크플로우 (모든 탭 동일) */
export const DEFAULT_WORKFLOW: WorkflowStep[] = [
    {
        id: "cmd",
        role: "command",
        label: "명령",
        description: "요청 전달",
    },
    {
        id: "dir",
        role: "director",
        label: "총괄",
        description: "방향 결정",
    },
    {
        id: "plan",
        role: "planning",
        label: "기획일꾼",
        description: "설계 작성",
    },
    {
        id: "code",
        role: "code",
        label: "코드일꾼",
        description: "코드 구현",
    },
    {
        id: "review",
        role: "review",
        label: "검토일꾼",
        description: "품질 검토",
    },
];

export const WORKFLOW_EXAMPLE: WorkflowExample[] = [
    {
        role: "command",
        label: "사용자 명령",
        content:
            "Career 섹션 다음에 Portfolio 섹션을 만들어줘. " +
            "나의 사진을 가운데 원형으로 넣고, 포트폴리오 캡쳐 사진들이 위성처럼 돌아갔으면 좋겠어.",
    },
    {
        role: "director",
        label: "총괄",
        content:
            "Portfolio 섹션 추가 작업입니다. " +
            "PC는 원형 궤도 레이아웃, Mobile은 리스트 형태로 진행하겠습니다. " +
            "기획일꾼에게 상세 설계를 요청합니다.",
    },
    {
        role: "planning",
        label: "기획일꾼",
        content:
            "설계 완료했습니다.\n" +
            "• PC: 원형 프로필 + 위성 궤도 회전\n" +
            "• Mobile: 네모 프로필 + 리스트\n" +
            "• 호버 시 확대, 클릭 시 사이트 이동\n\n" +
            "docs/design/portfolio-design.md에 초안을 작성했습니다.",
    },
    {
        role: "code",
        label: "코드일꾼",
        content:
            "구현 완료했습니다.\n" +
            "• portfolioData.ts - 데이터 파일\n" +
            "• Portfolio.tsx - 메인 컴포넌트\n" +
            "• Portfolio.css - 궤도 회전 애니메이션\n\n" +
            "CSS @keyframes로 궤도 회전, pointer-events로 클릭 영역 제어했습니다.",
    },
    {
        role: "review",
        label: "검토일꾼",
        content:
            "검토 완료했습니다.\n" +
            "• 린터 에러 없음\n" +
            "• PC/Mobile 반응형 확인 완료\n" +
            "• 설계서 체크리스트 업데이트 완료",
    },
];

export const AI_EXPERIENCE_DATA: AIProject[] = [
    {
        id: "portfolio",
        title: "인터랙티브 포트폴리오",
        description:
            "AI와 협업(바이브코딩)으로 제작한 포트폴리오 웹사이트입니다. " +
            "Cursor IDE의 에이전트 기능을 활용하여 기획부터 구현까지 전 과정을 AI와 함께 진행했습니다. " +
            "페르소나 기반 워크플로우를 적용해 체계적으로 개발했습니다.",
        techStack: ["React", "TypeScript", "CSS", "GSAP", "Vite"],
        aiTools: ["Cursor", "ChatGPT"],
        workflow: DEFAULT_WORKFLOW,
        aiBenefits: [
            {
                title: "페르소나 기반 체계적 개발",
                description:
                    "총괄-기획-코드-검토 역할을 나눠 체계적으로 진행. " +
                    "각 단계별로 명확한 산출물이 생겨 진행 상황 파악이 쉬웠습니다.",
            },
            {
                title: "설계 문서 자동 생성",
                description:
                    "기획 단계에서 docs/design/*.md 형태로 설계 문서가 자동 작성됨. " +
                    "나중에 코드를 보지 않아도 의도를 파악할 수 있습니다.",
            },
            {
                title: "빠른 프로토타이핑",
                description:
                    "아이디어를 말하면 바로 구현해볼 수 있어서 시행착오 비용이 줄었습니다. " +
                    "마음에 안 들면 즉시 수정 요청이 가능합니다.",
            },
            {
                title: "학습과 개발 동시 진행",
                description:
                    "모르는 기술(GSAP, ScrollTrigger 등)도 AI가 설명하면서 구현. " +
                    "TechNote로 배운 내용을 기록해 복습할 수 있습니다.",
            },
        ],
        automations: [
            "페르소나 자동 선택",
            "설계 문서 자동 생성",
            "프로젝트 컨텍스트 누적",
            "섹션 완료 시 TechNote 자동 추가",
        ],
    },
    {
        id: "toy-dashboard",
        title: "업무관리 대시보드",
        description:
            "ERP 퍼블리싱 경험을 바탕으로, 퍼블리셔 → 프론트엔드 전환 학습 목적으로 제작한 React SPA입니다. " +
            "로그인·메인 대시보드·업무 CRUD·공지사항·사이트 설명 페이지를 포함하며, " +
            "pages / features / components 폴더 구조와 Zustand·React Router·커스텀 훅(useTasks)을 직접 설계했습니다. " +
            "Cursor를 활용해 구현을 가속했고, 설계 의도는 앱 내 「사이트 설명」 페이지와 docs에 문서화했습니다.",
        techStack: [
            "React",
            "TypeScript",
            "Vite",
            "React Router",
            "Zustand",
            "SCSS",
            "DummyJSON",
        ],
        aiTools: ["Cursor"],
        workflow: DEFAULT_WORKFLOW,
        automations: [
            "요구사항 정리 후 구현 요청",
            "기존 패턴 재사용 구현",
            "explainTabs / README 문서 초안",
            "배포 이슈 원인 분석 및 해결",
        ],
        implementationIntro:
            "퍼블리셔에서 프론트엔드로 전환하기 위해 공부하며 직접 설계·구현한 범위입니다. " +
            "아래 기능을 스스로 구조화하고 동작까지 완성할 수 있음을 보여주기 위한 목록입니다.",
        implementationAreas: [
            {
                title: "설계",
                description: "폴더 구조, 라우팅, 레이아웃, 상태 배치",
            },
            {
                title: "로그인",
                description: "mock 인증 + Zustand + localStorage",
            },
            {
                title: "업무",
                description: "CRUD + 탭/검색/페이지네이션 + 권한",
            },
            {
                title: "API",
                description: "DummyJSON 연동 + localStorage로 영속성 보완",
            },
            {
                title: "공통 UI",
                description: "List, Modal, Toast, DatePicker 등",
            },
            {
                title: "대시보드",
                description: "4위젯 메인 + 달력 연동",
            },
        ],
    },
];
