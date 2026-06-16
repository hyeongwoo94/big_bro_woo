# Career 섹션 설계

> 진행 상황에 따라 이 문서가 업데이트됩니다.

## 1. 개요

| 항목 | 내용 |
|------|------|
| 섹션명 | Career (또는 Growth) |
| 위치 | MatchCompany 다음 |
| 레이아웃 | PC: 좌우 분할 / Mobile: 그래프만 + 터치 모달 |
| 인터랙션 | Sticky 스크롤 + 선 진행 애니메이션 |

---

## 2. 레이아웃

### PC (좌우 분할)

```
┌─────────────────────────────────────────────────────┐
│ [Sticky Container - 100vh]                          │
├────────────────────────┬────────────────────────────┤
│                        │                            │
│   기술/지식 ↑          │   2023                     │
│         6│       ●     │   ─────────────────        │
│         5│     ●─┘     │   프론트엔드 전향           │
│         4│   ●─┘       │                            │
│         3│ ●─┘  ← 현재  │   React, TypeScript를      │
│         2│●─┘          │   본격적으로 학습하며...     │
│         1│┘            │                            │
│         0●─────────→   │   (현재 년도만 표시,        │
│          20 21 22 ...   │    나머지는 fade out)      │
│              년도       │                            │
│                        │                            │
└────────────────────────┴────────────────────────────┘
```

### Mobile (히스토리만, 스크롤 연동)

```
┌─────────────────────┐
│                     │
│        2023         │
│   프론트엔드 전향     │
│                     │
│   React, TypeScript │
│   를 본격적으로...    │
│                     │
│  (스크롤에 따라      │
│   fade in/out)      │
│                     │
└─────────────────────┘
```

- 그래프 없이 히스토리만 표시
- PC와 동일하게 스크롤에 따라 년도별 내용 전환

---

## 3. 데이터 구조

```ts
interface CareerItem {
  year: number;        // 2020, 2021, ...
  level: number;       // Y축 값 (0, 1, 2, ...)
  title: string;       // "퍼블리셔 시작"
  description: string; // 상세 내용
}

const CAREER_DATA: CareerItem[] = [
  { year: 2020, level: 0, title: "개발 시작", description: "..." },
  { year: 2021, level: 1, title: "...", description: "..." },
  { year: 2022, level: 2, title: "...", description: "..." },
  { year: 2023, level: 3, title: "...", description: "..." },
  { year: 2024, level: 4, title: "...", description: "..." },
  { year: 2025, level: 5, title: "...", description: "..." },
  { year: 2026, level: 6, title: "...", description: "..." },
];
```

---

## 4. 스크롤 동작

| 스크롤 진행 | 그래프 | 히스토리 (PC) |
|------------|--------|---------------|
| 섹션 진입 | 점(0,0) 표시 | 2020 내용 fade in |
| ~14% | 선이 (1,1)까지 | 2020 out → 2021 in |
| ~28% | 선이 (2,2)까지 | 2021 out → 2022 in |
| ~42% | 선이 (3,3)까지 | 2022 out → 2023 in |
| ~57% | 선이 (4,4)까지 | 2023 out → 2024 in |
| ~71% | 선이 (5,5)까지 | 2024 out → 2025 in |
| ~85%~100% | 선이 (6,6)까지 완성 | 2025 out → 2026 in |
| 섹션 이탈 | 전체 그래프 유지 | 마지막 내용 유지 |

---

## 5. 기술 구현

- **그래프**: SVG `<path>` + `stroke-dashoffset` 애니메이션
- **스크롤**: GSAP ScrollTrigger (Sticky pin)
- **히스토리 fade**: CSS opacity transition
- **모바일 모달**: 기존 HeroModal 재사용 또는 새 CareerModal

---

## 6. 파일 구조

```
src/
├── sections/
│   ├── Career.tsx
│   └── styles/Career.css
├── shared/
│   ├── content/
│   │   └── careerData.ts
│   └── ui/
│       └── CareerModal.tsx  (모바일용, 필요 시)
└── stories/
    └── Career.stories.tsx
```

---

## 7. 구현 체크리스트

- [x] `src/shared/content/careerData.ts` - 데이터 파일 생성
- [x] `src/sections/Career.tsx` - 메인 컴포넌트
- [x] `src/sections/styles/Career.css` - 스타일
- [x] SVG 그래프 (X/Y축 + 선 + 점)
- [x] GSAP ScrollTrigger Sticky 설정
- [x] PC: 우측 히스토리 fade in/out
- [x] Mobile: 히스토리만 표시 (그래프 숨김, 스크롤 연동)
- [x] App.tsx에 Career 섹션 추가
- [x] Storybook 스토리 추가

---

## 8. 진행 기록

| 날짜 | 단계 | 내용 |
|------|------|------|
| 2026-06-16 | 기획 | 초안 작성 완료 |
| 2026-06-16 | 구현 | 기본 구조 완료 (데이터, 컴포넌트, CSS, GSAP 연동) |
| 2026-06-16 | 구현 | Storybook 스토리 추가 (Default, DataPreview) |
