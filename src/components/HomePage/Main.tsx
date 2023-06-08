import styled from "styled-components";
import FilterBar from "./FilterBar";
import Posts from "./Posts";

const MainPageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

function Main() {
  return (
    <MainPageContainer>
      <FilterBar />
      <Posts />
    </MainPageContainer>
  );
}

export default Main;
