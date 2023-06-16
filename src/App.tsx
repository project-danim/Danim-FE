import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Router from "./router/Router";
import GlobalStyle from "./GlobalStyle";

const queryclient = new QueryClient();

function App() {
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
