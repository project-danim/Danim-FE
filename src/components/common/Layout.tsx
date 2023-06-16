import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from ".";

const OutletWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
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
      {/* <Footer /> */}
    </Container>
  );
}
export default Layout;
