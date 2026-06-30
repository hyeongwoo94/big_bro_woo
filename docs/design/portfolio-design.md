# Portfolio 섹션 설계

> 진행 상황에 따라 이 문서가 업데이트됩니다.

## 1. 개요

| 항목 | 내용 |
|------|------|
| 섹션명 | Portfolio |
| 위치 | Career 다음 |
| 레이아웃 | PC: 원형 사진 + 위성 궤도 / Mobile: 사진 + 리스트 |
| 인터랙션 | 위성 자동 회전 + 호버 확대 + 클릭 이동 |

---

## 2. 레이아웃

### PC (원형 궤도)

```
┌─────────────────────────────────────────────────────┐
│                    Portfolio 섹션                    │
│                                                     │
│                    ○ 포폴3                          │
│               ╱                  ╲                  │
│           ○ 포폴2          ○ 포폴4                 │
│               ╲     ┌───┐     ╱                    │
│                  ── │ 🧑 │ ──                       │
│               ╱     └───┘     ╲                    │
│           ○ 포폴1                                   │
│                                                     │
│  - 가운데: 원형 프로필 사진                          │
│  - 주변: 포트폴리오 캡쳐 사진들이 위성처럼 회전       │
│  - 호버: 살짝 확대 (scale 1.1)                      │
│  - 클릭: 해당 사이트로 새 탭 이동                    │
└─────────────────────────────────────────────────────┘
```

### Mobile (사진 + 리스트)

```
┌─────────────────────┐
│                     │
│     ┌─────────┐     │
│     │   🧑    │     │
│     │ (네모)  │     │
│     └─────────┘     │
│                     │
│  ┌───────────────┐  │
│  │ 📄 포트폴리오1 │→ │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ 📄 포트폴리오2 │→ │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ 📄 포트폴리오3 │→ │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

---

## 3. 데이터 구조

```ts
interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;  // 캡쳐 이미지 경로
  url: string;        // 사이트 링크
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  { id: "1", title: "프로젝트A", thumbnail: "/images/portfolio1.png", url: "https://..." },
  { id: "2", title: "프로젝트B", thumbnail: "/images/portfolio2.png", url: "https://..." },
  { id: "3", title: "프로젝트C", thumbnail: "/images/portfolio3.png", url: "https://..." },
  { id: "4", title: "프로젝트D", thumbnail: "/images/portfolio4.png", url: "https://..." },
];
```

---

## 4. 핵심 동작

| 항목 | PC | Mobile |
|------|-----|--------|
| 프로필 사진 | 원형, 가운데 고정 | 네모, 상단 |
| 포트폴리오 | 위성처럼 자동 회전 | 리스트 (제목) |
| 호버 | 살짝 확대 (scale) | - |
| 클릭 | 새 탭으로 사이트 이동 | 새 탭으로 사이트 이동 |

---

## 5. 기술 구현

- **위성 회전**: CSS `@keyframes orbit` + `animation: orbit 20s linear infinite`
- **원형 배치**: 각 항목에 `--angle` CSS 변수로 360도 분할
- **호버 확대**: `transform: scale(1.1)` + `transition`
- **링크 이동**: `<a href="..." target="_blank" rel="noopener noreferrer">`
- **프로필 사진**: placeholder 이미지 (나중에 교체)

---

## 6. 파일 구조

```
src/
├── sections/
│   ├── Portfolio.tsx
│   └── styles/Portfolio.css
├── shared/
│   └── content/
│       └── portfolioData.ts
└── stories/
    └── Portfolio.stories.tsx
```

---

## 7. 구현 체크리스트

- [x] `src/shared/content/portfolioData.ts` - 데이터 파일 생성
- [x] `src/sections/Portfolio.tsx` - 메인 컴포넌트
- [x] `src/sections/styles/Portfolio.css` - 스타일
- [x] PC: 원형 프로필 + 위성 궤도 회전
- [x] PC: 호버 확대 + 클릭 이동
- [x] Mobile: 프로필 사진 + 리스트
- [x] App.tsx에 Portfolio 섹션 추가
- [ ] 실제 이미지 추가 (썸네일, 프로필)
- [ ] Storybook 스토리 추가

---

## 8. 진행 기록

| 날짜 | 단계 | 내용 |
|------|------|------|
| 2026-06-17 | 기획 | 초안 작성 완료 |
| 2026-06-17 | 구현 | 기본 구조 완료 (데이터, 컴포넌트, CSS, 궤도 애니메이션) |
| 2026-06-17 | 완료 | 시각 효과 및 인터랙션 추가 완료 |
| 2026-06-29 | 구현 | 프로젝트 상세 모달 (문제/해결/효과), 실무·토이 뱃지 |

---

## 9. 초안 대비 변경사항

### 구조 변경

| 항목 | 초안 | 최종 |
|------|------|------|
| 궤도 개수 | 1개 | 2개 (안쪽/바깥) |
| 포트폴리오 개수 | 4개 | 6개 (안쪽 4개 + 바깥 2개) |
| 안쪽 궤도 크기 | - | 400px |
| 바깥 궤도 크기 | - | 550px |
| 프로필 크기 | 120px | 150px |

### 추가된 시각 효과 (PC)

| 효과 | 설명 |
|------|------|
| 궤도 점선 + glow | 안쪽(파란빛), 바깥(보라빛) 점선에 은은한 빛 |
| 위성 glow | 썸네일 주변 네온 효과 (안쪽: 파랑, 바깥: 보라) |
| 프로필 회전 링 | 2개 링이 서로 반대 방향으로 회전 |
| 호버 시 궤도 정지 | 마우스 올리면 모든 회전 멈춤 + 해당 위성 강조 |

### 추가된 인터랙션

| 요소 | 동작 |
|------|------|
| 프로필 호버 | 말풍선으로 이름/생년월일/전화번호 표시 |
| 별(✦) 호버 | 우상단 별에 마우스 올리면 면책 문구 표시 |

### Mobile 추가

- 소제목 아래에 면책 안내 문구 표시

### 데이터 구조 변경

```ts
// 초안
interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

// 최종 (orbit 속성 추가)
interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  orbit: "inner" | "outer";
  type: "work" | "toy";
  challenge: string;
  solution: string;
  result: string;
}

// 안쪽/바깥 궤도별 분리
export const INNER_ORBIT_DATA: PortfolioItem[];  // 4개 (type: work)
export const OUTER_ORBIT_DATA: PortfolioItem[];  // 2개 (type: toy)
export const PORTFOLIO_DATA: PortfolioItem[];    // 전체 6개
export const PORTFOLIO_TYPE_LABEL: Record<"work" | "toy", string>;  // 실무 / 토이
```

---

## 10. 실무 / 토이 프로젝트 구분 (2026-06-29)

### 왜 추가했는가

- **안쪽 궤도** = 재직 중 수행한 **실무 프로젝트**, **바깥 궤도** = **토이 프로젝트**로 의미가 정해져 있으나, PC는 색(glow)만 다르고 모바일은 리스트 하나라 **사용자가 구분하기 어렵다**.
- 면책 별(✦) 안내는 실무 프로젝트에만 해당하지만, 토이와의 차이가 UI에 드러나지 않으면 포트폴리오 전체가 실무처럼 보일 수 있다.
- 범례·섹션 분리 대신 **프로젝트 이름을 읽는 순간** 실무/토이를 알 수 있도록, 맥락에 맞는 위치에 뱃지를 붙이기로 했다.

### 어떻게 추가하는가

| 구분 | 위치 | 표시 |
|------|------|------|
| PC | 위성 **호버 시** 프로젝트명 라벨 | 라벨 **오른쪽 위**에 `실무` / `토이` 뱃지 |
| Mobile | 리스트 **프로젝트 제목 옆** | 제목 우측에 `실무` / `토이` 뱃지 |
| 공통 | 프로젝트 **상세 모달** 헤더 | 제목 아래 동일 뱃지 (클릭 후 맥락 유지) |

**데이터**

- `portfolioData.ts`에 `type: "work" | "toy"` 추가 (안쪽 궤도 → `work`, 바깥 → `toy`).
- 표시 문구는 `PORTFOLIO_TYPE_LABEL` (`실무`, `토이`)에서 한곳 관리.

**컴포넌트**

- `PortfolioTypeBadge.tsx` — type·variant(`orbit` | `inline` | `default`)에 따라 클래스 분기.
- `Portfolio.tsx` — PC 라벨·모바일 리스트에 뱃지 삽입.
- `PortfolioModal.tsx` — 모달 제목 영역에 뱃지.

**스타일** (`Portfolio.css`)

- `.portfolio-sec_type-badge--work` — `--color-accent` 계열 (안쪽 궤도 파란 톤과 통일).
- `.portfolio-sec_type-badge--toy` — `--color-accent-warm` 계열 (바깥 궤도 보라/골드 톤과 통일).
- `.portfolio-sec_type-badge--orbit` — 호버 라벨 기준 `position: absolute; top; right`.

**접근성**

- 위성 `aria-label`에 `실무/토이` + 프로젝트명 포함.

### 진행 기록

| 날짜 | 내용 |
|------|------|
| 2026-06-29 | 실무/토이 뱃지 UI 및 `type` 필드 추가 |
