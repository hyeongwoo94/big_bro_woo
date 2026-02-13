/**
 * MatchCompany: "내가 원하는 회사인가?" 5문 O/X 퀴즈
 * 설계: docs/design/match-company-design.md
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  MATCH_COMPANY_QUESTIONS,
  MATCH_THRESHOLD,
  INTRO_TEXT,
  NO_MATCH_MESSAGE,
} from "../shared/content/matchCompanyQuestions";
import { getTechNoteContent } from "../shared/content/techNotes";
import { TechNote } from "../shared/ui/TechNote";
import "./styles/MatchCompany.css";

/** 문자열의 \n을 <br />로 변환해 React 노드로 반환 */
function textWithLineBreaks(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

type Phase = "intro" | "question" | "result";
type Answer = "yes" | "no";

const QUESTION_DELAY_MS = 500; // 질문 등장 후 버튼 노출까지 (50% 단축)
const RESULT_DELAY_MS = 400; // 5문 답변 후 결과 노출까지

export type MatchCompanyProps = {
  onResult?: (company: string, result: "match" | "fail", answers: Answer[]) => void;
  onMatch?: () => void;
};

function MatchCompany({ onResult, onMatch }: MatchCompanyProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [companyName, setCompanyName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showButtons, setShowButtons] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const resultButtonsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(0);

  const isMatch =
    answers.filter((a) => a === "yes").length >= MATCH_THRESHOLD;
  const currentQuestion = MATCH_COMPANY_QUESTIONS[questionIndex];

  // 인트로 페이드 인
  useEffect(() => {
    if (phase !== "intro" || !introRef.current) return;
    gsap.fromTo(
      introRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [phase]);

  const handleIntroSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const el = introRef.current;
      if (el) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setPhase("question");
            setQuestionIndex(0);
            setShowButtons(false);
          },
        });
      } else {
        setPhase("question");
        setQuestionIndex(0);
        setShowButtons(false);
      }
    },
    []
  );

  // 질문 첫 페인트 전에 숨김 처리(플래시 방지)
  useLayoutEffect(() => {
    if (phase !== "question" || !questionRef.current) return;
    gsap.set(questionRef.current, {
      scale: 0.85,
      opacity: 0,
      filter: "blur(8px)",
    });
  }, [phase, questionIndex]);

  // 질문 페이드 인(원근감) + 1초 후 버튼 슬라이드 업 (버튼 영역은 항상 레이아웃에 있음)
  useEffect(() => {
    if (phase !== "question" || !currentQuestion) return;
    const q = questionRef.current;
    const btns = buttonsRef.current;
    if (!q) return;

    gsap.to(q, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
    });

    if (btns) {
      gsap.set(btns, {
        y: 24,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });
    }

    const t = setTimeout(() => {
      setShowButtons(true);
      if (btns) {
        gsap.to(btns, {
          y: 0,
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    }, QUESTION_DELAY_MS);
    return () => clearTimeout(t);
  }, [phase, questionIndex]);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      const next = [...answers, answer];
      setAnswers(next);
      setShowButtons(false);

      if (questionIndex + 1 >= MATCH_COMPANY_QUESTIONS.length) {
        // 결과 단계로
        timerRef.current = setTimeout(() => {
          setPhase("result");
          const resultEl = resultRef.current;
          const resultBtns = resultButtonsRef.current;
          if (resultEl) {
            gsap.set(resultEl, { scale: 0.85, opacity: 0 });
            gsap.to(resultEl, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
          if (resultBtns) {
            gsap.set(resultBtns, { y: 24, opacity: 0 });
            gsap.to(resultBtns, {
              y: 0,
              opacity: 1,
              duration: 0.35,
              delay: 0.2,
              ease: "power2.out",
            });
          }
        }, RESULT_DELAY_MS);
        return;
      }

      // 다음 질문: 블러 포커스 전환
      const q = questionRef.current;
      if (q) {
        gsap.to(q, {
          filter: "blur(8px)",
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setQuestionIndex((i) => i + 1);
          },
        });
      } else {
        setQuestionIndex((i) => i + 1);
      }
    },
    [answers, questionIndex]
  );

  const handleMatchConfirm = useCallback(() => {
    onResult?.(companyName, "match", answers);
    onMatch?.();
  }, [companyName, answers, onResult, onMatch]);

  const handleNoMatchConfirm = useCallback(() => {
    onResult?.(companyName, "fail", answers);
    navigate("/thankyou");
  }, [companyName, answers, onResult, navigate]);

  return (
    <section className="match-company-sec" aria-label="우리 회사가 맞을까요?">
      {phase === "result" && isMatch && (
        <div
          style={{
            position: "absolute",
            top: "var(--spacing-lg)",
            right: "var(--spacing-lg)",
            zIndex: 10,
          }}
        >
          <TechNote {...getTechNoteContent("matchcompany")} />
        </div>
      )}
      <div className="_cont">
        {phase === "intro" && (
          <div ref={introRef} className="_intro" role="status">
            <p className="_intro-text">{textWithLineBreaks(INTRO_TEXT)}</p>
            <form className="_intro-form" onSubmit={handleIntroSubmit}>
              <input
                type="text"
                placeholder="회사명"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="_intro-input"
                aria-label="회사명"
                autoComplete="organization"
              />
              <button type="submit" className="_btn _btn--yes _intro-submit">
                시작하기
              </button>
            </form>
          </div>
        )}

        {phase === "question" && currentQuestion && (
          <>
            <div className="_progress" aria-live="polite">
              {questionIndex + 1} / {MATCH_COMPANY_QUESTIONS.length}
            </div>
            <div ref={questionRef} className="_question">
              <p className="_question-text">
                {textWithLineBreaks(currentQuestion.text)}
              </p>
            </div>
            <div
              ref={buttonsRef}
              className="_buttons"
              role="group"
              aria-label="답변 선택"
              aria-hidden={!showButtons}
              data-visible={showButtons}
            >
              <button
                type="button"
                className="_btn _btn--yes"
                onClick={() => handleAnswer("yes")}
              >
                {currentQuestion.yesLabel ?? "예"}
              </button>
              <button
                type="button"
                className="_btn _btn--no"
                onClick={() => handleAnswer("no")}
              >
                {currentQuestion.noLabel ?? "아니오"}
              </button>
            </div>
          </>
        )}

        {phase === "result" && (
          <>
            <div ref={resultRef} className="_result">
              <p className="_result-text">
                {textWithLineBreaks(
                  isMatch
                    ? "핵심 조건 매칭 완료 ✔\n귀사와 제가 좋은 시너지를 낼 거라는 확신이 들었습니다.\n준비된 제 역량을 구체적으로 검토해 주시겠습니까?"
                    : NO_MATCH_MESSAGE
                )}
              </p>
            </div>
            <div ref={resultButtonsRef} className="_result-buttons">
              {isMatch ? (
                <button
                  type="button"
                  className="_btn _btn--yes"
                  onClick={handleMatchConfirm}
                >
                  다음 보기
                </button>
              ) : (
                <button
                  type="button"
                  className="_btn _btn--no"
                  onClick={handleNoMatchConfirm}
                >
                  확인
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default MatchCompany;
