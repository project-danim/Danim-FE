import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { selectedAgeRangeState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import CommonButton from "../common/CommonButton";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 5px;
`;

function AgeRange() {
  const ageOptions = ["20대", "30대", "40대", "50대", "60대이상"];
  // 글 작성 - recoil state 저장, 글 수정 - 해당 state를 변경함.
  const [selectedValues, setSelectedValues] = useRecoilState(
    selectedAgeRangeState
  );

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 글 수정 - 서버에서 가져온 PostState에서 ageRange 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { ageRange } = getPostData || {};

  useEffect(() => {
    if (postIsEditing && ageRange) {
      setSelectedValues(ageRange);
    }
  }, [postIsEditing, ageRange]);

  // 선택된 버튼의 토글 state
  const handleOptionToggle = (ageOption: string) => {
    if (selectedValues.includes(ageOption)) {
      setSelectedValues(selectedValues.filter((value) => value !== ageOption));
    } else {
      // setSelectedValues([...selectedValues, ageOption]);
      setSelectedValues((prevValues) => [...prevValues, ageOption]);
    }
  };

  const buttonStyles = useMemo(
    () =>
      ageOptions.map((ageOption) => {
        let color = "gray";
        if (postIsEditing) {
          if (selectedValues.length) {
            color = selectedValues.includes(ageOption)
              ? "var(--button-6-pressed-color)"
              : "var(--button-6-default-color)";
          } else {
            color = ageRange?.includes(ageOption)
              ? "var(--button-6-pressed-color)"
              : "var(--button-6-default-color)";
          }
        } else {
          color = selectedValues.includes(ageOption)
            ? "var(--button-6-pressed-color)"
            : "var(--button-6-default-color)";
        }
        return {
          ageOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, ageRange, selectedValues]
  );

  return (
    <Container>
      {buttonStyles.map(({ ageOption, style }) => (
        <ButtonWrapper key={ageOption}>
          <CommonButton
            key={ageOption}
            type="button"
            onClick={() => handleOptionToggle(ageOption)}
            bgColor={style.backgroundColor}
          >
            {ageOption}
          </CommonButton>
        </ButtonWrapper>
      ))}
    </Container>
  );
}

export default AgeRange;
