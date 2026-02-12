# 프로젝트 컨벤션

<!-- 이 프로젝트에서 채택한 패턴, 스타일, 규칙을 적는다. 코드일꾼이 일관되게 따를 수 있도록. -->

## 개발 방식

- **FDD (Feature-Driven Development)**: 기능 단위로 개발. 각 feature를 세로 슬라이스(UI + 로직 + 타입)로 구성한다.

## 폴더 구조

응집도를 높이기 위해 기능별로 묶는다.

```
src/
├── features/           # 기능 단위 (Hero, About, Projects, Skills, Contact 등)
│   ├── {feature}/
│   │   ├── {Feature}.tsx      # 메인 컴포넌트
│   │   ├── {feature}.hooks.ts # feature 전용 훅
│   │   ├── {feature}.types.ts # feature 전용 타입
│   │   └── {feature}.stories.tsx  # Storybook 스토리 (해당 feature UI)
│   ├── hero/
│   ├── about/
│   └── ...
├── shared/             # 여러 feature에서 공통 사용
│   ├── ui/             # 공통 UI 원자 컴포넌트
│   ├── hooks/
│   └── utils/
└── app/                # 라우팅, 레이아웃
```

## UI 개발 워크플로우 (C안)

1. **Storybook에서 UI 먼저 만든다**: 해당 feature의 `.stories.tsx`에서 컴포넌트를 독립적으로 개발·검증한다.
2. **검증 후 feature에 통합**: Storybook에서 확인 완료한 UI를 실제 페이지/컨테이너에 연결한다.

### 규칙

- feature 추가 시 `{feature}.stories.tsx`를 함께 만든다.
- UI는 Storybook에서 먼저 본 뒤 통합한다.
- `shared/ui`의 공통 컴포넌트도 `.stories.tsx`로 먼저 정의한다.

## 코드/구조

- 네이밍: PascalCase(컴포넌트), camelCase(함수·변수), kebab-case(파일명 일부 허용)
- 타입: `{feature}.types.ts` 또는 `types.ts`에 feature/모듈 단위로 정의

## API/데이터

- (포트폴리오는 정적 데이터 위주, API 필요 시 추후 정의)

## CSS/스타일

### CSS 파일 위치

- **섹션 전용** (해당 섹션에서만 사용): `src/sections/styles/{Section}.css`에 둔다. 해당 섹션 TSX에서 직접 import한다. 예: `Hero.tsx` → `import "./styles/Hero.css"`.
- **shared/ui 전용** (Toast, TechNote 등): `src/shared/styles/{Component}.css`에 둔다. **`src/index.css`에서 `@import`** 하여 전역에 로드한다. (design-tokens 다음 순서로 import)
- **공통 유틸리티**: 글씨 크기·굵기·색, 보더, 모서리 등 대중적으로 쓰는 클래스는 `src/shared/styles/common.css`에 모아 둔다. `index.css`에서 design-tokens 바로 다음에 import.
  - 제공 클래스 요약: 글씨 크기 `.text-xs`~`.text-2xl`, 굵기 `.font-normal`~`.font-bold`, 색 `.text-default`/`.text-muted`/`.text-accent`/`.text-accent-warm`, 줄높이 `.leading-*`, 보더 `.border`/`.border-thick`+색 모디파이어, 모서리 `.rounded-sm`~`.rounded-full`, 배경 `.bg-default`/`.bg-surface`/`.bg-transparent`. 필요 시 common.css에만 추가해 한곳에서 관리.

### 디자인 토큰·단위

- **디자인 토큰 우선**: 색상·간격·모서리·글자 크기는 `src/shared/styles/design-tokens.css`에 정의된 CSS 변수 사용. 예: `var(--color-bg)`, `var(--spacing-md)`, `var(--radius-lg)`, `var(--font-size-base)`.
- **인라인 스타일(React)** 작성 시에도 위 변수 사용. 하드코딩 색상(hex/rgb)·숫자만 있는 spacing 대신 토큰 사용.
- **단위**: font-size·spacing은 토큰이 rem/px으로 정의되어 있으므로 토큰 사용. 그 외 레이아웃에서 필요 시 `rem`, `%`, `vw/vh`, `clamp()` 등 사용.
- **반응형**: 768px 기준은 `min-width: 769px` / `max-width: 768px` 미디어 쿼리로 통일 (예: TechNote PC 전용).

### 클래스·선택자 규칙 (섹션/블록 단위)

1. **최상단 부모**: 항상 **고유한 클래스**를 부여한다. (예: `hero-sec`, `about-sec`)
2. **구조**: 최상단 바로 아래 래퍼에는 `_cont`, 그 안의 자식에는 역할에 맞는 이름 앞에 `_`를 붙인다. (예: `_cont`, `_text`, `_title`, `_list`)
   - 직계 자식이 여러 개면 역할별로 구분: `_cont`, `_aside`, `_header` 등.
3. **CSS 선택자**: 스타일은 **항상 최상단 클래스부터** 이어서 작성한다.
   - 예: `.hero-sec`, `.hero-sec ._cont`, `.hero-sec ._text`
   - **깊이 제한**: 필요한 단계만 쓴다. `._text`는 블록 안 어디에 있든 같다면 `.hero-sec ._text`처럼 **최상단 + 역할**만으로 충분히 구분 가능하면 중간 단계 생략. (DOM 구조 변경에 덜 취약, specificity도 낮게 유지)
   - 다른 섹션에서 같은 이름(`_text`, `_cont`)을 써도, 최상단이 다르면 스타일이 적용되지 않는다.
4. **`_` 접두사**: `_cont`, `_text`처럼 앞에 `_`를 붙이는 이유는, 다른 블록에서 `_text`만 단독으로 쓰여도 **아무 스타일도 먹지 않게** 하기 위해서다. 최상단 선택자(`.hero-sec` 등)가 있을 때만 스타일이 적용되도록 스코프를 한정한다.
5. **상태/변형**: 같은 요소의 상태(강조, 활성, 오류 등)는 **data 속성** `[data-xxx="true"]` 또는 **모디파이어 클래스** `._text--name` 중 하나로 통일. (예: `._text[data-name-char="true"]` 또는 `._text._text--name`)
6. **재사용**: 해당 블록 스타일을 재사용하려면 **최상단 클래스(`.hero-sec` 등)부터** 그 구조를 그대로 가져와야 한다.

## 기타

- (브랜치 전략, 커밋 컨벤션 등 필요 시 추가)
