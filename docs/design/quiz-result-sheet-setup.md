# 퀴즈 결과 → Google 시트 저장 설정 (Apps Script)

면접관이 입력한 **회사명**과 **매칭/실패 결과**를 Google 시트에 한 행씩 저장하려면 아래 순서대로 진행하세요.

---

## 1. Google 시트 만들기

1. [Google 시트](https://sheets.google.com)에서 **새 스프레드시트** 생성.
2. 시트 이름은 예: `포트폴리오 퀴즈 결과`.
3. **첫 번째 행**에 아래처럼 헤더 입력:

   | A (회사명) | B (결과) | C (일시)   |
   |-----------|---------|------------|
   | 회사명    | 결과    | 일시       |

---

## 2. Apps Script 작성 및 배포

1. 시트 메뉴에서 **확장 프로그램** → **Apps Script**.
2. 기본 `function myFunction() {}` 는 지우고, 아래 코드만 붙여넣기.

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let data = {};
  try {
    data = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Invalid JSON" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const company = (data.company || "").toString().trim() || "미입력";
  const result = data.result === "match" ? "매칭" : "미매칭";
  sheet.appendRow([company, result, new Date()]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **저장** (Ctrl+S), 프로젝트 이름 예: `퀴즈 결과 시트`.
4. **배포** → **새 배포** → 유형 **웹 앱**.
   - **실행 사용자**: 나
   - **액세스 권한**: **모든 사용자** (링크만 있으면 앱에 접근 가능)
5. **배포** 클릭 후 나오는 **웹 앱 URL**을 복사해 두세요.  
   형식 예: `https://script.google.com/macros/s/xxxxx/exec`

---

## 3. Vercel 환경 변수 설정

1. Vercel 대시보드 → 해당 프로젝트 → **Settings** → **Environment Variables**.
2. 추가:
   - **Name**: `QUIZ_RESULT_SCRIPT_URL`
   - **Value**: 2번에서 복사한 **웹 앱 URL** (전체)
3. **Save** 후 **재배포** 한 번 실행 (환경 변수 반영).

---

## 4. 동작 확인

- 포트폴리오에서 회사명 입력 후 퀴즈를 끝까지 진행해 보세요.
- 매칭/미매칭 중 하나가 나오면 앱이 `/api/submit-quiz-result` 를 호출하고, 이 API가 Apps Script URL로 전달합니다.
- Google 시트에 **회사명 | 매칭/미매칭 | 일시** 행이 추가되면 성공입니다.

---

## 참고

- 시트는 **본인만** 보면 되므로 시트 공유는 하지 않아도 됩니다.
- Apps Script URL은 **Vercel 환경 변수에만** 넣고, 프론트 코드나 공개 저장소에는 넣지 마세요.
- **로컬 개발** (`npm run dev`)에서는 `/api` 가 없어 결과 전송이 404가 날 수 있습니다. **Vercel에 배포한 뒤** 실제 링크로 퀴즈를 진행해 보면 시트에 반영됩니다.
