import axios from "axios";
import { User, UserInfoForKakao } from "../types/userType";

// axiosInstace 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

// 에러 콘솔 출력 함수
export function showError(error: any) {
  console.log("여기서 error 발생", error);
}

// 쿠키 가져오는 함수
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      return lastPart.split(";").shift();
    }
  }
  return null;
};
// 액세스 토큰 가져오는 함수
export const getAccessToken = () => getCookie("accessToken");

// 리프레시 토큰 가져오는 함수
export const getRefreshToken = () => getCookie("refreshToken");

// 쿠키에 토큰 저장 함수
export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

// 회원가입 - 아이디 중복검사
export const fetchCheckId = async (id: string) => {
  try {
    const response = await axiosInstance.post("/api/user/checkId", {
      userId: id,
    });
    if (response.data.message === "아이디 중복 검사 성공") {
      return response.data.message;
    }
    return "아이디 중복 검사 실패";
  } catch (err: any) {
    const errMessage = err.response.data.detail || err.message;
    return errMessage;
  }
};
// 회원가입 - 닉네임 중복검사
export const fetchCheckNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("/api/user/checkNickname", {
      nickname,
    });
    if (response.data.message === "닉네임 중복 검사 성공") {
      return response.data.message;
    }
    return "닉네임 중복 검사 실패";
  } catch (err: any) {
    const errMessage = err.response.data.detail;
    return errMessage;
  }
};

// 회원가입
export const fetchSignUp = async (user: User) => {
  try {
    const response = await axiosInstance.post("/api/user/signup", user);
    return response.data;
  } catch (err) {
    return showError(err);
  }
};

// 회원가입 - 랜덤 닉네임 받아오기
export const fetchRandomNickname = async () => {
  try {
    const response = await axiosInstance.get("api/user/randomNickname");
    return response.data.data;
  } catch (err) {
    return showError(err);
  }
};

// 회원가입 - 소셜 추가 정보받기
export const fetchSignUpForSocial = async (userInfo: UserInfoForKakao) => {
  try {
    const response = await axiosInstance.post("/api/user/userInfo", userInfo);
    return response.data;
  } catch (err) {
    return showError(err);
  }
};

// 로그인
export const fetchLogin = async (user: {
  userId: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/user/login", user);
    if (response.data.message === "로그인 성공") {
      const accessToken = response.headers.access_key;
      const refreshToken = response.headers.refresh_key;
      if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken, 1);
        setCookie("refreshToken", refreshToken, 30);
      }
    }
    return response;
  } catch (err: any) {
    const errMessage = err.response?.data.detail || err.message;
    return errMessage;
  }
};

// 로그아웃
export const fetchLogout = async () => {
  try {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken) {
      const response = await axiosInstance.delete("/api/user/logout", {
        headers: {
          ACCESS_KEY: accessToken,
        },
      });
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("id");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileUrl");
      return response;
    }
    if (refreshToken) {
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      sessionStorage.removeItem("id");
      return { data: "refreshToken 삭제 완료" };
    }
    return null;
  } catch (err) {
    return console.error("An error occurred:", err);
  }
};

// 탈퇴하기
export const withdrawalUser = async () => {
  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      const response = await axiosInstance.delete("/api/user/delete ", {
        headers: {
          ACCESS_KEY: accessToken,
        },
      });
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("id");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileUrl");
       return response;
    }
    return null;
  } catch (err) {
    return showError(err);
  }
};
