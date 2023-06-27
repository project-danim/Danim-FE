import axios from "axios";
import { User, UserInfoForKakao } from "../types/userType";
// import chatConnect from "../utils/chatConnect";

// axiosInstace (액세스 토큰 만료시 재발급 받는 인터셉터 있음)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

// generalInstance (인터셉터 없음)
// export const generalInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_URL,
// });

// 에러 콘솔 출력 함수
export function showError(error: any) {
  console.log("여기서 error 발생", error);
}

// 쿠키 토큰 저장 함수
export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

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

// 로그아웃 처리 함수
const removeAllInfo = () => {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("id");
  localStorage.removeItem("nickname");
  localStorage.removeItem("profileUrl");
  localStorage.removeItem("showAlert");
  localStorage.setItem("isAuthenticated", "false");
  localStorage.removeItem("newChat");
};

// 액세스 토큰 확인하고 재발급 받는 함수
export const checkAccessToken = async () => {
  const token = getAccessToken();

  if (token) {
    return "accessToken 재발급 완료";
  }
  // 액세스 토큰이 만료된 경우
  if (token === null || token === "") {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const response = await axiosInstance.get("/api/user/refreshToken", {
          headers: {
            REFRESH_KEY: refreshToken,
          },
        });
        const newAccessToken = response.headers.access_key;

        // 새롭게 발급 받은 액세스 토큰을 쿠키에 저장
        setCookie("accessToken", newAccessToken, 1);

        return newAccessToken;
      } catch (error) {
        return error;
      }
    }
  }
  return null;
};

// 액세스 토큰 만료 확인하는 인터셉터
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await checkAccessToken();
//     if (token === "accessToken 재발급 완료") {
//       return config;
//     }
//     if (token) {
//       // 함수의 매개변수를 직접 변경하는 것을 금지하는 규칙 이 코드에서만 해제해놓겠습니다!
//       // eslint-disable-next-line no-param-reassign
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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
    return err;
  }
};

// 회원가입 - 랜덤 닉네임 받아오기
export const fetchRandomNickname = async () => {
  try {
    const response = await axiosInstance.get("api/user/randomNickname");
    return response.data.data;
  } catch (err) {
    return err;
  }
};

// 회원가입 - 소셜 추가 정보받기
export const fetchSignUpForSocial = async (userInfo: UserInfoForKakao) => {
  try {
    const response = await axiosInstance.post("/api/user/userInfo", userInfo);
    return response.data;
  } catch (err) {
    return err;
  }
};

// 로그인
export const fetchLogin = async (user: {
  userId: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/user/login", user);
    if (response.data.status === 500) {
      throw response.data;
    }
    if (response.data.message === "로그인 성공") {
      // 웹 소켓 통신에 연결
      // chatConnect();
      // 토큰 및 유저 정보 저장
      const accessToken = response.headers.access_key;
      const refreshToken = response.headers.refresh_key;
      const { id } = response.data.data;
      const { nickName: nickname } = response.data.data;
      const { myPageImageUrl: profileUrl } = response.data.data;
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileUrl", profileUrl);
      localStorage.setItem("id", id);
      localStorage.setItem("isAuthenticated", "true");
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
      removeAllInfo();
      return response;
    }
    // 리프레쉬 토큰으로 요청

    const response = await axiosInstance.delete("/api/user/logout", {
      headers: {
        REFRESH_KEY: refreshToken,
      },
    });
    return response;
  } catch (err: any) {
    if (err) {
      // if (err.response.status === 404) {
      // }
    }
  }

  // 액세스 토큰이 없거나 요청이 실패한 경우에도 로그아웃 처리
  removeAllInfo();

  return null;
};

// 탈퇴하기
export const withdrawalUser = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.delete("/api/user/delete ", {
      headers: {
        ACCESS_KEY: accessToken,
      },
    });
    removeAllInfo();
    return response;
  } catch (err) {
    // 에러가 발생하더라도 탈퇴 처리
    removeAllInfo();
    return err;
  }
};
