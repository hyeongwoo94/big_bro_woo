# Closing(마무리) 섹션 설계 — 초안

> 구현 전 방향 논의용. 합의 후 이 문서를 업데이트하며 진행합니다.

## 0. 페르소나 검토 요약

### 총괄

| 항목 | 결정 |
|------|------|
| 목적 | 스크롤을 끝까지 본 담당자에게 **성장 의지 + 감사** 전달 |
| 위치 | **AI Experience 다음**, Contact(footer) **직전** — 본문의 마지막 섹션 |
| 톤 | 인터랙티브·화려함 ↓, **진심·여운** ↑ (Hero/MatchCompany와 대비) |
| 우선순위 | Must: 문구 표시 · 반응형 · footer와 겹침 없음 |

`/thankyou` 페이지(미매치 시)와 **별개**. 메인 포트폴리오 흐름 안의 **클로징 섹션**이다.

### 기획일꾼

- 콘텐츠는 `closingData.ts` 한곳 관리
- About Me 「목표」카드와 **문장 일부 중복** 가능 → Closing은 **짧은 각오 + 감사**에 집중, 카드는 상세 서사
- QuickMenu 앵커: **Nice** (섹션 수 많아지면 생략 가능)

### 검토일꾼

- 3문단 모두 노출 시 모바일에서 길어질 수 있음 → **문단 구분(`\n\n`) + 적당한 line-height** 필수
- PC 고정 footer + 마퀴 높이만큼 **하단 패딩** 확보
- 과한 애니메이션은 톤과 안 맞음 — **페이드인 1회** 또는 정적 표시 권장

---

## 1. 개요

| 항목 | 내용 |
|------|------|
| 섹션명 (표시) | 마무리 / 감사합니다 (택 1) |
| 컴포넌트명 (가칭) | `Closing` |
| CSS 루트 | `.closing-sec` |
| 위치 | `AIExperience` → **`Closing`** → `Contact`(footer) |

### 현재 → 변경 후 섹션 순서

```
About Me → Portfolio → Career → AI Experience → Closing (신규) → Contact(footer)
```

---

## 2. 콘텐츠 (확정 문안)

```ts
export const CLOSING_PARAGRAPHS = [
  "저는 모든 것을 아는 개발자보다,\n모르는 것을 빠르게 이해하고 제 것으로 만드는 개발자가 되고자 합니다.",
  "퍼블리싱 실무 경험을 바탕으로 프론트엔드 영역까지 꾸준히 확장하며,\n사용자와 팀 모두에게 도움이 되는 서비스를 만드는 개발자로 성장하겠습니다.",
  "끝까지 읽어주셔서 감사합니다.",
] as const;
```

| 문단 | 역할 |
|------|------|
| 1 | 가치관 — 학습형 개발자 |
| 2 | 방향 — 퍼블 → 프론트, 사용자·팀 |
| 3 | 클로징 — 감사 (짧게, 여운) |

**선택:** 3문단만 두거나, 상단에 소제목 `마무리` / `Thank you` 추가.

---

## 3. 레이아웃 옵션

### A. 센터 타이포 (추천)

```
┌─────────────────────────────────────────────┐
│                                             │
│              마무리 (소제목, 선택)           │
│                                             │
│     저는 모든 것을 아는 개발자보다,          │
│     모르는 것을 빠르게 이해하고 ...          │
│                                             │
│     퍼블리싱 실무 경험을 바탕으로 ...        │
│                                             │
│     끝까지 읽어주셔서 감사합니다.            │
│                                             │
└─────────────────────────────────────────────┘
```

- `min-height: 100vh` 또는 `min-height: 70vh` — **70vh 추천** (footer·마퀴와 합쳐 스크롤 과다 방지)
- 텍스트 가운데 정렬, `max-width: 640px`
- 1·2문단: `--color-text-muted`, 3문단: `--color-text` 또는 `--color-accent-warm`으로 살짝 강조

### B. 좌측 정렬 블록

- About Me·Career와 같은 **왼쪽 읽기 흐름**
- PC에서 본문 느낌, 다소 이력서 톤

### C. 인용구 스타일

- 왼쪽 `border-left` + `--color-accent-warm`
- 3문단을 하나의 인용 블록으로 — **감사 문장이 묻힐 수 있어 비추**

**총괄 추천: A (센터 타이포, 70vh)**

---

## 4. 시각·타이포

| 요소 | 제안 |
|------|------|
| 소제목 | `font-size-2xl`, 다른 섹션 heading과 통일 |
| 본문 | `font-size-base` ~ `font-size-lg`, `line-height: 1.8` |
| 문단 간격 | `margin-bottom: var(--spacing-xl)` |
| 줄바꿈 | 데이터 `\n` + CSS `white-space: pre-line` |
| 배경 | `--color-bg` (섹션 기본과 동일, 별도 그라데이션 없음) |
| 강조 | 3문단만 `font-weight: 600` 또는 warm 색 — **1곳만** |

애니메이션 (Should):

- 스크롤 진입 시 `opacity` 페이드인 0.6s (1회, `prefers-reduced-motion` 시 생략)

---

## 5. 반응형·footer 관계

| 환경 | 주의 |
|------|------|
| PC | footer `position: fixed` — Closing 하단 `padding-bottom`으로 마퀴+연락처 가림 방지 (About Me·AI Experience와 동일 패턴) |
| Mobile | QuickMenu 하단 여백 `padding-bottom: ~100px` |
| 회사매칭 전 | Closing 미렌더 (`matchCompanyPassed`와 동일 조건) |

---

## 6. 데이터·파일 구조 (구현 시)

```
src/
├── sections/
│   ├── Closing.tsx
│   └── styles/Closing.css
├── shared/
│   └── content/
│       └── closingData.ts
```

```ts
// closingData.ts
export const CLOSING_HEADING = "마무리"; // 또는 null로 소제목 생략

export const CLOSING_PARAGRAPHS: readonly string[] = [ /* 위 문안 */ ];
```

`App.tsx`:

```tsx
<AIExperience />
<Closing />
<Contact />
```

---

## 7. 구현 체크리스트 (합의 후)

- [ ] `closingData.ts` 생성
- [ ] `Closing.tsx` + `Closing.css`
- [ ] `App.tsx`에 AI Experience와 Contact 사이 삽입
- [ ] PC/Mobile 하단 여백 (footer·QuickMenu)
- [ ] (선택) TechNote — 이 섹션은 기술 설명 불필요로 **생략 권장**
- [ ] (선택) QuickMenu 섹션 앵커

---

## 8. 확인이 필요한 것

- [x] 소제목 — **없음**
- [x] 높이 — PC `70vh`, Mobile `55svh` + QuickMenu 여백
- [x] 정렬 — **가운데 (A안)**
- [x] 강조 — **「감사합니다.」** 만 `--color-accent-warm` + 굵게

---

## 9. 진행 기록

| 날짜 | 단계 | 내용 |
|------|------|------|
| 2026-06-29 | 기획 | 초안 작성 (총괄·기획·검토 검토 포함) |
| 2026-06-29 | 구현 | Closing 섹션, closingData, A안 반영 |
