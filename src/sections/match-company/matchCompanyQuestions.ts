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
        text: "귀사는 사람을 가장 중요한 자산이라고 생각하나요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
    {
        id: "q2",
        text: "'원래 이렇게 해왔어'보다 합리적인 방법을 선택하는 조직인가요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
    {
        id: "q3",
        text: "팀원 간 존중과 협업을 중요하게 생각하나요?",
        yesLabel: "예",
        noLabel: "아니오",
    },
];

export const MATCH_THRESHOLD = 2; // O >= 2 이면 매치 (3문 중)

export const INTRO_TEXT = `솔직한 답변을 바탕으로,
귀사의 문화와 제 업무 방식이 시너지를 낼 수 있을지 확인하고자 합니다.
`;

export const NO_MATCH_MESSAGE = "솔직한 답변 감사합니다.";

export const NO_MATCH_FALLBACK_MESSAGE = `
지금은 서로의 지향점이 조금 다를 수 있지만, 
소중한 인연은 언제든 다시 이어지길 기대하겠습니다.
`;
