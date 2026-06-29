import { Link } from "react-router-dom";
import "./styles/NotFound.css";

export default function NotFound() {
    return (
        <section className="not-found-sec" aria-label="페이지를 찾을 수 없음">
            <div className="not-found-sec_cont">
                <p className="not-found-sec_code">404</p>
                <h1 className="not-found-sec_title">페이지를 찾을 수 없습니다</h1>
                <p className="not-found-sec_desc">
                    요청하신 주소가 존재하지 않거나 이동되었을 수 있습니다.
                </p>
                <Link to="/" className="not-found-sec_link">
                    포트폴리오 홈으로
                </Link>
            </div>
        </section>
    );
}
