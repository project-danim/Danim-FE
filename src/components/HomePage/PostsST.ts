import styled from "styled-components";

// 전체 게시글 컨테이너
const postsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 44px 20px;
  justify-content: space-between;
  margin-top: 96px;
  // 임의로 설정한 부분으로 디자인 없는 상태입니다!
  @media (max-width: 1120px) and (min-width: 650px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 430px) and (min-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 8px;
    margin-top: 0;
  }
`;

// 게시글이 없을 때 컨테이너
const noPostContainer = styled.div`
  border-bottom: 1px solid #b5bf69;
  max-width: 1120px;
  padding: 97px 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
`;

export default {
  postsContainer,
  noPostContainer,
};
