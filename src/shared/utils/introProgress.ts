/** Hero · MatchCompany 통과 여부 (24시간 유지 후 초기화) */
const STORAGE_KEY = "big_bro_woo_intro";
const TTL_MS = 24 * 60 * 60 * 1000;

export type IntroProgress = "none" | "hero" | "complete";

type StoredIntro = {
    progress: Exclude<IntroProgress, "none">;
    savedAt: number;
};

function clearStorage(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // localStorage 비활성 환경
    }
}

function readStored(): StoredIntro | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        // 이전 형식: "hero" | "complete" 문자열만 저장
        if (raw === "hero" || raw === "complete") {
            const migrated: StoredIntro = { progress: raw, savedAt: Date.now() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
            return migrated;
        }

        const parsed = JSON.parse(raw) as Partial<StoredIntro>;
        if (
            (parsed.progress !== "hero" && parsed.progress !== "complete") ||
            typeof parsed.savedAt !== "number"
        ) {
            return null;
        }
        return { progress: parsed.progress, savedAt: parsed.savedAt };
    } catch {
        return null;
    }
}

function isExpired(savedAt: number): boolean {
    return Date.now() - savedAt >= TTL_MS;
}

export function getIntroProgress(): IntroProgress {
    const stored = readStored();
    if (!stored) return "none";
    if (isExpired(stored.savedAt)) {
        clearStorage();
        return "none";
    }
    return stored.progress;
}

export function setIntroProgress(progress: IntroProgress): void {
    try {
        if (progress === "none") {
            clearStorage();
        } else {
            const data: StoredIntro = { progress, savedAt: Date.now() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    } catch {
        // 무시
    }
}
