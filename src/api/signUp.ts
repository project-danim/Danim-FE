import axios from "axios";
import { User } from "../types/userType";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_URL,
// });
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
    // const response = await axiosInstance.post("/api/user/checkId", {
    //   userId: id,
    // });
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/user/checkId`,
      { userId: id }
    );
    if (response.data.message === "아이디 중복 검사 성공") {
      return response.data.message;
    }
    return "아이디 중복 검사 실패";
  } catch (err: any) {
    const errMessage = err.response.data.detail;
    return errMessage;
  }
};
// 회원가입 - 닉네임 중복검사
export const fetchCheckNickname = async (nickname: string) => {
  console.log(import.meta.env.VITE_APP_URL);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/user/checkNickname`,
      {
        nickname,
      }
    );
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
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/user/signup`,
      user
    );
    return response.data;
  } catch (err) {
    showError(err);
    throw err;
  }
};
// 로그인
export const fetchLogin = async (user: {
  userId: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/user/login`,
      user
    );
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
    const errMessage = err.response.data.detail;
    return errMessage;
  }
};
// 로그아웃
export const fetchLogout = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/api/user/logout`,
      {
        headers: {
          ACCESS_KEY: accessToken,
        },
      }
    );
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return response;
  } catch (err) {
    showError(err);
    throw err;
  }
};
