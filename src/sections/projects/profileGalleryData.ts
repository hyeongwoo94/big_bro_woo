/**
 * 프로필 갤러리 이미지.
 * 파일은 public/images/profile/ 에 두고, URL은 /images/profile/ 로 참조한다.
 */

const profileImage = (filename: string) => `/images/profile/${filename}`;

export interface ProfileGalleryItem {
    id: string;
    src: string;
    alt: string;
}

/** 가운데 프로필 + 갤러리 모달에 사용하는 대표 이미지 */
export const PROFILE_IMAGE = profileImage("이력서사진.jpg");

/**
 * 클릭 시 슬라이드로 보여줄 이미지 목록.
 * 사진 추가 시 public/images/profile/ 에 파일을 넣고 아래 배열에 항목을 추가한다.
 */
export const PROFILE_GALLERY: ProfileGalleryItem[] = [
    {
        id: "my-1",
        src: profileImage("my_1.jpg"),
        alt: "사진 1",
    },
    {
        id: "my-2",
        src: profileImage("my_2.jpg"),
        alt: "사진 2",
    },
    {
        id: "my-3",
        src: profileImage("my_3.jpg"),
        alt: "사진 3",
    },
];
