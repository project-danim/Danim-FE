import styled from "styled-components";
import { useEffect } from "react";
import Main from "../components/HomePage/Main";

const HomeBanner = styled.div`
  width: 100%;
  min-height: 340px;
  max-height: 340px;
  background-image: url("main/danimBanner.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f9f6e3;
  // 노트북
  @media (max-width: 1500px) and (min-width: 1025px) {
    min-height: 270px;
  }
  // 태블릿
  @media (max-width: 1024px) and (min-width: 940px) {
    background-image: url("main/danimBanner_tablet.svg");
    min-height: 230px;
    background-size: cover;
  }
  @media (max-width: 941px) and (min-width: 391px) {
    background-image: url("main/danimBanner_tablet.svg");
    min-height: 230px;
    background-size: contain;
  }
  // 모바일
  @media (max-width: 390px) {
    background-image: url("main/danimBanner_mobile.svg");
    border-radius: 6px;
    min-height: 115px;
  }
`;

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

  return (
    <>
      <HomeBanner />
      <Main />
    </>
  );
}

export default HomePage;
