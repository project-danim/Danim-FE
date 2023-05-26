import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router/Router";

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
