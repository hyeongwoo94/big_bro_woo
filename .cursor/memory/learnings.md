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
