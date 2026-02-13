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
  { id: "q1", text: "사수가 있나요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q2", text: "저는 배우는 능력이 강하고 팀에 기여할 수 있는 사람입니다.\n 이런 팀원이 필요하신가요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q3", text: "직급/나이에 상관없이 상호 존중하는 분위기 인가요?", yesLabel: "예", noLabel: "아니오" },
  { id: "q4", text: "저는 솔직하게 '아닌 건 아니다'라고 말하는 편인데,\n 팀에서 이런 성향을 건강하게 받아들이는 문화를 가지고 있나요?", yesLabel: "예", noLabel: "아니오" },
  {
    id: "q5",
    text: "제 포트폴리오가 참신하다고 생각하시나요?",
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
