/**
 * TechNote 모달에 들어가는 제목·내용을 한곳에서 관리.
 * 섹션별 기술 설명을 추가·수정할 때 이 파일만 보면 됨.
 * template은 모달에서 .tech-note-tpl-a / .tech-note-tpl-b 등 래퍼로 적용됨.
 */
import type { ReactNode } from "react";
import type { TechNoteTemplateId } from "../ui/TechNote";

export type TechNoteId = "hero" | "matchcompany";

export type TechNoteEntry = {
  title: string;
  content: ReactNode;
  template?: TechNoteTemplateId;
};

const TECH_NOTE_CONTENT: Record<TechNoteId, TechNoteEntry> = {
  hero: {
    title: "Hero 섹션 / 기술설명 모달 컴포넌트",
    template: "a",
    content: (
      <>
        <p>
          이 포트폴리오는 바이브코딩(AI와 협업)으로 제작 중이며, 구현에서 그치지 않고
          학습한 내용까지 기록해 두려고 합니다. 이 섹션에서 쓴 기술과 이유를 정리했습니다.
        </p>
        <h3>활용한 것들</h3>
        <ul>
          <li>
            <strong>SVG mask + objectBoundingBox 좌표계</strong>를 활용해, 마우스 궤적에
            원형 브러시가 쌓이고 그 영역의 단어만 드러나는 찾기 효과를 만들었습니다.
          </li>
          <li>
            <strong>컨텐츠 영역(ref) 기준 좌표</strong>를 쓰면 maxWidth 등 레이아웃과
            브러시 위치가 일치한다는 걸 배워, section 전체가 아니라 contentRef 기준으로
            정규화하도록 바꿨습니다.
          </li>
          <li>
            <strong>requestAnimationFrame</strong>으로 커서·트레일을 갱신해 리렌더 없이
            부드럽게 움직이도록 했습니다.
          </li>
        </ul>

        <p className="tech-note-muted">
          <strong>objectBoundingBox</strong>: SVG에서 좌표를 요소의 "경계 상자" 대비 0~1 비율로 쓰는 단위. 픽셀이 아니라 비율이라서, 영역 크기가 바뀌어도 같은 mask가 비율대로 적용됩니다.
          <br />
          <strong>requestAnimationFrame</strong>: 브라우저가 "다음 프레임을 그리기 직전"에 콜백을 실행해 달라고 예약하는 API. 여기서 커서·트레일 위치를 갱신해서, 화면 주사율에 맞춰 끊김 없이 움직이도록 했습니다.
        </p>

        <h3>기술설명 모달 사용법</h3>
        <p>
          이 기술 설명 버튼과 모달은 <code>TechNote</code>로 구현되어 있습니다.
        </p>
        <p>
          <strong>왜 Provider로 감싸야 하나요?</strong><br />
          모달은 화면에 하나만 있어야 하고, 어떤 버튼을 눌렀는지에 따라 제목·내용만 바뀌어야 합니다.
          <br />
          <code>TechNoteProvider</code>가 그 "열린 모달 하나"의 상태와 내용을 한 곳에서 관리하고, 모달 UI도 여기서 한 번만 렌더링합니다. <br />
          그래서 Provider 밖에 있는 <code>TechNote</code> 버튼들이 context로 "지금 이 제목/내용으로 열어줘"라고만 알려 주면 됩니다.<br /> 
          따라서 TechNote를 쓰는 영역(예: App 전체)을 반드시 <code>TechNoteProvider</code>로 감싸야 합니다.
        </p>
        <p>사용 방법:</p>
        <ul>
          <li>App(또는 TechNote를 쓰는 상위)을 <code>TechNoteProvider</code>로 감싼 뒤,</li>
          <li>섹션 안에 <code>&lt;TechNote title=&quot;...&quot; content=&#123;...&#125; /&gt;</code>를 넣으면 됩니다.</li>
          <li>파일: <code>src/shared/ui/TechNote.tsx</code>. 768px 이하에서는 버튼과 모달이 비표시됩니다.</li>
        </ul>
      </>
    ),
  },
  matchcompany: {
    title: "MatchCompany 섹션 / 기술설명",
    template: "a",
    content: (
      <>
        <h3>활용한 것들</h3>
        <ul>
          <li>
            <strong>React state(useState)로 단계 나누기</strong> — "지금 인트로인가, 질문인가, 결과인가"를
            <code>phase</code> 같은 state 하나로 표현했습니다.<br /> 퍼블에서는 페이지마다 다른 HTML을 만들었다면,
            프론트에서는 한 컴포넌트 안에서 state 값에 따라 보여줄 내용만 바꾸면 됩니다.
          </li>
          <li>
            <strong>useLayoutEffect로 첫 프레임 제어</strong> — 질문이 막 나타날 때 "한 프레임만큼 노출되었다가 사라지는" 깜빡임을 막기 위해,
            화면을 그리기 전에 실행되는 <code>useLayoutEffect</code>에서 질문을 먼저 숨겨 두고, 그다음 <code>useEffect</code>에서 GSAP로 등장시켰습니다.
          </li>
          <li>
            <strong>React Router + history API</strong> — 미매치 시 "확인"을 누르면 <code>/thankyou</code> 페이지로 이동합니다.
            React Router는 "URL에 따라 어떤 컴포넌트를 보여줄지" 정해 주는 라이브러리입니다.<br />  thankyou에서 뒤로가기를 막을 때는
            <code>history.pushState</code>로 같은 URL을 히스토리에 다시 쌓아, 뒤로가기를 눌러도 같은 페이지에 머물게 했습니다.
          </li>
        </ul>

        <p className="tech-note-muted">
          <strong>useState</strong>: 컴포넌트가 "기억해야 하는 값"을 두는 훅. 값이 바뀌면 해당 컴포넌트가 다시 그려지고, 그에 맞는 UI가 나옵니다.
          <br />
          <strong>useLayoutEffect</strong>: 브라우저가 화면을 "페인트"하기 직전에 실행됩니다. DOM은 이미 반영된 상태이므로, 여기서 스타일을 바꾸면 사용자에게 깜빡임 없이 보입니다.
        </p>

        <h3>기술설명 버튼 노출 시점</h3>
        <p>
          구현: <code>MatchCompany.tsx</code>에서 <code>phase === &quot;result&quot; &amp;&amp; isMatch</code>일 때만
          <code>TechNote</code>를 감싼 div를 렌더합니다.<br /> JSX에서 <code>&#123;조건 &amp;&amp; &lt;컴포넌트 /&gt;&#125;</code>처럼
          조건이 참일 때만 해당 요소가 그려지므로, 같은 state(<code>phase</code>, <code>isMatch</code>)로 "누구에게 무엇을 보여줄지"를 한 곳에서 제어할 수 있습니다.
        </p>
      </>
    ),
  },
};

/** 섹션 id로 TechNote 제목·내용 조회. 새 섹션 추가 시 TechNoteId와 TECH_NOTE_CONTENT에만 추가하면 됨. */
export function getTechNoteContent(id: TechNoteId): TechNoteEntry {
  const entry = TECH_NOTE_CONTENT[id];
  if (!entry) throw new Error(`Unknown TechNote id: ${id}`);
  return entry;
}
