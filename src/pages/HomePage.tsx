import styled from "styled-components";
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
  return (
    <>
      <HomeBanner />
      <Main />
    </>
  );
}

export default HomePage;
