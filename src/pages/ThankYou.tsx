/**
 * thankyou 페이지 — 미매치 시 확인 후 이동
 * NO_MATCH_FALLBACK_MESSAGE만 표시, 버튼 없음. 스타일은 MatchCompany와 동일.
 */
import { NO_MATCH_FALLBACK_MESSAGE } from "../shared/content/matchCompanyQuestions";
import "../sections/styles/MatchCompany.css";

function ThankYou() {
  return (
    <section className="match-company-sec" aria-label="감사합니다">
      <div className="_cont">
        <div className="_result">
          <p className="_result-text">{NO_MATCH_FALLBACK_MESSAGE}</p>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
