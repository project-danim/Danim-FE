import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from ".";

const OutletWrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function HomeLayout() {
  return (
    <Container>
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      {/* <Footer /> */}
    </Container>
  );
}
export default HomeLayout;
