/**
 * Portfolio 섹션에서 사용하는 포트폴리오 데이터.
 * 프로젝트 목록을 한곳에서 관리.
 */

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  orbit: "inner" | "outer";
}

/** 안쪽 궤도 포트폴리오 */
export const INNER_ORBIT_DATA: PortfolioItem[] = [
  {
    id: "seoulmiz",
    title: "서울미즈병원",
    thumbnail: "/images/portfolio/seoulmiz.png",
    url: "http://seoulmizhealthcare.com/",
    orbit: "inner",
  },
  {
    id: "bweye",
    title: "하늘안과",
    thumbnail: "/images/portfolio/bweye.png",
    url: "https://bweye.co.kr/",
    orbit: "inner",
  },
  {
    id: "thebon",
    title: "더본안과",
    thumbnail: "/images/portfolio/thebon.png",
    url: "https://theboneye.com/",
    orbit: "inner",
  },
  {
    id: "yale",
    title: "예일안과",
    thumbnail: "/images/portfolio/yale.png",
    url: "https://lasikmasan.mycafe24.com/",
    orbit: "inner",
  },
];

/** 바깥쪽 궤도 포트폴리오 */
export const OUTER_ORBIT_DATA: PortfolioItem[] = [
  {
    id: "toy1",
    title: "토이프로젝트1",
    thumbnail: "/images/portfolio/toy1.png",
    url: "https://naver.com",
    orbit: "outer",
  },
  {
    id: "toy2",
    title: "토이프로젝트2",
    thumbnail: "/images/portfolio/toy2.png",
    url: "https://daum.net",
    orbit: "outer",
  },
];

/** 전체 포트폴리오 (모바일 리스트용) */
export const PORTFOLIO_DATA: PortfolioItem[] = [
  ...INNER_ORBIT_DATA,
  ...OUTER_ORBIT_DATA,
];

/** 프로필 이미지 경로 (placeholder) */
export const PROFILE_IMAGE = "/images/portfolio/profile-placeholder.png";
