# big_bro_woo

## 자동 커밋

**명령만으로는 history·명세서를 수정하지 않습니다.**  
커밋 전에 필요한 명세(예: `docs/history.md`, `.cursor/memory/` 등)를 먼저 갱신한 뒤, 아래 명령을 실행하세요.

1. (선택) AI에게 “이제 커밋할 거니까 필요한 명세서/히스토리 업데이트해 줘” 요청 후 수정 반영
2. 터미널에서 실행:

```bash
npm run auto-commit
```

- `docs/history.md`에 “의미 있는” 변경(새 날짜 행, 새 섹션 등)이 있을 때만 커밋·푸시합니다(strict 모드).  
- 상세: `docs/auto-commit-design.md` 참고.