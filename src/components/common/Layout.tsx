import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header } from ".";

const OutletWrapper = styled.div`
  width: 1120px;
  /* width: 70rem; */
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 205px;
`;

function Layout() {
  return (
    <Container>
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </Container>
  );
}

export default Layout;
