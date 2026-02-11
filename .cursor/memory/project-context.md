# 프로젝트 컨텍스트

<!-- 프로젝트가 시작되면 기획일꾼/총괄이 이 파일을 채운다. 이후 진행에 따라 갱신한다. -->

## 프로젝트 개요

- **타입**: 웹앱 (포트폴리오 사이트)
- **목적**: 퍼블리셔 → 프론트엔드 전향을 위한 포트폴리오
- **대상 사용자**: 채용 담당자, 이직 포트폴리오 활용
- **기술 스택**: React, TypeScript, Vite, GSAP, Storybook, Vitest

## 현재 상태

- **진행 단계**: 기획 완료, 개발 환경·컨벤션 확정
- **완료된 것**: 프로젝트 셋업, FDD·폴더 구조·C안(Storybook) 컨벤션, Storybook 설치
- **다음 할 것**: 첫 feature(Hero 등) 구현 시작

## 주요 경로/구조

```
src/
├── features/     # 기능별 (hero, about, projects 등) - 아직 미생성
├── shared/       # 공통 ui, hooks, utils
└── app/          # 라우팅, 레이아웃
```

## 비고

- `conventions.md`에 FDD, 폴더 구조, Storybook(C안) 워크플로우 명시
