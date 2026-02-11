# 자동 커밋 설계안

history.md 변경 시 의미 있는 변화만 자동으로 커밋·푸시하는 시스템 설계

---

## 1. 목적

- **히스토리 관리**: `.cursorrules`의 "굵직한 변화" 시점에 자동 커밋하여 의미 있는 이력 유지
- **트리거**: `docs/history.md` 변경
- **보안(오타 방지)**: 오타 수정만 있을 때는 커밋 스킵

---

## 2. 전체 흐름

```
docs/history.md 변경 감지
        ↓
   [의미성 검사]
        ↓
   의미 있음? ──No──→ 스킵 (로그만)
        │
       Yes
        ↓
  git add .
        ↓
  커밋 메시지 생성
        ↓
  git commit -m '변경내용'
        ↓
  git push
```

---

## 3. 상세 설계

### 3.1 트리거

| 항목 | 내용 |
|------|------|
| **대상 파일** | `docs/history.md` |
| **방식** | 파일 변경 감지 (watcher / hook / 수동 실행 중 선택) |
| **실행 시점** | history.md 저장 후 |

### 3.2 의미성 검사 (오타 vs 굵직한 변화)

**목표**: 굵직한 변화에 해당하는 수정만 커밋, 오타 등 소규모 수정은 스킵

#### 3.2.1 "굵직한 변화"로 판단하는 패턴

history.md 구조상 의미 있는 업데이트는 대체로 아래 형태다.

| 패턴 | 설명 | 예시 |
|------|------|------|
| **새 테이블 행 추가** | 3.1~3.5 섹션 테이블에 새 행 | `\| 2026-02-11 \| 코드일꾼 \| Hero 섹션 구현 완료 \|` |
| **새 날짜행** | `\| \d{4}-\d{2}-\d{2} \|` 으로 시작하는 행 추가 | 구현/검토/결정 기록 |
| **새 서브섹션** | `### 3.x.x` 추가 | 주요 단계 분리 |

#### 3.2.2 "오타 수정"으로 추정하는 패턴

| 패턴 | 설명 |
|------|------|
| **기존 행만 수정** | 새 행 없이 기존 라인 내 문자만 변경 |
| **변경량이 작음** | 추가된 라인 수 ≤ N (예: 0), 삭제만 있거나 수정 비율이 낮음 |

#### 3.2.3 판정 로직 (휴리스틱)

```
1. git diff docs/history.md 분석
2. 추가된 라인(+로 시작) 중 다음을 확인:
   - "| YYYY-MM-DD |" 패턴 포함 → 새 기록 행
   - "### 3." 으로 시작 → 새 서브섹션
3. 판정:
   - 조건 A: 새 기록 행 1개 이상 추가 → 의미 있음
   - 조건 B: 새 서브섹션 추가 → 의미 있음
   - 조건 A, B 모두 불충족 → 오타 추정 → 스킵
4. 애매한 경우: (예: 여러 줄 수정이나 패턴 미해당) → 설정에 따라 스킵 또는 진행
```

**설정 옵션**:

- `strict`: 패턴 매칭만 의미 있음으로 인정 (오타 방지 우선)
- `relaxed`: 새 라인 1줄 이상 추가 시 의미 있음
- `always`: 의미성 검사 생략, 변경 시마다 커밋 (오타도 커밋)

### 3.3 커밋 메시지 생성

| 우선순위 | 방법 | 예시 |
|----------|------|------|
| 1 | 새로 추가된 테이블 행의 "내용" 컬럼 추출 | `docs: Hero 섹션 구현 완료` |
| 2 | 해당 섹션명 사용 | `docs: history 업데이트 (3.3 구현)` |
| 3 | 고정 메시지 | `docs: history 업데이트` |

**규칙**:

- 길이 제한: 50자 이내 (Git 기본 가이드라인)
- 접두사: `docs:` 또는 `chore(docs):` 등 프로젝트 컨벤션에 맞게

### 3.4 Git 작업 순서

사용자 요청대로 다음 순서 고정:

```
1. git add .
2. git commit -m '<생성된 변경내용>'
3. git push
```

**에러 처리**:

| 상황 | 동작 |
|------|------|
| nothing to commit | 스킵, 로그만 출력 |
| push 실패 (충돌 등) | 에러 로그 출력, 수동 해결 유도 |
| 인증 실패 | 에러 메시지, 재시도 안 함 |

---

## 4. 구현 방식 후보

### 옵션 A: File Watcher + 스크립트 (Node.js / npm 패키지)

- `chokidar` 등으로 `docs/history.md` 감시
- 변경 시 Node 스크립트 실행 → 의미성 검사 → git 명령
- **장점**: 저장 직후 자동 실행  
- **단점**: 개발 중 항상 실행 중인 프로세스 필요

### 옵션 B: Git pre-commit / post-commit Hook

- `docs/history.md`만 변경된 커밋일 때는 hook에서 별도 처리하기엔 부자연로움
- **대안**: commit 전에 history.md 변경 여부를 검사하는 hook → 의미 있으면 자동 메시지 추가
- **한계**: "history 변경 = 이 커밋의 전부"라는 모델과는 다를 수 있음

### 옵션 C: 수동 실행 스크립트 (CLI)

- `npm run auto-commit` 또는 `node scripts/auto-commit.js`
- 사용자가 history.md 수정 후 직접 실행
- **장점**: 구현 단순, 의도적인 시점에만 커밋  
- **단점**: 자동화 수준 낮음

### 옵션 D: VS Code / Cursor Task + File Watcher

- 확장 또는 설정으로 `docs/history.md` 저장 시 태스크 실행
- **장점**: 에디터 환경과 자연스럽게 연동  
- **단점**: 에디터 의존

### 권장 순서

1. **1단계**: 옵션 C (수동 실행 스크립트)로 검증  
   - 의미성 검사 + 커밋 메시지 생성 + git 순서 확인
2. **2단계**: 필요 시 옵션 A (File Watcher)로 전환해 자동화

---

## 5. 파일 구조 (안)

```
scripts/
├── auto-commit.js        # 메인 진입점: watcher 또는 CLI
├── lib/
│   ├── significance.js   # 의미성 검사 (diff 분석)
│   ├── message.js       # 커밋 메시지 생성
│   └── git.js           # git add / commit / push 래퍼
└── config.json           # strict/relaxed/always, 메시지 규칙 등
```

또는 단일 스크립트:

```
scripts/
└── auto-commit.mjs       # 모든 로직 포함 (초기에는 단순화)
```

---

## 6. 설정 예시

```json
{
  "targetFile": "docs/history.md",
  "mode": "strict",
  "commitPrefix": "docs:",
  "runPush": true
}
```

| 키 | 설명 | 기본값 |
|----|------|--------|
| targetFile | 감시 대상 파일 | docs/history.md |
| mode | strict / relaxed / always | strict |
| commitPrefix | 커밋 메시지 접두사 | docs: |
| runPush | push 수행 여부 | true |

---

## 7. 의존성

- **실행 환경**: Node.js 18+
- **선택**: `chokidar` (watcher 사용 시)
- Git CLI는 시스템에 설치된 `git` 사용

---

## 8. 검증 시나리오

| # | 상황 | 기대 동작 |
|---|------|-----------|
| 1 | 3.3 구현 테이블에 새 행 추가 | 의미 있음 → 커밋·푸시 |
| 2 | "퍼블리셔" → "퍼블리셔" (오타 1글자) | 스킵 |
| 3 | 기존 내용 일부 문구 수정 (새 행 없음) | 스킵 |
| 4 | 3.5 주요 결정 테이블에 새 행 추가 | 의미 있음 → 커밋·푸시 |
| 5 | history.md 외 파일만 변경 | 트리거 없음 (history watcher이므로) |
| 6 | 변경 없이 스크립트 실행 | nothing to commit → 스킵 |

---

## 9. 사용법

```bash
# history.md 수정 후 (의미 있는 행 추가) 실행
npm run auto-commit
```

- **strict** 모드(기본): 새 테이블 행(`| YYYY-MM-DD | ... |`) 또는 새 서브섹션(`### 3.x`) 추가 시에만 커밋
- **relaxed**: history.md에 새 라인 1줄 이상 추가 시 커밋
- **always**: 의미성 검사 생략, 변경 시마다 커밋 (`scripts/config.json`에서 `"mode": "always"`)

### 파일 구조 (구현 완료)

```
scripts/
├── auto-commit.mjs   # 메인 스크립트
└── config.json       # 설정 (mode, commitPrefix, runPush 등)
```

---

## 10. 다음 단계

1. ~~**옵션 C** 기준으로 `scripts/auto-commit.mjs` 구현~~ ✅
2. 위 검증 시나리오로 테스트
3. 필요 시 watcher 모드 추가

---

## 11. 참고

- `.cursorrules` History 문서 섹션: 굵직한 변화 시점 정의
- `docs/history.md`: 실제 업데이트 대상 파일
