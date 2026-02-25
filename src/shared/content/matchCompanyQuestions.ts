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
    text: "귀사에서 일하는 것이 행복한가요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
  {
    id: "q2",
    text: "성과를 내면 그에 따른 인정이 분명히 이루어지는 문화인가요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
  {
    id: "q3",
    text: "직급/나이에 상관없이 상호 존중하는 분위기 인가요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
  {
    id: "q4",
    text: "저는 솔직하게 '아닌 건 아니다'라고 말하는 편인데,\n 팀에서 이런 성향을 건강하게 받아들이는 문화를 가지고 있나요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
  {
    id: "q5",
    text: "빠른 화면 구현과 실행력을 강점으로 하는 프론트엔드를 찾고 계신가요?",
    yesLabel: "예",
    noLabel: "아니오",
  },
];

export const MATCH_THRESHOLD = 3; // O >= 3 이면 매치

export const INTRO_TEXT = `솔직한 답변을 바탕으로,
귀사의 문화와 제 업무 방식이 시너지를 낼 수 있을지 확인하고자 합니다.
`;

export const NO_MATCH_MESSAGE = "솔직한 답변 감사합니다.";

export const NO_MATCH_FALLBACK_MESSAGE = `
지금은 서로의 지향점이 조금 다를 수 있지만, 
소중한 인연은 언제든 다시 이어지길 기대하겠습니다.
`;
