# 학습·팁

<!-- 자주 쓰는 패턴, 한번 헷갈렸던 점, "다음엔 이렇게 하자"를 적는다. 반복 질문을 줄인다. -->

## 형식

```markdown
### [주제]
- **상황**: 
- **해결/패턴**: 
```

---

## 기록

### [Hero 브러시/커서 좌표]
- **상황**: 컨텐츠에 maxWidth 등으로 영역이 제한되면 마우스와 브러시 위치가 어긋남
- **해결/패턴**: 트레일·커서 좌표를 section 전체가 아니라 **컨텐츠 래퍼(ref)의 getBoundingClientRect()** 기준으로 정규화

### [포커스 링 a11y]
- **상황**: 키보드 포커스 시 시각적 피드백 필요
- **해결/패턴**: `index.css`에서 `button:focus-visible`, `a:focus-visible`, `[tabindex="0"]:focus-visible`에 `outline: 2px solid var(--color-focus-ring); outline-offset: 2px` 적용. `:focus-visible`로 마우스 클릭 시에는 링 미표시

### [스크롤바 커스터마이징]
- **상황**: 기본 브라우저 스크롤바가 디자인과 어울리지 않음
- **해결/패턴**: `common.css`에서 전역 스크롤바 스타일 적용. Firefox는 `scrollbar-width: thin`, `scrollbar-color: var(--color-border) transparent`. Chrome/Safari/Edge는 `::-webkit-scrollbar` (8px, 둥근 thumb `--color-border`, hover `--color-accent`), `::-webkit-scrollbar-button { display: none }`로 화살표 제거. 디자인 토큰 사용으로 라이트/다크 모드 자동 대응

### [thankyou 뒤로가기 방지]
- **상황**: 특정 페이지(/thankyou)에서 브라우저 뒤로가기로 이전 화면으로 돌아가는 것을 막고 싶음
- **해결/패턴**: 해당 경로일 때 `history.pushState(null, '', '/thankyou')`로 동일 URL 히스토리 항목을 하나 더 쌓고, `popstate` 리스너에서 다시 `pushState`로 현재 URL을 쌓아서 뒤로가기 시에도 같은 페이지에 머물게 함. (React Router와 병행 시 pathname "/"일 때만 hero-cursor-mode 적용 등 경로별 분기 유의)

### [Storybook 개발 vs 배포]
- **상황**: 스토리 수정 후 배포/preview에서 /storybook/에 반영하려면?
- **해결/패턴**: 개발 시에는 `npm run storybook`만으로 실시간 반영. 배포·preview용으로는 스토리 수정 후 **`npm run build:with-storybook`** 을 다시 실행해야 dist/storybook이 갱신됨. README에 구분해서 적어두면 좋음
