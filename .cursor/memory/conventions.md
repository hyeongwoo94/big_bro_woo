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

## 기타

- (브랜치 전략, 커밋 컨벤션 등 필요 시 추가)
