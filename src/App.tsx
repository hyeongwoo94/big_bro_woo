import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./sections/Hero";
import MatchCompany from "./sections/MatchCompany";
import Career from "./sections/Career";
import Portfolio from "./sections/Portfolio";
import AIExperience from "./sections/AIExperience";
import AboutMe from "./sections/AboutMe";
import Contact from "./sections/Contact";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Toast from "./shared/ui/Toast";
import HeroModal from "./shared/ui/HeroModal";
import { TechNoteProvider } from "./shared/ui/TechNote";
import { QuickMenu } from "./shared/ui/QuickMenu";
import { getIntroProgress, setIntroProgress } from "./shared/utils/introProgress";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOAST_MESSAGE_PC = "마우스를 움직여 이름을 찾아보세요";
const TOAST_MESSAGE_MOBILE = "제 이름을 찾아보세요";

const savedIntro = getIntroProgress();

function App() {
    const location = useLocation();
    const [showWelcomeToast, setShowWelcomeToast] = useState(
        savedIntro === "none",
    );
    const [showHero, setShowHero] = useState(savedIntro === "none");
    const [showPortfolio, setShowPortfolio] = useState(savedIntro !== "none");
    const [matchCompanyPassed, setMatchCompanyPassed] = useState(
        savedIntro === "complete",
    );
    const [isMobile, setIsMobile] = useState(false);
    const skipInitialScrollRef = useRef(savedIntro === "complete");

    const handleQuizConfirm = (_name: string) => {
        setShowHero(false);
        setShowPortfolio(true);
        setShowWelcomeToast(false);
        setIntroProgress("hero");
    };

    const handleMatchCompanyPass = () => {
        setMatchCompanyPassed(true);
        setIntroProgress("complete");
    };

    const submitQuizResult = async (
        company: string,
        result: "match" | "fail",
        answers: ("yes" | "no")[],
    ) => {
        try {
            await fetch("/api/submit-quiz-result", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    company: company || "미입력",
                    result,
                    answers: answers.slice(0, 3),
                }),
            });
        } catch (_) {
            // 전송 실패 시 무시 (오프라인 등)
        }
    };

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const isHeroCursor = showHero && location.pathname === "/";
        document.body.classList.toggle("hero-cursor-mode", isHeroCursor);
        return () => document.body.classList.remove("hero-cursor-mode");
    }, [showHero, location.pathname]);

    useEffect(() => {
        if (!matchCompanyPassed || !showPortfolio) return;
        if (skipInitialScrollRef.current) {
            skipInitialScrollRef.current = false;
            return;
        }
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.getElementById("portfolio-next")?.scrollIntoView({
                    behavior: "smooth",
                });
                ScrollTrigger.refresh();
            });
        });
    }, [matchCompanyPassed, showPortfolio]);

    useEffect(() => {
        if (location.pathname !== "/thankyou") return;
        window.history.pushState(null, "", "/thankyou");
        const handlePopState = () => {
            window.history.pushState(null, "", "/thankyou");
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [location.pathname]);

    return (
        <TechNoteProvider>
            {location.pathname === "/" && <QuickMenu />}
            <Routes>
                <Route path="/thankyou" element={<ThankYou />} />
                <Route
                    path="/"
                    element={
                        <>
                            {showHero && <Hero name="박형우" />}
                            {showWelcomeToast && (
                                <Toast
                                    message={
                                        isMobile
                                            ? TOAST_MESSAGE_MOBILE
                                            : TOAST_MESSAGE_PC
                                    }
                                    duration={0}
                                />
                            )}
                            {showHero && (
                                <HeroModal
                                    question="제 이름을 작성해주세요"
                                    defaultName="박형우"
                                    onConfirm={handleQuizConfirm}
                                />
                            )}
                            {showPortfolio && (
                                <main
                                    className="app-main"
                                    style={{
                                        backgroundColor: "var(--color-bg)",
                                        color: "var(--color-text)",
                                    }}
                                >
                                    {!matchCompanyPassed && (
                                        <MatchCompany
                                            onResult={submitQuizResult}
                                            onMatch={handleMatchCompanyPass}
                                        />
                                    )}
                                    {matchCompanyPassed && (
                                        <div id="portfolio-next">
                                            <AboutMe />
                                            <Career />
                                            <Portfolio />
                                            <AIExperience />
                                            <Contact />
                                        </div>
                                    )}
                                </main>
                            )}
                        </>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </TechNoteProvider>
    );
}

export default App;
