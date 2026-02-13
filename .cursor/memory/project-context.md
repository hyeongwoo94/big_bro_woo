# 프로젝트 컨텍스트

<!-- 프로젝트가 시작되면 기획일꾼/총괄이 이 파일을 채운다. 이후 진행에 따라 갱신한다. -->

## 프로젝트 개요

- **타입**: 웹앱 (포트폴리오 사이트)
- **목적**: 퍼블리셔 → 프론트엔드 전향을 위한 포트폴리오
- **대상 사용자**: 채용 담당자, 이직 포트폴리오 활용
- **기술 스택**: React, TypeScript, Vite, GSAP, Storybook, Vitest

## 현재 상태

- **진행 단계**: Hero·MatchCompany 섹션 및 thankyou 페이지 완료
- **완료된 것**: 프로젝트 셋업, FDD·폴더 구조·C안(Storybook) 컨벤션, Storybook 설치, **Hero 섹션**(커서 트레일·찾기, HeroModal, Toast), **TechNote**, **QuickMenu**, **다크모드**, Hero 커서 전역 표시, **docs/design/** 설계 문서 구조, **MatchCompany**(5문 O/X 퀴즈, 인트로·진행 표시·결과·퀴즈 통과 전 스크롤 잠금), **react-router-dom**, **ThankYou 페이지**(/thankyou, fallback 메시지만·버튼 없음, 뒤로가기 방지), thankyou에서 QuickMenu 숨김·hero-cursor-mode pathname "/"일 때만 적용, **Storybook 스토리 통합**(src/stories/, 빌드 시 dist/storybook 포함·퀵메뉴 스토리북 링크, README 안내), **퀴즈 결과 시트**(Google Sheets + Apps Script, Vercel API 프록시, MatchCompany 인트로 회사명 입력·엔터/시작하기로 진행·결과+Q1~Q5 답변(O/X) 전송), QuickMenu 다크/라이트 아이콘 가운데 정렬, vercel.json(build:with-storybook)
- **다음 할 것**: 다음 섹션(Projects 등) 또는 QuickMenu 예시 링크 실제 연결

## 주요 경로/구조

```
src/
├── sections/     # Hero, MatchCompany 등 섹션 단위
├── pages/        # ThankYou (/thankyou) 등 페이지
├── shared/       # 공통 ui, content (techNotes, matchCompanyQuestions), hooks, utils
├── stories/      # Storybook 스토리 파일 (*.stories.*) 일괄 관리
├── api/          # Vercel 서버리스 (submit-quiz-result → Apps Script)
└── app/          # 라우팅, 레이아웃 (App.tsx, Routes /, /thankyou)
```

## 비고

- `conventions.md`에 FDD, 폴더 구조, Storybook(C안) 워크플로우 명시
