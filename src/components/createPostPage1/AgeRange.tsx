import { useRecoilState, useRecoilValue } from "recoil";
import { useMemo } from "react";
import { selectedAgeRangeState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

function AgeRange() {
  const ageOptions = ["10대(성인)", "20대", "30대", "40대", "50대", "60대이상"];
  // 글 작성 - recoil state 저장, 글 수정 - 해당 state를 변경함.
  const [selectedValues, setSelectedValues] = useRecoilState(
    selectedAgeRangeState
  );

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 글 수정 - 서버에서 가져온 PostState에서 location 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { ageRange } = getPostData || {};

  const handleOptionToggle = (ageOption: string) => {
    if (selectedValues.includes(ageOption)) {
      setSelectedValues(selectedValues.filter((value) => value !== ageOption));
    } else {
      setSelectedValues([...selectedValues, ageOption]);
    }
  };

  const buttonStyles = useMemo(
    () =>
      ageOptions.map((ageOption) => {
        let color = "gray";
        if (postIsEditing) {
          if (selectedValues.length) {
            color = selectedValues.includes(ageOption) ? "green" : "gray";
          } else {
            color = ageRange?.includes(ageOption) ? "green" : "gray";
          }
        } else {
          color = selectedValues.includes(ageOption) ? "green" : "gray";
        }
        return {
          ageOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, ageRange, selectedValues]
  );

  return (
    <div>
      {buttonStyles.map(({ ageOption, style }) => (
        <button
          key={ageOption}
          type="button"
          onClick={() => handleOptionToggle(ageOption)}
          style={style}
        >
          {ageOption}
        </button>
      ))}
    </div>
  );
}

export default AgeRange;
