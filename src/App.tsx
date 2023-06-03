import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Router from "./router/Router";

const queryclient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryclient}>
        <Router />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
