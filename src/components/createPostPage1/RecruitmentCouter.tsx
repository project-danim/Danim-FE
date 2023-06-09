import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { recruitmentCountState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

function RecruitmentCouter() {
  const [count, setCount] = useRecoilState(recruitmentCountState);

  // 글 수정 - 서버에서 가져온 PostState에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { groupSize } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  const incrementCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 2 ? prevCount - 1 : prevCount));
  };

  // postIsEditing이 true일 때 초기 count 값을 groupSize로 설정
  useEffect(() => {
    if (postIsEditing && groupSize) {
      setCount(groupSize);
    }
  }, [postIsEditing, groupSize]);

  useEffect(() => {
    if (count < 2) {
      setCount(2);
    } else if (count > 10) {
      setCount(10);
    }
  }, [count]);

  return (
    <Container>
      <CountButton type="button" onClick={decrementCount}>
        {"<"}
      </CountButton>
      <CounterWrapper>{count}</CounterWrapper>
      <CountButton type="button" onClick={incrementCount}>
        {">"}
      </CountButton>
    </Container>
  );
}

export default RecruitmentCouter;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
`;

const CountButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const CounterWrapper = styled.div``;

// const Container = styled.div``;
