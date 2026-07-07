# 결정 기록

<!-- 중요 결정이 있을 때마다 아래 형식으로 추가한다. 나중에 "왜 이렇게 했지?" 할 때 참고한다. -->

## 형식

```markdown
### [날짜] 결정 제목
- **결정**: 
- **이유**: 
- **대안**: (검토했던 다른 옵션)
```

---

## 기록

### 2026-02-11 개발 방식 및 UI 워크플로우

- **결정**: FDD, feature 기반 폴더 구조, Storybook으로 UI 먼저 제작 후 통합(C안)
- **이유**: 기능별 응집도 유지, 퍼블 작업을 독립적으로 검증 가능
- **대안**: A안(스마트/덤 분리), B안(atoms 공통 UI 먼저)

### 2026-02-11 Hero 섹션·연동 UI

- **결정**: 히어로 전용 모달은 HeroModal로 명명, 3초 후 하단 슬라이드 업, 배경 어둡게 없음. Toast는 배경 없이 보더+그림자+accent 텍스트.
- **이유**: 히어로에서만 쓰는 모달이라 네이밍 통일; 시인성·분위기 유지
- **대안**: 전역 모달/다크 오버레이 유지

### 2026-02-11 섹션 기술 설명 UI (TechNote)

- **결정**: 섹션별 "기술 설명" 버튼+모달을 TechNote / TechNoteProvider로 명명, SectionExplanation에서 리네이밍.
- **이유**: "기술 설명"에 대응하는 직관적인 이름으로 통일.
- **대안**: SectionExplanation 유지

### 2026-02-13 docs 설계 문서 폴더 구조

- **결정**: 설계 문서를 `docs/design/` 폴더로 이전 (auto-commit-design, hero-design, section-explanation-design)
- **이유**: docs 루트 정리, 설계 vs 히스토리(history.md) 역할 분리
- **대안**: docs 루트에 그대로 유지

### 2026-07-07 섹션 폴더 구조(A-2) 및 Storybook 제거

- **결정**: `src/sections/{section}/`에 컴포넌트·데이터·CSS를 함께 두는 A-2 구조 채택. Storybook·Vitest·Playwright 및 관련 빌드 스크립트 제거.
- **이유**: 포트폴리오 규모에서는 섹션 단위 응집도가 더 실용적이고, Storybook 유지 비용 대비 이득이 적음.
- **대안**: 기존 `sections/` 플랫 구조 + `shared/content` 데이터 분리, Storybook(C안) 유지

### 2026-02-13 퀴즈 결과 저장(회사별 매칭/실패)

- **결정**: 면접관이 직접 회사명 입력(선택), 퀴즈 결과(매칭/실패)를 Google Sheets에 저장. MatchCompany 인트로에 회사명 입력+시작하기, 자동 진행 제거·엔터/버튼으로만 진행. Vercel API가 Apps Script URL로 전달(QUIZ_RESULT_SCRIPT_URL).
- **이유**: 서버/DB 없이 시트로 회사별 결과 확인, 인트로에서 한 번에 회사+시작으로 자연스러운 흐름
- **대안**: GA4 이벤트만(회사별 표 형태는 불편), 자체 백엔드+DB
