import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedGenderState } from "../../recoil/post/postCreateState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import { PostGetState } from "../../recoil/post/postGetState";
import CommonButton from "../common/CommonButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin: 5px;
`;

function Gender() {
  const genderOptions = ["남", "여"];
  // 글 작성 - recoil state 저장, 글 수정 - 해당 state를 변경함.
  const [selectedValues, setSelectedValues] =
    useRecoilState(selectedGenderState);

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 글 수정 - 서버에서 가져온 PostState에서 location 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { gender } = getPostData || {};

  // recoil에 수정시 변경된 상태 업데이트
  useEffect(() => {
    if (postIsEditing && gender) {
      setSelectedValues(gender);
    }
  }, [postIsEditing, gender]);

  // 선택된 값들의 토글
  const handleOptionToggle = (genderOption: string) => {
    if (selectedValues.includes(genderOption)) {
      setSelectedValues(
        selectedValues.filter((value) => value !== genderOption)
      );
    } else {
      setSelectedValues((prevValues) => [...prevValues, genderOption]);
    }
  };

  const buttonStyles = useMemo(
    () =>
      genderOptions.map((genderOption) => {
        let color = "gray";
        if (postIsEditing) {
          if (selectedValues.length) {
            color = selectedValues.includes(genderOption)
              ? "#2F5901"
              : "#A4BF3B";
          } else {
            color = gender?.includes(genderOption) ? "#2F5901" : "#A4BF3B";
          }
        } else {
          color = selectedValues.includes(genderOption) ? "#2F5901" : "#A4BF3B";
        }
        return {
          genderOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, gender, selectedValues]
  );

  return (
    <Container>
      {buttonStyles.map(({ genderOption, style }) => (
        <ButtonWrapper key={genderOption}>
          <CommonButton
            key={genderOption}
            type="button"
            onClick={() => handleOptionToggle(genderOption)}
            style={style}
          >
            {genderOption}
          </CommonButton>
        </ButtonWrapper>
      ))}
    </Container>
  );
}

export default Gender;
