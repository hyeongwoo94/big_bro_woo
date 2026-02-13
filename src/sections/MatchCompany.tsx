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
import "./styles/MatchCompany.css";

type Phase = "intro" | "question" | "result";
type Answer = "yes" | "no";

const QUESTION_DELAY_MS = 500; // 질문 등장 후 버튼 노출까지 (50% 단축)
const RESULT_DELAY_MS = 400; // 5문 답변 후 결과 노출까지
const INTRO_DURATION_MS = 1250; // 인트로 표시 시간 후 Q1 (50% 단축)

export type MatchCompanyProps = {
  onMatch?: () => void;
};

function MatchCompany({ onMatch }: MatchCompanyProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
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

  // 인트로 페이드 아웃 후 Q1로 전환 (버벅임 방지)
  useEffect(() => {
    if (phase !== "intro") return;
    timerRef.current = setTimeout(() => {
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
    }, INTRO_DURATION_MS);
    return () => clearTimeout(timerRef.current);
  }, [phase]);

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
    onMatch?.();
  }, [onMatch]);

  const handleNoMatchConfirm = useCallback(() => {
    navigate("/thankyou");
  }, [navigate]);

  return (
    <section className="match-company-sec" aria-label="우리 회사가 맞을까요?">
      <div className="_cont">
        {phase === "intro" && (
          <div ref={introRef} className="_intro" role="status">
            <p className="_intro-text">{INTRO_TEXT}</p>
          </div>
        )}

        {phase === "question" && currentQuestion && (
          <>
            <div className="_progress" aria-live="polite">
              {questionIndex + 1} / {MATCH_COMPANY_QUESTIONS.length}
            </div>
            <div ref={questionRef} className="_question">
              <p className="_question-text">{currentQuestion.text}</p>
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
                {isMatch ? "우리 잘 맞을 것 같아요." : NO_MATCH_MESSAGE}
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
