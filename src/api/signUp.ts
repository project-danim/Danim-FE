import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { User, UserInfoForKakao } from "../types/userType";

// axiosInstace 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

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

// 액세스 토큰 만료 확인하는 인터셉터
axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {
      const token = getAccessToken();

      if (token) {
        // accessToken이 있을 경우만 실행
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join("")
        );

        const { exp } = JSON.parse(jsonPayload);

        // Token이 만료되었을 경우
        if (Date.now() >= exp * 1000) {
          // Refresh Token으로 새로운 Access Token 요청
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const response = await axiosInstance.post(
              "/api/user/refreshToken",
              {
                headers: {
                  REFRESH_KEY: refreshToken,
                },
              }
            );
            // 이 부분은 새로 들어온 액세스 토큰 data로 줄 수도 있으니 받아보고 확인하기!!
            const newAccessToken = response.headers.accessToken;

            // 쿠키 업데이트
            setCookie("accessToken", newAccessToken, 1); // 1일 후 만료

            // 요청의 헤더 업데이트
            const updatedConfig = {
              ...config,
              headers: {
                ...config.headers,
                REFRESH_KEY: `Bearer ${newAccessToken}`,
              },
            };

            return updatedConfig;
          }
        }
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

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
    if (response.data.status === 500) {
      throw response.data;
    }
    if (response.data.message === "로그인 성공") {
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
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("id");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileUrl");
      localStorage.removeItem("showAlert");
      localStorage.setItem("isAuthenticated", "false");
      return response;
    }
    if (refreshToken) {
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("id");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileUrl");
      localStorage.removeItem("showAlert");
      localStorage.setItem("isAuthenticated", "false");
      return { data: "refreshToken 삭제 완료" };
    }
    return null;
  } catch (err: any) {
    if (err) {
      if (err.response.status === 404) {
        // 찾을 수 없는 회원일때
        return "찾을 수 없는 회원입니다.";
      }
    }
    return err;
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
      localStorage.setItem("isAuthenticated", "false");
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
