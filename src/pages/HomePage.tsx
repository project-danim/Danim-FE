import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/HomePage/Main";
import BannerImg from "../components/HomePage/BannerImg";

function HomePage() {
  const openPopup = () => {
    const url = "notice.html"; // 팝업 창에 표시할 HTML 파일의 경로
    const name = "popup"; // 팝업 창의 이름
    const width = 800; // 팝업 창의 너비
    const height = 800; // 팝업 창의 높이
    const left = (window.innerWidth - width) / 2; // 팝업 창의 가로 위치
    const top = (window.innerHeight - height) / 2; // 팝업 창의 세로 위치

    const options = `width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, name, options);
  };

  useEffect(() => {
    const showAlert = localStorage.getItem("showAlert");
    if (showAlert !== "false") {
      alert(
        `반영 완료된 피드백과 반영 중인 의견들을 공유해 드리기 위해 공지 페이지를 만들어 두었습니다. 팝업 권한 요청을 부탁드립니다. 😃`
      );
      openPopup(); // 컴포넌트 렌더링 시 팝업 창 열기
      localStorage.setItem("showAlert", "false");
    }
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      // 브라우저가 Notification API를 지원하고 알림 권한이 부여되지 않은 경우
      Notification.requestPermission();
    }
  }, []);

  // 모바일 픽셀인지 아닌지에 대한 상태
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 391px)").matches
  );
  // 네이게이트 생성
  const navigate = useNavigate();

  // 픽셀 사이즈 변경시 모바일 픽셀인지 확인하는 함수
  const handleMediaQueryChange = (mediaQuery: any) => {
    setIsMobile(mediaQuery.matches);
  };

  // 모바일 픽셀일 경우 온보딩 페이지로 이동
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 391px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [navigate]);
  useEffect(() => {
    if (isMobile && !sessionStorage.getItem("splashDisplayed")) {
      sessionStorage.setItem("splashDisplayed", "true");
      navigate("/onboard");
    }
  }, [isMobile, navigate]);

  return (
    <>
      <BannerImg />
      <Main />
    </>
  );
}

export default HomePage;
