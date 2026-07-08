/**
 * MatchCompany 섹션 질문 데이터
 * @see docs/design/match-company-design.md
 */

export type MatchQuestion = {
    id: string;
    text: string;
    yesLabel?: string;
    noLabel?: string;
};

export const MATCH_COMPANY_QUESTIONS: MatchQuestion[] = [
    {
        id: "q1",
        text: "팀원이 자유롭게 질문하고 의견을 낼 수 있는 문화를 지향하나요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
    {
        id: "q2",
        text: "최근 1년 안에 팀원의 제안으로 업무 방식이 바뀐 적이 있나요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
    {
        id: "q3",
        text: "업무를 지시할 때 '왜 하는지'에 대한 이유와 목적을 함께 설명하는 문화인가요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
];

export const MATCH_THRESHOLD = 2; // O >= 2 이면 매치 (3문 중)

export const INTRO_TEXT = `저는 단순히 입사만을 목표로 하지 않습니다.
오랫동안 함께 성장할 수 있는 회사를 찾고 있습니다.
서로의 시간과 노력을 아끼기 위해, 먼저 서로가 잘 맞는지 확인해 보았으면 합니다.`;

export const NO_MATCH_MESSAGE = "솔직한 답변 감사합니다.";

export const NO_MATCH_FALLBACK_MESSAGE = `
지금은 서로의 지향점이 조금 다를 수 있지만, 
소중한 인연은 언제든 다시 이어지길 기대하겠습니다.
`;
