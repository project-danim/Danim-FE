// 사용자 타입 인터페이스
export interface User {
  userId: string;
  password: string;
  gender: string;
  ageRange: string;
  nickname: string;
  agreeForGender: boolean;
  agreeForAge: boolean;
}

// 소셜 회원가입 사용자 정보 타입 인터페이스
export interface UserInfoForKakao {
  userId: string;
  gender: string;
  ageRange: string;
  agreeForGender: boolean;
  agreeForAge: boolean;
}
