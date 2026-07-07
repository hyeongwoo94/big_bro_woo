/**
 * Contact / Footer 공통 연락처 데이터
 */

export const CONTACT_DATA = {
    name: "박형우",
    email: "guddn0625@gmail.com",
    phone: "010-9214-3819",
    github: "https://github.com/hyeongwoo94",
} as const;

/** tel/sms URI용 (하이픈 제거) */
export function phoneDigits(phone: string): string {
    return phone.replace(/-/g, "");
}
