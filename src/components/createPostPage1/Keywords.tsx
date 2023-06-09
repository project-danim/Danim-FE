import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { selectedKeywordState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import CommonButton from "../common/CommonButton";

const Container = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin: 0 5px 0 5px;
  width: 100%;
`;

function Keywords() {
  const keywordOptions = ["맛집탐방", "투어", "포토스팟", "성지순례", "쇼핑"];
  // 글 작성 - recoil state 저장, 글 수정 - 해당 state를 변경함.
  const [selectedValue, setSelectedValue] =
    useRecoilState(selectedKeywordState);

  // 글 수정 - 서버에서 가져온 PostState에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { keyword } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  useEffect(() => {
    if (postIsEditing && keyword) {
      setSelectedValue(keyword);
    }
  }, [postIsEditing, keyword]);

  // postIsEditing, keyword, selectedValue 값이 변경 될때만 사용됨.
  const buttonStyles = useMemo(
    () =>
      keywordOptions.map((keywordOption) => {
        let color = "gray";
        // postIsEditing 이 true 일때 -> 수정 중 일때
        if (postIsEditing) {
          if (selectedValue) {
            color =
              keywordOption === selectedValue
                ? "var(--button-6-pressed-color)"
                : "var(--button-6-default-color)";
          } else {
            color =
              keywordOption === keyword
                ? "var(--button-6-pressed-color)"
                : "var(--button-6-default-color)";
          }
          // postIsEditing 이 false 일때 -> 글이 작성 중 일때
        } else {
          color =
            keywordOption === selectedValue
              ? "var(--button-6-pressed-color)"
              : "var(--button-6-default-color)";
        }
        return {
          keywordOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, keyword, selectedValue]
  );

  const handleOptionToggle = (keywordOption: string) => {
    setSelectedValue(keywordOption);
  };

  return (
    <Container>
      {buttonStyles.map(({ keywordOption, style }) => (
        <ButtonWrapper key={keywordOption}>
          <CommonButton
            type="button"
            onClick={() => handleOptionToggle(keywordOption)}
            bgColor={style.backgroundColor}
          >
            {keywordOption}
          </CommonButton>
        </ButtonWrapper>
      ))}
    </Container>
  );
}

export default Keywords;
