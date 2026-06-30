import {
    CLOSING_PARAGRAPHS,
    CLOSING_THANKS_HIGHLIGHT,
    CLOSING_THANKS_PREFIX,
} from "../shared/content/closingData";
import "./styles/Closing.css";

export default function Closing() {
    return (
        <section className="closing-sec" aria-label="마무리 인사">
            <div className="closing-sec_cont">
                <div className="closing-sec_body">
                    {CLOSING_PARAGRAPHS.map((text) => (
                        <p key={text.slice(0, 12)} className="closing-sec_text">
                            {text}
                        </p>
                    ))}
                    <p className="closing-sec_text closing-sec_text--thanks">
                        {CLOSING_THANKS_PREFIX}
                        <span className="closing-sec_highlight">
                            {CLOSING_THANKS_HIGHLIGHT}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}
