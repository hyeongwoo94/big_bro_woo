# big_bro_woo

## 자동 커밋

**명령만으로는 history·명세서를 수정하지 않습니다.**  
커밋 전에 명세를 갱신한 뒤 `auto-commit`을 실행하세요.

1. **커밋 전 명세/히스토리 업데이트해 줘** 라고만 입력하면 AI가 `docs/history.md`와 `.cursor/memory/`를 자동으로 갱신합니다.
2. 이어서 터미널에서 실행:

```bash
npm run auto-commit
```

- `docs/history.md`에 “의미 있는” 변경(새 날짜 행, 새 섹션 등)이 있을 때만 커밋·푸시합니다(strict 모드).  
- 상세: `docs/auto-commit-design.md` 참고.