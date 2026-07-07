# WHO I AM 섹션 설계

> 진행 상황에 따라 이 문서가 업데이트됩니다.

## 1. 개요

| 항목 | 내용 |
|------|------|
| 섹션명 | WHO I AM |
| 컴포넌트 | `WhoIAm` (`whoiam-sec` 클래스) |
| 위치 | MatchCompany 통과 후, Projects 이전 |
| 레이아웃 | 기술 스택 + 카드 아코디언 |
| 인터랙션 | 카드 클릭 시 아코디언 펼침/접힘 |

---

## 2. 기능 목록

| 우선순위 | 기능 | 설명 | 상태 |
|----------|------|------|------|
| **Must** | 기술 스택 태그 | 상단 기술 스택 표시 | |
| **Must** | 카드 아코디언 | 5개 카드, 클릭 시 상세 내용 펼침 | |
| **Must** | 반응형 | PC/Mobile 대응 | |
| **Should** | 아코디언 애니메이션 | 부드러운 펼침/접힘 효과, **한 번에 하나만 열림** | |
| **Should** | TechNote | 기술 설명 버튼 | |
| **Should** | 이력서 링크 | PDF 다운로드 버튼 | |

---

## 5. 데이터 구조

```ts
interface WhoIAmCard {
  id: string;
  title: string;
  icon: string;
  keywords: string[];
  content: string;
}

// whoIAmData.ts
export const WHO_I_AM_INTRO: string;
export const WHO_I_AM_TECH_STACK: readonly string[];
export const WHO_I_AM_CARDS: WhoIAmCard[];
```

---

## 6. 파일 구조

```
src/
├── sections/
│   ├── WhoIAm.tsx
│   └── styles/WhoIAm.css
├── shared/
│   └── content/
│       └── whoIAmData.ts
```

---

## 7. 구현 체크리스트

- [x] `src/shared/content/whoIAmData.ts` - 데이터 파일 생성
- [x] `src/sections/WhoIAm.tsx` - 메인 컴포넌트
- [x] `src/sections/styles/WhoIAm.css` - 스타일 (`whoiam-sec` 클래스)
- [x] 카드 레이아웃 (1열, PC/Mobile 동일)
- [x] 아코디언 펼침/접힘 (클릭 토글, 한 번에 하나만)
- [x] 아코디언 애니메이션 (CSS Grid 0fr → 1fr 방식)
- [x] 모바일 하단 패딩 (QuickMenu 공간 확보)
- [x] App.tsx에 섹션 추가
- [x] TechNote 기술 설명 추가 (`whoiam` id)

---

## 8. 진행 기록

| 날짜 | 단계 | 내용 |
|------|------|------|
| 2026-06-24 | 기획 | 초안 작성 완료 (당시 명칭 About Me) |
| 2026-06-24 | 구현 | 기본 구조 완료 |
| 2026-07-07 | 리네이밍 | `AboutMe` → `WhoIAm`, `aboutme-sec` → `whoiam-sec`, `whoIAmData.ts` |

---

## 9. 명칭 변경 (2026-07-07)

| 이전 | 이후 |
|------|------|
| `AboutMe.tsx` | `WhoIAm.tsx` |
| `AboutMe.css` | `WhoIAm.css` |
| `aboutMeData.ts` | `whoIAmData.ts` |
| `aboutme-sec` (CSS) | `whoiam-sec` |
| `AboutCard` | `WhoIAmCard` |
| `ABOUT_*` 상수 | `WHO_I_AM_*` |
| TechNote id `aboutme` | `whoiam` |

소제목 표기는 **WHO I AM** 유지.
