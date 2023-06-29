import { useRecoilState } from "recoil";
import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import { filteredLocation } from "../../recoil/filter/filterdPost";
import st from "./FilterBarST";
import { locationList } from "./FilterListData";

function LocationFilter() {
  // 모바일 픽셀인지 아닌지에 대한 상태
  const [isMobile] = useState(window.matchMedia("(max-width: 430px)").matches);

  // 지역 버튼 선택 토글 state
  const [isLocationToggled, handleIsLocationToggled] = useToggle(false);
  const [selectedLocation, setSelectedLocation] =
    useRecoilState(filteredLocation);

  // 지역 선택 핸들러
  const handleSelectLocation = (e: React.MouseEvent<Element, MouseEvent>) => {
    // location 기본값을 빈 문자열로 설정
    const location = (e.target as Element).textContent || "";
    setSelectedLocation(location);
    handleIsLocationToggled();
  };
  return (
    <st.StyleContainer>
      {isMobile ? null : <st.CommonLableNameText>지역</st.CommonLableNameText>}
      <st.CommonDropDownButton type="button" onClick={handleIsLocationToggled}>
        <st.CommonSelectedValue>
          {selectedLocation !== "" ? selectedLocation : "지역을 선택해주세요."}
        </st.CommonSelectedValue>
        <st.CommonUnderButton>지역 선택하기</st.CommonUnderButton>
      </st.CommonDropDownButton>
      {isLocationToggled ? (
        <st.LocationListUl ulName="location">
          {locationList.map((location) => (
            <div
              key={location}
              role="button"
              tabIndex={0}
              onClick={handleSelectLocation}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSelectLocation(e);
                }
              }}
            >
              {location}
            </div>
          ))}
        </st.LocationListUl>
      ) : null}
    </st.StyleContainer>
  );
}

export default LocationFilter;
