import styled from "styled-components";
import FilterBar from "./FilterBar";
import PostList from "./PostList";

const MainPageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 154px;
`;

function Main() {
  return (
    <MainPageContainer>
      <FilterBar />
      <PostList />
    </MainPageContainer>
  );
}

export default Main;
