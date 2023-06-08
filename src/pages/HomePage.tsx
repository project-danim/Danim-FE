import styled from "styled-components";
import Main from "../components/HomePage/Main";

const HomeBanner = styled.div`
  width: 100%;
  height: 383px;
  background-image: url("/danimBanner.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // 임의로 설정한 크기입니다! - 지수 -
  @media (max-width: 1400px) and (min-width: 320px) {
    height: 150px;
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
