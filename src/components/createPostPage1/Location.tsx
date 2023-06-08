import { useRecoilState, useRecoilValue } from "recoil";
import { useMemo } from "react";
import { selectedLocationState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

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

  // postIsEditing, location, selectedValue 값이 변경 될때만 사용됨.
  const buttonStyles = useMemo(
    () =>
      keywordOptions.map((keywordOption) => {
        let color = "gray";
        // postIsEditing 이 true 일때 -> 수정 중 일때
        if (postIsEditing) {
          if (selectedValue) {
            color = keywordOption === selectedValue ? "green" : "gray";
          } else {
            color = keywordOption === location ? "green" : "gray";
          }
          // postIsEditing 이 false 일때 -> 글이 작성 중 일때
        } else {
          color = keywordOption === selectedValue ? "green" : "gray";
        }
        return {
          keywordOption,
          style: { backgroundColor: color },
        };
      }),
    [postIsEditing, location, selectedValue]
  );

  return (
    <div>
      {buttonStyles.map(({ keywordOption, style }) => (
        <button
          key={keywordOption}
          type="button"
          onClick={() => handleOptionToggle(keywordOption)}
          style={style}
        >
          {keywordOption}
        </button>
      ))}
    </div>
  );
}

export default Location;
