import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { selectedLocationState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import CommonButton from "../common/CommonButton";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 두 개의 열로 설정 */
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin: 5px;
`;

function Location() {
  const keywordOptions = [
    "서울",
    "경기도",
    "인천",
    "대전",
    "대구",
    "부산",
    "울산",
    "광주",
    "제주",
    "강원도",
  ];
  // 글 작성 - recoil state 저장, 수정일때도 해당 state를 변경함.
  const [selectedValue, setSelectedValue] = useRecoilState(
    selectedLocationState
  );

  // 글 수정 - 서버에서 가져온 PostState에서 location 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { location } = getPostData || {};

  // 수정중인지에 대한 상태값
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 버튼이 클릭되었을때 state 변경
  const handleOptionToggle = (keywordOption: string) => {
    setSelectedValue(keywordOption);
  };

  useEffect(() => {
    if (postIsEditing && location) {
      setSelectedValue(location);
    }
  }, [postIsEditing, location]);

  // postIsEditing, location, selectedValue 값이 변경 될때만 사용됨.
  const buttonStyles = useMemo(
    () =>
      keywordOptions.map((keywordOption) => {
        let color = "gray";
        // postIsEditing 이 true 일때 -> 수정 중 일때
        if (postIsEditing) {
          if (selectedValue) {
            color = keywordOption === selectedValue ? "#2F5901" : "#A4BF3B";
          } else {
            color = keywordOption === location ? "#2F5901" : "#A4BF3B";
          }
          // postIsEditing 이 false 일때 -> 글이 작성 중 일때
        } else {
          color = keywordOption === selectedValue ? "#2F5901" : "#A4BF3B";
        }
        return {
          keywordOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, location, selectedValue]
  );

  return (
    <Container>
      {buttonStyles.map(({ keywordOption, style }) => (
        <ButtonWrapper key={keywordOption}>
          <CommonButton
            key={keywordOption}
            type="button"
            onClick={() => handleOptionToggle(keywordOption)}
            style={style}
          >
            {keywordOption}
          </CommonButton>
        </ButtonWrapper>
      ))}
    </Container>
  );
}

export default Location;
