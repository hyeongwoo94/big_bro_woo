# 프로젝트 컨텍스트

<!-- 프로젝트가 시작되면 기획일꾼/총괄이 이 파일을 채운다. 이후 진행에 따라 갱신한다. -->

## 프로젝트 개요

- **타입**: 웹앱 (포트폴리오 사이트)
- **목적**: 퍼블리셔 → 프론트엔드 전향을 위한 포트폴리오
- **대상 사용자**: 채용 담당자, 이직 포트폴리오 활용
- **기술 스택**: React, TypeScript, Vite, GSAP, Storybook, Vitest

## 현재 상태

- **진행 단계**: Hero 섹션 구현·설계 완료
- **완료된 것**: 프로젝트 셋업, FDD·폴더 구조·C안(Storybook) 컨벤션, Storybook 설치, **Hero 섹션**(커서 트레일·찾기, HeroModal, Toast), **TechNote**(템플릿 tpl-a, 콘텐츠 techNotes.tsx 중앙 관리), **QuickMenu**(PC 원형 클릭→4개, 모바일 하단 플로팅, 다크모드 포함), **다크모드**(html data-theme, localStorage), Hero 커서 전역 표시·z-index·accent 색
- **다음 할 것**: 포트폴리오 본문(다음 섹션) 또는 QuickMenu 예시 링크 실제 연결

## 주요 경로/구조

```
src/
├── sections/     # Hero 등 섹션 단위 (Hero: 커서 트레일 + 찾기)
├── shared/       # 공통 ui (Toast, HeroModal, TechNote, QuickMenu), content (techNotes), hooks, utils
└── app/          # 라우팅, 레이아웃 (App.tsx)
```

## 비고

- `conventions.md`에 FDD, 폴더 구조, Storybook(C안) 워크플로우 명시
