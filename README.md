# big_bro_woo

## 스토리북 (Storybook)

- **개발/미리보기**: `npm run storybook` → 실시간 반영, 별도 빌드 불필요.
- **배포·preview**(앱과 함께 `/storybook/` 페이지로 보려면): 스토리를 수정한 뒤 **`npm run build:with-storybook`** 을 다시 실행해야 한다.  
  - 이 명령은 앱 빌드 후 스토리북을 `dist/storybook`에 넣는다.  
  - `npm run preview`로 확인 시 메인 앱은 `/`, 스토리북은 `/storybook/`에서 본다.

## 자동 커밋

**명령만으로는 history·명세서를 수정하지 않습니다.**  
커밋 전에 명세를 갱신한 뒤 `auto-commit`을 실행하세요.

1. **커밋 전 명세/히스토리 업데이트해 줘** 라고만 입력하면 AI가 `docs/history.md`와 `.cursor/memory/`를 자동으로 갱신합니다.
2. 이어서 터미널에서 실행:

```bash
npm run auto-commit
```

- `docs/history.md`에 “의미 있는” 변경(새 날짜 행, 새 섹션 등)이 있을 때만 커밋·푸시합니다(strict 모드).  
- 상세: `docs/design/auto-commit-design.md` 참고.