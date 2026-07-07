# Projects 섹션 설계

> 진행 상황에 따라 이 문서가 업데이트됩니다.

## 1. 개요

| 항목 | 내용 |
|------|------|
| 섹션명 | Projects |
| 위치 | Career 다음 |
| 레이아웃 | PC: 원형 사진 + 위성 궤도 / Mobile: 사진 + 리스트 |
| 인터랙션 | 위성 자동 회전 + 호버 확대 + 클릭 이동 |

---

## 2. 레이아웃

### PC (원형 궤도)

```
┌─────────────────────────────────────────────────────┐
│                    Projects 섹션                    │
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
interface ProjectItem {
  id: string;
  title: string;
  thumbnail: string;  // 캡쳐 이미지 경로
  url: string;        // 사이트 링크
}

const PROJECTS_DATA: ProjectItem[] = [
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
| 프로필 사진 | 원형, 가운데 고정 · 호버 시 연락처 툴팁 · **클릭 시 일상 사진 갤러리** | 네모, 상단 · **클릭 시 동일 갤러리** |
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
│   ├── Projects.tsx
│   ├── ProfileGalleryModal.tsx
│   ├── ProjectsModal.tsx
│   └── styles/Projects.css
├── shared/
│   └── content/
│       ├── projectsData.ts
│       └── profileGalleryData.ts
public/
└── images/
    └── profile/          # 프로필·갤러리 정적 이미지
```

---

## 7. 구현 체크리스트

- [x] `src/shared/content/projectsData.ts` - 데이터 파일 생성
- [x] `src/sections/Projects.tsx` - 메인 컴포넌트
- [x] `src/sections/styles/Projects.css` - 스타일
- [x] PC: 원형 프로필 + 위성 궤도 회전
- [x] PC: 호버 확대 + 클릭 이동
- [x] Mobile: 프로필 사진 + 리스트
- [x] App.tsx에 Projects 섹션 추가
- [x] 실제 이미지 추가 (썸네일, 프로필)
- [x] 프로필 클릭 → 일상 사진 갤러리 모달 (슬라이드)
- [ ] Storybook 스토리 추가

---

## 8. 진행 기록

| 날짜 | 단계 | 내용 |
|------|------|------|
| 2026-06-17 | 기획 | 초안 작성 완료 |
| 2026-06-17 | 구현 | 기본 구조 완료 (데이터, 컴포넌트, CSS, 궤도 애니메이션) |
| 2026-06-17 | 완료 | 시각 효과 및 인터랙션 추가 완료 |
| 2026-06-29 | 구현 | 프로젝트 상세 모달 (문제/해결/효과), 실무·토이 뱃지 |
| 2026-07-07 | 리네이밍 | `Portfolio` → `Projects`, `portfolio-sec` → `projects-sec`, `projectsData.ts` |

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
| 프로필 클릭 | 일상 사진 갤러리 모달 (슬라이드, 이전/다음·dots·키보드) |
| 별(✦) 호버 | 우상단 별에 마우스 올리면 면책 문구 표시 |

### Mobile 추가

- 소제목 아래에 면책 안내 문구 표시

### 데이터 구조 변경

```ts
// 초안
interface ProjectItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

// 최종 (orbit 속성 추가)
interface ProjectItem {
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
export const INNER_ORBIT_DATA: ProjectItem[];  // 4개 (type: work)
export const OUTER_ORBIT_DATA: ProjectItem[];  // 2개 (type: toy)
export const PROJECTS_DATA: ProjectItem[];    // 전체 6개
export const PROJECTS_TYPE_LABEL: Record<"work" | "toy", string>;  // 실무 / 토이
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

- `projectsData.ts`에 `type: "work" | "toy"` 추가 (안쪽 궤도 → `work`, 바깥 → `toy`).
- 표시 문구는 `PROJECTS_TYPE_LABEL` (`실무`, `토이`)에서 한곳 관리.

**컴포넌트**

- `ProjectsTypeBadge.tsx` — type·variant(`orbit` | `inline` | `default`)에 따라 클래스 분기.
- `Projects.tsx` — PC 라벨·모바일 리스트에 뱃지 삽입.
- `ProjectsModal.tsx` — 모달 제목 영역에 뱃지.

**스타일** (`Projects.css`)

- `.projects-sec_type-badge--work` — `--color-accent` 계열 (안쪽 궤도 파란 톤과 통일).
- `.projects-sec_type-badge--toy` — `--color-accent-warm` 계열 (바깥 궤도 보라/골드 톤과 통일).
- `.projects-sec_type-badge--orbit` — 호버 라벨 기준 `position: absolute; top; right`.

**접근성**

- 위성 `aria-label`에 `실무/토이` + 프로젝트명 포함.

### 진행 기록

| 날짜 | 내용 |
|------|------|
| 2026-06-29 | 실무/토이 뱃지 UI 및 `type` 필드 추가 |

---

## 11. 프로필 일상 사진 갤러리 (2026-07-07)

### 왜 추가했는가

- 가운데 **이력서 사진**은 포트폴리오 톤에 맞게 정돈되어 있지만, **다소 딱딱해 보일 수 있다**.
- 채용 담당자에게 **업무 역량(프로젝트)** 과 함께 **인간적인 면모**도 전달하고 싶다.
- 이력서용 사진은 가운데 프로필로 유지하고, **클릭했을 때만** 편안한 일상 사진을 보여 주는 방식으로 균형을 맞췄다.

### 어떻게 동작하는가

| 구분 | 동작 |
|------|------|
| PC / Mobile 공통 | 가운데(또는 상단) 프로필 사진 **호버** → 이름·생년월일·전화번호 툴팁 (기존 유지) |
| PC / Mobile 공통 | 프로필 사진 **클릭** → 갤러리 모달 열림 |
| 갤러리 모달 | `my_1` ~ `my_3` 일상 사진을 슬라이드로 표시 (이력서 사진은 갤러리에서 제외) |
| 조작 | 이전/다음 버튼, 하단 dots, 키보드 `←` `→` / `Esc` 닫기 |
| 이미지 표시 | **350×350px** 정사각형, `object-fit: cover`, 가운데 정렬. 하단 캡션 텍스트 없음 |

### 데이터·파일

**`src/shared/content/profileGalleryData.ts`**

```ts
interface ProfileGalleryItem {
  id: string;
  src: string;
  alt: string;  // 접근성용 (화면에는 미표시)
}

export const PROFILE_IMAGE = "/images/profile/이력서사진.jpg";  // 궤도 가운데 대표 사진
export const PROFILE_GALLERY: ProfileGalleryItem[];             // 클릭 시 슬라이드 목록
```

**정적 이미지 경로**

| 용도 | 파일 위치 | URL |
|------|-----------|-----|
| 가운데 프로필 | `public/images/profile/이력서사진.jpg` | `/images/profile/이력서사진.jpg` |
| 갤러리 1~3 | `public/images/profile/my_1.jpg` ~ `my_3.jpg` | `/images/profile/my_*.jpg` |

> Vite 규칙: `public/` 아래 파일만 배포 시 루트 URL로 서빙된다.

**컴포넌트**

- `ProfileGalleryModal.tsx` — 슬라이드 모달 (오버레이·닫기·네비게이션)
- `Projects.tsx` — 프로필을 버튼으로 감싸 클릭 시 `isGalleryOpen` 상태로 모달 표시

**스타일** (`Projects.css`)

- `.projects-sec_profile-btn` — 프로필 클릭 영역
- `.projects-sec_gallery-modal`, `.projects-sec_gallery-image` (350×350) 등

### 사진 추가 방법

1. `public/images/profile/`에 이미지 파일 추가
2. `profileGalleryData.ts`의 `PROFILE_GALLERY` 배열에 항목 추가

### 진행 기록

| 날짜 | 내용 |
|------|------|
| 2026-07-07 | 프로필 갤러리 모달 구현, `my_1`~`my_3` 등록, 이력서 사진 갤러리 제외, 350×350·캡션 제거 |
