import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { axiosInstance, setCookie, showError } from "../../api/signUp";
import SignUpForSocial from "../SignUpPage/SignUpForSocial";
import userIdState from "../../recoil/login/userInfo";

export const fetchKakaoToken = async (code: string) => {
  const response = await axiosInstance.get(
    `/api/user/kakao/callback?code=${code}`
  );
  return response;
};

function Redirection() {
  const url = new URL(window.location.href);
  const userCode: string | null = url.searchParams.get("code");
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      setUserId(userId);
    }
  }, [userId]);
  const fetchKakaoLogin = async () => {
    if (userCode !== null) {
      // userCode가 null이 아닐 때만 실행
      try {
        const response = await fetchKakaoToken(userCode);
        const accessToken = response.headers.access_key;
        const refreshToken = response.headers.refresh_key;
        setCookie("accessToken", accessToken, 1);
        setCookie("refreshToken", refreshToken, 30);
        const userIdResponse = response.data.data.toString();
        setUserId((prev) => userIdResponse);
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
    if (userId && userId !== "") {
      navigate("/signup/social");
    }
  }, [userId]);
  return (
    <div>
      {userId && userId !== null ? (
        <SignUpForSocial />
      ) : (
        <>카카오 로그인 중입니다.</>
      )}
    </div>
  );
}

export default Redirection;
