/**
 * 퀴즈 결과(회사명, 매칭/실패)를 Google Apps Script Web App URL로 전달하는 프록시.
 * 브라우저 → 이 API → Apps Script → Google 시트에 행 추가.
 * Vercel 환경변수: QUIZ_RESULT_SCRIPT_URL (Apps Script 배포 URL)
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = process.env.QUIZ_RESULT_SCRIPT_URL;
  if (!url) {
    return res.status(500).json({ error: "QUIZ_RESULT_SCRIPT_URL not configured" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const company = String(body.company ?? "").trim() || "미입력";
    const result = body.result === "match" ? "match" : "fail";

    const scriptRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, result }),
    });

    if (!scriptRes.ok) {
      const text = await scriptRes.text();
      console.error("Apps Script error:", scriptRes.status, text);
      return res.status(502).json({ error: "Sheet append failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("submit-quiz-result error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
