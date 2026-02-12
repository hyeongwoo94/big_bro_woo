import { useState } from "react";
import Hero from "./sections/Hero";
import Toast from "./shared/ui/Toast";
import HeroModal from "./shared/ui/HeroModal";

function App() {
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleQuizConfirm = (_name: string) => {
    setShowHero(false);
    setShowPortfolio(true);
    // 여기에 포트폴리오 컨텐츠를 추가하면 됩니다
  };

  return (
    <>
      {showHero && <Hero name="김개발" />}
      {showWelcomeToast && (
        <Toast
          message="화면을 긁어주세요"
          duration={4500}
          onClose={() => setShowWelcomeToast(false)}
        />
      )}
      {showHero && (
        <HeroModal
          question="이 홈페이지를 제작한 사람은?"
          defaultName="김개발"
          onConfirm={handleQuizConfirm}
        />
      )}
      {showPortfolio && (
        <div
          style={{
            minHeight: "100vh",
            padding: "2rem",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        >
          <h1>포트폴리오가 시작됩니다</h1>
          {/* 여기에 포트폴리오 컨텐츠를 추가하세요 */}
        </div>
      )}
    </>
  );
}

export default App;
