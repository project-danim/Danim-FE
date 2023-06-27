import styled from "styled-components";
import FilterBar from "./FilterBar";
import PostList from "./PostList";
import useChatConnect from "../../utils/chatConnect";

const MainPageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 154px;
`;

function Main() {
  // 로컬 스토리지에 저장된 사용자 아이디
  const userId = localStorage.getItem("id");
  if (userId) {
    useChatConnect(userId);
  }

  return (
    <MainPageContainer>
      <FilterBar />
      <PostList />
    </MainPageContainer>
  );
}

export default Main;
