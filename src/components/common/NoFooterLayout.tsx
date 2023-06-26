import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from ".";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function NoFooterLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
export default NoFooterLayout;
