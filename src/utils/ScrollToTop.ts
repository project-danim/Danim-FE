import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 페이지 이동시 페이지의 최상단으로 가게 함
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
