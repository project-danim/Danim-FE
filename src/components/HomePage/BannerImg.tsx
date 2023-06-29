import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  // 모바일
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

function BannerImg() {
  const [imageSrc, setImageSrc] = useState("");

  // 뷰포트 크기에 따라서 이미지 경로 다르게 반환
  const checkViewportWidth = () => {
    const width = window.innerWidth;

    if (width <= 430) {
      return "main/danimBanner_mobile.svg";
    }
    if (width <= 940) {
      return "main/danimBanner_tablet.svg";
    }
    if (width <= 1500) {
      return "main/danimBanner.svg";
    }
    return "main/danimBanner.svg";
  };

  useEffect(() => {
    function handleResize() {
      setImageSrc(checkViewportWidth());
    }

    // 초기 이미지 설정
    setImageSrc(checkViewportWidth());
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트시 연결된 이벤트 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <StyledImg src={imageSrc} alt="다님 배너" />;
}

export default BannerImg;
