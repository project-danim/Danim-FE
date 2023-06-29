import { useRecoilState } from "recoil";
import { useState } from "react";
import st from "./FilterBarST";
import useToggle from "../../hooks/useToggle";
import { filteredGroupSize } from "../../recoil/filter/filterdPost";
import { groupSizeList } from "./FilterListData";

function GroupSize() {
  // 모바일 픽셀인지 아닌지에 대한 상태
  const [isMobile] = useState(window.matchMedia("(max-width: 430px)").matches);
  // 인원수 버튼 선택 토글 state
  const [isGroupSizeToggled, handleIsGroupSizeToggled] = useToggle(false);
  // 선택된 인원수 state
  const [selectedGroupSize, setSelectedGroupSize] =
    useRecoilState(filteredGroupSize);

  // 인원수 선택 핸들러
  const handleSelectGroupSize = (e: React.MouseEvent<Element, MouseEvent>) => {
    // groupSize 기본값을 빈 문자열로 설정
    const groupSize = (e.target as Element).textContent || "";
    setSelectedGroupSize(groupSize);
    handleIsGroupSizeToggled();
  };
  return (
    <st.StyleContainer>
      {isMobile ? null : (
        <st.CommonLableNameText>인원수</st.CommonLableNameText>
      )}
      <st.CommonDropDownButton type="button" onClick={handleIsGroupSizeToggled}>
        <div>
          {selectedGroupSize !== ""
            ? selectedGroupSize
            : "인원수를 선택해주세요."}
        </div>
        <st.CommonUnderButton>인원수 선택하기</st.CommonUnderButton>
      </st.CommonDropDownButton>
      {isGroupSizeToggled ? (
        <st.LocationListUl>
          {groupSizeList.map((groupSize) => (
            <div
              key={groupSize}
              role="button"
              tabIndex={0}
              onClick={handleSelectGroupSize}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSelectGroupSize(e);
                }
              }}
            >
              <li>{groupSize}</li>
            </div>
          ))}
        </st.LocationListUl>
      ) : null}
    </st.StyleContainer>
  );
}

export default GroupSize;
