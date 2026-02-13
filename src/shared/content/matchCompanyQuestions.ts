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
  { id: "q1", text: "워라밸을 중요시하나요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q2", text: "코드 리뷰 문화가 있나요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q3", text: "원격 근무·유연 근무를 지원하나요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q4", text: "성과보다 과정도 평가해 주시나요?", yesLabel: "예", noLabel: "아니오" },
  {
    id: "q5",
    text: "신입·주니어도 의견을 말할 수 있는 문화인가요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
];

export const MATCH_THRESHOLD = 3; // O >= 3 이면 매치

export const INTRO_TEXT = `솔직한 답변을 바탕으로,
귀사의 문화와 제 업무 방식이 시너지를 낼 수 있을지 확인하고자 합니다.
`;

export const NO_MATCH_MESSAGE =
  "솔직한 답변 감사합니다.";

export const NO_MATCH_FALLBACK_MESSAGE = `
지금은 서로의 지향점이 조금 다를 수 있지만, 
소중한 인연은 언제든 다시 이어지길 기대하겠습니다.
`;
