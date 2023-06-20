import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { recruitmentCountState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
`;

const CountButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #5c5c5c;
`;

const NoticeTextWrapper = styled.div`
  font-size: 10px;
  color: #858585;
  margin: 3px;
  p {
    color: #7ea8e3;
  }
`;

//
const CounterWrapper = styled.div``;

function RecruitmentCouter() {
  // 글 작성 - state 저장
  const [count, setCount] = useRecoilState(recruitmentCountState);

  // 글 수정 - 서버에서 가져온 ate에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { groupSize } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  const incrementCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  // postIsEditing이 true일 때 초기 count 값을 groupSize로 설정
  useEffect(() => {
    if (postIsEditing && groupSize) {
      setCount(groupSize);
    }
  }, [postIsEditing, groupSize]);

  useEffect(() => {
    if (count < 1) {
      setCount(1);
    } else if (count > 10) {
      setCount(10);
    }
  }, [count]);

  return (
    <>
      <NoticeTextWrapper>모집 인원을 알려주세요.</NoticeTextWrapper>
      <Container>
        <CountButton type="button" onClick={decrementCount}>
          {"<"}
        </CountButton>
        <CounterWrapper>{count}</CounterWrapper>
        <CountButton type="button" onClick={incrementCount}>
          {">"}
        </CountButton>
      </Container>

      <NoticeTextWrapper>
        <p>글 작성자는 모집 인원에 포함되지 않습니다.</p>
      </NoticeTextWrapper>
    </>
  );
}

export default RecruitmentCouter;
