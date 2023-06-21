import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, setCookie, showError } from "../../api/signUp";

export const fetchKakaoToken = async (code: string) => {
  const response = await axiosInstance.get(
    `/api/user/kakao/callback?code=${code}`
  );
  // 푸쉬하고 확인해보기
  if (response.data.message === "로그인 성공") {
    const accessToken = response.headers.access_key;
    const refreshToken = response.headers.refresh_key;
    if (accessToken && refreshToken) {
      setCookie("accessToken", accessToken, 1);
      setCookie("refreshToken", refreshToken, 30);
    }
  }
  return response.data;
};

function Redirection() {
  const url = new URL(window.location.href);
  const userCode: string | null = url.searchParams.get("code");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  // 이미 카카오로 가입한 회원인지 확인하는 state
  const [isExistUser, setIsExistUser] = useState(false);

  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      setUserId(userId);
    }
  }, [userId]);
  const fetchKakaoLogin = async () => {
    if (userCode !== null) {
      try {
        const response = await fetchKakaoToken(userCode);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("nickname", response.data.nickName);
        localStorage.setItem("userImageUrl", response.data.myPageImageUrl);
        localStorage.setItem("isAuthenticated", "true");
        setIsExistUser(response.data.isExistMember);
        setUserId(response.data.id);
      } catch (err) {
        showError(err);
      }
    } else {
      return userId;
    }
    return null;
  };
  useEffect(() => {
    fetchKakaoLogin();
  }, []);

  useEffect(() => {
    if (isExistUser) {
      navigate("/");
    }
    if (!isExistUser && userId && userId !== "") {
      navigate("/signup/social");
    }
  }, [isExistUser, userId]);

  return <div>카카오 로그인 중입니다.</div>;
}

export default Redirection;
