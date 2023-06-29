import styled from "styled-components";
import { useState } from "react";
import FilterBar from "./FilterBar";
import PostList from "./PostList";
import useChatConnect from "../../utils/chatConnect";
import FilterBarMobile from "./Mobile/FilterBarMobile";

// 메인페이지 컨테이너
const MainPageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 154px;
  // 모바일
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 20px;
    padding-top: 24px;
    box-sizing: border-box;
  }
`;

// 함께 다님 텍스트
const TogetDanimText = styled.p`
  margin: 28px 0 12px;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 300;
  line-height: 22px;
  & > span {
    font-weight: 800;
  }
`;

function Main() {
  // 모바일 픽셀인지 아닌지에 대한 상태
  const [isMobile] = useState(window.matchMedia("(max-width: 430px)").matches);

  // 로컬 스토리지에 저장된 사용자 아이디
  const userId = localStorage.getItem("id");

  // useChatConnect Hook은 컴포넌트 최상위 레벨에서 호출되어야 함

  useChatConnect(userId);

  return (
    <div>
      {isMobile ? (
        <MainPageContainer>
          <FilterBarMobile />
          <TogetDanimText>
            함께 <span>다님</span>
          </TogetDanimText>
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
