import styled from "styled-components";
import { useState } from "react";
import FilterBar from "./FilterBar";
import PostList from "./PostList";
import useChatConnect from "../../utils/chatConnect";
import FilterBarMobile from "./Mobile/FilterBarMobile";

const MainPageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 154px;
  // 모바일
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 20px;
    box-sizing: border-box;
  }
`;

function Main() {
  // 모바일 픽셀인지 아닌지에 대한 상태
  const [isMobile] = useState(window.matchMedia("(max-width: 430px)").matches);

  // 로컬 스토리지에 저장된 사용자 아이디
  const userId = localStorage.getItem("id");
  if (userId) {
    useChatConnect(userId);
  }

  return (
    <div>
      {isMobile ? (
        <MainPageContainer>
          <FilterBarMobile />
          <PostList />
        </MainPageContainer>
      ) : (
        <MainPageContainer>
          <FilterBar />
          <PostList />
        </MainPageContainer>
      )}
    </div>
  );
}

export default Main;
