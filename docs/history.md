# 포트폴리오 홈페이지 제작 - History 명세서

나중에 "AI를 어떻게 이용해서 홈페이지를 만들었는지" 추적하기 위한 문서다.

---

## 1. 프로젝트 배경

| 항목 | 내용 |
|------|------|
| **목적** | 퍼블리셔 → 프론트엔드 전향을 위한 포트폴리오 제작 |
| **대상** | 채용 담당자, 이직 시 포트폴리오로 활용 |
| **프로젝트 유형** | 웹앱 (포트폴리오 사이트) |

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React |
| 언어 | TypeScript |
| 애니메이션 | GSAP |
| 기타 | Storybook, Vitest, Playwright (UI 검증·테스트) |

---

## 3. 제작 과정 기록

아래에 AI와의 협업 과정을 순서대로 기록한다.

### 3.1 킥오프

| 일시 | 단계 | 내용 |
|------|------|------|
| 2026-02-11 | 총괄/기획 | 포트폴리오 프로젝트 시작, 목적·스택 확정 (퍼블리셔→프론트엔드 전향용) |

### 3.2 기획

| 일시 | 단계 | 내용 |
|------|------|------|
| 2026-02-11 | 기획일꾼 | 개발 방식·폴더 구조·UI 워크플로우 확정: FDD, 응집도 높은 feature 구조, Storybook으로 UI 먼저 제작 후 통합(C안) |

### 3.3 구현

| 일시 | 단계 | 내용 |
|------|------|------|
| 2026-02-11 | 코드일꾼 | 프로젝트 초기 셋업: Vite + React + TypeScript + GSAP 설치, 기본 보일러플레이트 구성 |
| 2026-02-11 | 코드일꾼 | 개발 컨벤션 확정 및 Storybook 설치 (a11y, vitest addon 포함), 앱 전역 스타일 연동 |
| 2026-02-11 | 코드일꾼 | 자동 커밋 스크립트 구현 (history 기반) |
| 2026-02-11 | 코드일꾼 | 디자인 토큰 확정 (라이트/다크, primary·accent·accent-warm, DesignTokenPreview) |
| 2026-02-11 | 코드일꾼 | Hero 섹션 구현 완료: 커서 트레일·찾기 컨셉, 컨텐츠 영역 기준 브러시/커서 좌표, HeroModal(3초 후 하단 슬라이드업·퀴즈), Toast(보더+그림자 스타일), 확인 시 포트폴리오 본문 전환 |
| 2026-02-11 | 코드일꾼 | TechNote(섹션별 기술 설명 버튼+모달) 설계·구현, SectionExplanation→TechNote 리네이밍, Hero 설명 보강(Provider 이유·용어), 모달 중앙 정렬·README·tsconfig 수정 |
| 2026-02-11 | 코드일꾼 | CSS 구조 정리: 섹션 전용 styles는 sections/styles/, shared/ui 전용은 shared/styles/에서 index.css import, common.css(글씨·보더·배경 등 유틸) 추가, design-tokens에 shadow·포커스 링 활용, 포커스 링 전역 적용(button/a/tabindex: focus-visible 시 outline) |
| 2026-02-11 | 코드일꾼 | TechNote 본문 템플릿(tech-note-tpl-a) 도입, 기술설명 콘텐츠 중앙 관리(shared/content/techNotes.tsx, getTechNoteContent), 다크모드·퀵메뉴: 다크모드 버튼(DarkModeToggle) 추가 후 QuickMenu로 통합(PC 오른쪽 하단 원형 "클릭"→4개 메뉴 펼침, 모바일 하단 플로팅 4개 고정, 다크모드+예시 링크 3) |
| 2026-02-11 | 코드일꾼 | Hero 모달 다크모드 대응(design-tokens --shadow-modal·--color-modal-edge), 모바일 HeroModal 위치 조정(HeroModal.css, 플로팅 메뉴 위로), Hero 커서: 퀵메뉴/모달 위에서도 표시(전역 mousemove·body.hero-cursor-mode), 커서 z-index 10010·색상 --color-accent |
| 2026-02-11 | 코드일꾼 | 전역 스크롤바 커스터마이징(common.css): 디자인 토큰(--color-border thumb, --color-accent hover) 사용, 라이트/다크 모드 자동 대응, Firefox scrollbar-width/scrollbar-color, Chrome/Safari/Edge ::-webkit-scrollbar 스타일, 화살표 버튼 제거 |
| 2026-02-13 | 코드일꾼 | docs 설계 문서 docs/design/로 이전, 참조 경로·conventions·decisions 반영 |
| 2026-02-13 | 코드일꾼 | MatchCompany 섹션 설계(docs/design/match-company-design.md) 및 구현: 5문 O/X 퀴즈, 인트로 "솔직하게 대답해주세요", 진행 표시, 원근감·블러 전환, O/X 시각적 구분, 매치(O≥3) 시 다음 섹션·미매치 시 /thankyou 이동 |
| 2026-02-13 | 코드일꾼 | react-router-dom 도입, /thankyou 페이지(ThankYou: NO_MATCH_FALLBACK_MESSAGE만·버튼 없음), thankyou에서 QuickMenu 숨김·뒤로가기 방지(pushState), /thankyou 새로고침 시 커서 표시(hero-cursor-mode는 pathname "/"일 때만 적용) |
| 2026-02-13 | 코드일꾼 | MatchCompany 인트로·질문 후 버튼 딜레이 50% 단축, 버튼 영역 레이아웃 미리 확보·퀴즈 통과 전 스크롤 잠금, conventions에 요구사항 대응 순서(설명·옵션 제시 후 확인하고 구현) 추가 |
| 2026-02-13 | 코드일꾼 | Storybook 스토리 정리: Toast·TechNote·CommonUtilities·ButtonOX·DesignTokenPreview 스토리 작성, 스토리 파일을 src/stories/로 통합·main.ts 경로 변경, 빌드 시 dist/storybook 포함(base /storybook/), 퀵메뉴에 스토리북 링크(/storybook/), README에 스토리북(개발 vs 배포·build:with-storybook) 안내, App.tsx 미사용 navigate 제거 |
| 2026-02-13 | 코드일꾼 | 퀴즈 결과 시트 연동: Google Sheets + Apps Script(doPost), Vercel API(api/submit-quiz-result) 프록시, MatchCompany 인트로에 회사명 입력(선택)·자동 진행 제거·엔터/시작하기로만 질문 단계 진입, 결과 시 (회사명, 매칭/실패) 전송, docs/design/quiz-result-sheet-setup.md 설정 가이드, vercel.json(buildCommand: build:with-storybook) |
| 2026-02-13 | 코드일꾼 | QuickMenu 다크/라이트 아이콘 가운데 정렬(quick-menu__item--icon-only), MatchCompany 인트로 폼 가운데 정렬(._intro-form margin auto) |
| 2026-02-13 | 코드일꾼 | 퀴즈 결과 시트에 질문 1~5 답변(O/X) 저장: onResult에 answers 전달, API·Apps Script·시트 헤더 Q1~Q5 추가, quiz-result-sheet-setup.md 갱신 |

### 3.4 검토

| 일시 | 단계 | 내용 |
|------|------|------|
| | 검토일꾼 | (검토 결과, 수정 사항) |

### 3.5 주요 결정

| 일시 | 결정 | 이유 |
|------|------|------|
| 2026-02-11 | FDD + feature 기반 폴더 구조 | 기능 단위로 응집도 높게 관리, 포트폴리오 섹션(Hero/About 등)이 자연스럽게 feature로 매핑 |
| 2026-02-11 | UI는 Storybook 먼저, 검증 후 통합(C안) | 퍼블 작업을 독립적으로 검증할 수 있고, 통합 시 디버깅이 수월함 |
| 2026-02-13 | MatchCompany 섹션명·매치 기준(O≥3)·미매치 시 /thankyou 페이지 분리 | 상호 선택 톤, thankyou에서 fallback 메시지만 노출·버튼 없음 |
| 2026-02-13 | 요구사항 대응 시 설명·옵션 제시 후 확인하고 구현(conventions) | 바로 구현하지 않고 논의·선택 후 진행하도록 유지 |
| 2026-02-13 | 퀴즈 결과(회사명·매칭/실패) Google Sheets + Apps Script로 저장, 인트로에서 회사명 입력(선택)·엔터/시작하기로 진행 | 서버 없이 시트로 회사별 결과 확인, 면접관이 직접 회사명 입력 |

---

## 4. AI 활용 요약 (제작 완료 후 작성)

- **시작한 날**: 
- **완료한 날**: 
- **주요 대화/요청**: (대표적인 요청 몇 가지)
- **역할별 활용**: 총괄 몇 번, 기획 몇 번, 코드 몇 번, 검토 몇 번 등
- **배운 점**: (이 프로젝트에서 얻은 인사이트)

---

## 5. 참고

- 이 문서는 `.cursor/memory/`와 별도로, **프로젝트 전체 흐름**을 사람이 읽기 쉽게 정리한 것이다.
- 세부 결정·컨벤션은 `.cursor/memory/decisions.md`, `conventions.md`에 축적된다.
