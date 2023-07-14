import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import Router from "./router/Router";
import "./styles/reset.css";
import "normalize.css";
import GlobalStyle from "./GlobalStyle";
import { refreshAccessToken } from "./api/signUp";

const queryclient = new QueryClient();

function App() {
  // 새로고침 했을때 액세스 토큰 재발급
  useEffect(() => {
    refreshAccessToken();
  }, []);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <QueryClientProvider client={queryclient}>
        <Router />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
