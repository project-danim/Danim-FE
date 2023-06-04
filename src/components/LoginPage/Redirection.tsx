import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setCookie, showError } from "../../api/signUp";

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

  useEffect(() => {
    console.log("userCode changed: ", userCode); // Add this line to track userCode changes
    const fetchKakaoLogin = async () => {
      if (userCode !== null) {
        // userCode가 null이 아닐 때만 실행
        try {
          const response = await fetchKakaoToken(userCode);
          const accessToken = response.headers.access_key;
          const refreshToken = response.headers.refresh_key;
          setCookie("accessToken", accessToken, 1);
          setCookie("refreshToken", refreshToken, 30);
          navigate("/");
        } catch (err) {
          showError(err);
        }
      }
    };
    fetchKakaoLogin();
  }, [userCode]);

  return <div>카카오 로그인 중~</div>;
}

export default Redirection;
