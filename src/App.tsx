import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Hero from "./sections/Hero";
import MatchCompany from "./sections/MatchCompany";
import ThankYou from "./pages/ThankYou";
import Toast from "./shared/ui/Toast";
import HeroModal from "./shared/ui/HeroModal";
import { TechNoteProvider } from "./shared/ui/TechNote";
import { QuickMenu } from "./shared/ui/QuickMenu";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [matchCompanyPassed, setMatchCompanyPassed] = useState(false);

  const handleQuizConfirm = (_name: string) => {
    setShowHero(false);
    setShowPortfolio(true);
  };

  const handleMatchCompanyPass = () => {
    setMatchCompanyPassed(true);
  };

  useEffect(() => {
    const isHeroCursor = showHero && location.pathname === "/";
    document.body.classList.toggle("hero-cursor-mode", isHeroCursor);
    return () => document.body.classList.remove("hero-cursor-mode");
  }, [showHero, location.pathname]);

  useEffect(() => {
    if (!matchCompanyPassed || !showPortfolio) return;
    const el = document.getElementById("portfolio-next");
    el?.scrollIntoView({ behavior: "smooth" });
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
      {location.pathname !== "/thankyou" && <QuickMenu />}
      <Routes>
        <Route
          path="/thankyou"
          element={<ThankYou />}
        />
        <Route
          path="/"
          element={
            <>
              {showHero && <Hero name="박형우" />}
              {showWelcomeToast && (
                <Toast
                  message="마우스를 움직여 이름을 찾아보세요"
                  duration={2000}
                  onClose={() => setShowWelcomeToast(false)}
                />
              )}
              {showHero && (
                <HeroModal
                  question="제 이름을 알고 계시나요?"
                  defaultName="박형우"
                  onConfirm={handleQuizConfirm}
                />
              )}
              {showPortfolio && (
                <main
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    overflow: matchCompanyPassed ? "visible" : "hidden",
                    height: matchCompanyPassed ? "auto" : "100vh",
                    minHeight: matchCompanyPassed ? "auto" : "100vh",
                  }}
                >
                  <MatchCompany onMatch={handleMatchCompanyPass} />
                  <section
                    id="portfolio-next"
                    aria-label="다음 섹션"
                    style={{
                      minHeight: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "var(--spacing-2xl)",
                    }}
                  >
                    <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-muted)" }}>
                      다음 섹션 (Projects 등)
                    </p>
                  </section>
                </main>
              )}
            </>
          }
        />
      </Routes>
    </TechNoteProvider>
  );
}

export default App;
