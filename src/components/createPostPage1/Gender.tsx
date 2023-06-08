import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedGenderState } from "../../recoil/post/postCreateState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import { PostGetState } from "../../recoil/post/postGetState";

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

  const handleOptionToggle = (genderOption: string) => {
    if (selectedValues.includes(genderOption)) {
      setSelectedValues(
        selectedValues.filter((value) => value !== genderOption)
      );
    } else {
      setSelectedValues([...selectedValues, genderOption]);
    }
  };

  const buttonStyles = useMemo(
    () =>
      genderOptions.map((genderOption) => {
        let color = "gray";
        if (postIsEditing) {
          if (selectedValues.length) {
            color = selectedValues.includes(genderOption) ? "green" : "gray";
          } else {
            color = gender?.includes(genderOption) ? "green" : "gray";
          }
        } else {
          color = selectedValues.includes(genderOption) ? "green" : "gray";
        }
        return {
          genderOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, gender, selectedValues]
  );

  return (
    <div>
      {buttonStyles.map(({ genderOption, style }) => (
        <button
          key={genderOption}
          type="button"
          onClick={() => handleOptionToggle(genderOption)}
          style={style}
        >
          {genderOption}
        </button>
      ))}
    </div>
  );
}

export default Gender;
