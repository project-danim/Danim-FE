import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePostPage, HomePage, NotFoundPage } from "../pages";
import Layout from "../components/common/Layout";
import SignUpPage from "../pages/SignUp/SignUpPage";
import LoginPage from "../pages/Login/LoginPage";
import Redirection from "../components/LoginPage/Redirection";
import SignUpForSocialPage from "../pages/SignUp/SignUpForSocialPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 👇 index - 중첩 라우트 구조에서 부모 라우트와 정확히 일치하는 경로를 의미함 */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/signup/social" element={<SignUpForSocialPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/api/user/kakao/callback" element={<Redirection />} />

          {/* 👇 존재하지 않는 페이지에 대한 처리 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
