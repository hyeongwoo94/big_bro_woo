# 프로젝트 컨텍스트

<!-- 프로젝트가 시작되면 기획일꾼/총괄이 이 파일을 채운다. 이후 진행에 따라 갱신한다. -->

## 프로젝트 개요

- **타입**: 웹앱 (포트폴리오 사이트)
- **목적**: 퍼블리셔 → 프론트엔드 전향을 위한 포트폴리오
- **대상 사용자**: 채용 담당자, 이직 포트폴리오 활용
- **기술 스택**: React, TypeScript, Vite, GSAP, react-router-dom

## 현재 상태

- **진행 단계**: 전 섹션 구현 완료, A-2 폴더 구조 적용
- **완료된 것**: Hero, MatchCompany, WhoIAm, Projects, Career, HowIUseAI, Closing, Contact, ThankYou, TechNote, QuickMenu, 다크모드, 퀴즈 결과 시트 연동, 정적 이미지(`public/images/`), 이력서 PDF(`/이력서.pdf`)
- **2026-07-07**: 섹션별 폴더 구조(A-2)로 재구성, Storybook·Vitest·Playwright 제거, `vercel.json` build → `npm run build`

## 주요 경로/구조

```
src/
├── sections/           # 섹션별 폴더 (컴포넌트 + 데이터 + styles/)
│   ├── hero/
│   ├── match-company/
│   ├── whoiam/
│   ├── projects/
│   ├── career/
│   ├── howiuseai/
│   ├── closing/
│   └── contact/
├── pages/              # ThankYou, NotFound
├── shared/
│   ├── content/        # techNotes.tsx (공통 기술 설명)
│   ├── ui/             # Toast, TechNote, QuickMenu 등
│   ├── styles/
│   └── utils/
└── App.tsx
```

## 비고

- `conventions.md`에 FDD, A-2 섹션 폴더 구조, CSS 규칙 명시
