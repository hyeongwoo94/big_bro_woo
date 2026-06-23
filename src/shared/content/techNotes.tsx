/**
 * TechNote 모달에 들어가는 제목·내용을 한곳에서 관리.
 * 섹션별 기술 설명을 추가·수정할 때 이 파일만 보면 됨.
 * template은 모달에서 .tech-note-tpl-a / .tech-note-tpl-b 등 래퍼로 적용됨.
 */
import type { ReactNode } from "react";
import type { TechNoteTemplateId } from "../ui/TechNote";

export type TechNoteId = "hero" | "matchcompany" | "career" | "portfolio" | "aiexperience";

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
  career: {
    title: "Career 섹션 / 기술설명",
    template: "a",
    content: (
      <>
        <h3>활용한 것들</h3>
        <ul>
          <li>
            <strong>GSAP ScrollTrigger로 스크롤 애니메이션</strong> — 스크롤 위치에 따라 그래프 선이 그려지고 히스토리가 바뀝니다.
            <code>pin: true</code>로 섹션을 고정하고, <code>scrub: 1</code>로 스크롤과 애니메이션을 부드럽게 연동했습니다.
          </li>
          <li>
            <strong>SVG로 그래프 직접 그리기</strong> — Chart.js 같은 라이브러리 없이, <code>&lt;path&gt;</code>, <code>&lt;line&gt;</code>,
            <code>&lt;circle&gt;</code> 요소로 직접 꺾은선 그래프를 만들었습니다. 데이터가 바뀌면 좌표만 다시 계산하면 됩니다.
          </li>
          <li>
            <strong>strokeDasharray/strokeDashoffset으로 선 그리기</strong> — SVG에서 선을 "점선"으로 만든 뒤,
            점선 간격(offset)을 조절해 선이 그려지는 것처럼 보이게 했습니다. 스크롤 진행도(progress)에 따라 offset을 줄여 선이 나타납니다.
          </li>
          <li>
            <strong>CSS 변수로 색상 관리</strong> — <code>linearGradient</code>에서 <code>var(--color-accent)</code> 같은 CSS 변수를 사용해,
            테마 색상이 바뀌면 그래프 색상도 자동으로 바뀝니다.
          </li>
        </ul>

        <p className="tech-note-muted">
          <strong>ScrollTrigger</strong>: GSAP 플러그인. 스크롤 위치를 트리거로 애니메이션을 실행하거나, 스크롤과 애니메이션을 동기화(scrub)할 수 있습니다.
          <br />
          <strong>strokeDasharray/strokeDashoffset</strong>: SVG 선의 점선 패턴과 시작 위치를 지정. offset을 전체 길이로 두면 선이 안 보이고, 0으로 줄이면 선이 다 보입니다.
        </p>

        <h3>반응형 처리</h3>
        <p>
          <code>matchMedia(&quot;(max-width: 768px)&quot;)</code>로 모바일 여부를 감지합니다.
          모바일에서는 그래프를 숨기고 히스토리만 표시하며, 스크롤에 따라 텍스트가 fade in/out 됩니다.
          <code>isMobile</code> state가 바뀌면 ScrollTrigger를 다시 설정해 브라우저 리사이즈에도 대응합니다.
        </p>
      </>
    ),
  },
  portfolio: {
    title: "Portfolio 섹션 / 기술설명",
    template: "a",
    content: (
      <>
        <h3>활용한 것들</h3>
        <ul>
          <li>
            <strong>CSS @keyframes로 궤도 회전</strong> — JavaScript 없이 순수 CSS로 위성들이 중심을 기준으로 회전합니다.
            안쪽/바깥 궤도가 서로 다른 속도와 방향으로 돌아, 역동적인 느낌을 줍니다.
          </li>
          <li>
            <strong>CSS 변수(--angle)로 위성 위치 계산</strong> — 각 위성에 <code>--angle</code> 변수를 주고,
            <code>transform: rotate(var(--angle)) translateX(반지름)</code>으로 원형 배치합니다.
            JS에서 각도만 계산해 style로 넘기면 CSS가 나머지를 처리합니다.
          </li>
          <li>
            <strong>역회전(counter-rotate)으로 아이콘 정방향 유지</strong> — 부모가 회전하면 자식도 같이 돌아가는데,
            자식에게 반대 방향 회전을 걸어 썸네일이 항상 정방향을 유지하도록 했습니다.
          </li>
          <li>
            <strong>pointer-events로 클릭 영역 제어</strong> — 궤도 컨테이너는 <code>pointer-events: none</code>,
            위성만 <code>pointer-events: auto</code>로 설정해 컨테이너가 클릭을 가리지 않도록 했습니다.
          </li>
          <li>
            <strong>animation-play-state로 호버 시 정지</strong> — <code>:hover</code> 시 부모와 자식 모두
            <code>animation-play-state: paused</code>를 걸어 회전을 멈추고, 해당 항목을 강조합니다.
          </li>
        </ul>

        <p className="tech-note-muted">
          <strong>transform 체이닝</strong>: <code>rotate() → translateX() → rotate()</code> 순서가 중요합니다.
          먼저 각도만큼 회전 → 반지름만큼 이동 → 다시 역회전하면 원형 궤도 위에 정방향 아이콘이 배치됩니다.
          <br />
          <strong>pointer-events</strong>: 요소가 마우스 이벤트를 받을지 결정. none이면 클릭이 아래로 "투과"됩니다.
        </p>

        <h3>시각 효과</h3>
        <p>
          궤도와 위성에 <code>box-shadow</code>로 glow 효과를 주고, <code>::before/::after</code> 가상 요소로
          프로필 주변의 회전 링을 만들었습니다. 별(✦)은 <code>@keyframes star-twinkle</code>로 반짝이는 효과를 줍니다.
        </p>
      </>
    ),
  },
  aiexperience: {
    title: "AI 경험 섹션 / 기술설명",
    template: "a",
    content: (
      <>
        <h3>활용한 것들</h3>
        <ul>
          <li>
            <strong>탭 UI 패턴</strong> — 여러 프로젝트를 탭으로 분리해 한 화면에서 전환합니다.
            <code>useState</code>로 현재 선택된 탭 인덱스를 관리하고, 해당 프로젝트 데이터만 렌더링합니다.
          </li>
          <li>
            <strong>컴포넌트 분리</strong> — <code>ProjectDetail</code>과 <code>WorkflowVisualization</code>을
            별도 컴포넌트로 분리해 관심사를 나눴습니다. 재사용성과 가독성이 높아집니다.
          </li>
          <li>
            <strong>데이터 기반 렌더링</strong> — 프로젝트 정보와 워크플로우 단계를 배열 데이터로 관리합니다.
            <code>.map()</code>으로 순회하며 UI를 생성하므로, 새 프로젝트 추가 시 데이터만 추가하면 됩니다.
          </li>
          <li>
            <strong>동적 스타일링</strong> — 워크플로우 노드에 역할별 색상을 <code>style</code> prop으로 전달합니다.
            CSS 변수 대신 JS 객체(<code>WORKFLOW_COLORS</code>)로 색상을 관리해 유연성을 높였습니다.
          </li>
        </ul>

        <p className="tech-note-muted">
          <strong>컴포넌트 분리 기준</strong>: "이 부분이 독립적으로 의미가 있나?", "재사용될 수 있나?"를 기준으로 분리합니다.
          너무 잘게 쪼개면 오히려 복잡해지므로, 적절한 크기를 유지하는 게 중요합니다.
        </p>

        <h3>반응형 처리</h3>
        <p>
          워크플로우 차트는 PC에서 가로, Mobile에서 세로로 표시됩니다.
          <code>isMobile</code> prop을 받아 <code>ai-exp-sec_workflow-chart--vertical</code> 클래스를 조건부 적용합니다.
          CSS에서 <code>flex-direction</code>을 바꿔 레이아웃을 전환합니다.
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
