import { useRecoilState } from "recoil";
import useToggle from "../../hooks/useToggle";
import { filteredLocation } from "../../recoil/filter/filterdPost";
import st from "./FilterBarST";
import { locationList } from "./FilterListData";

function LocationFilter() {
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
      <st.CommonLableNameText>지역</st.CommonLableNameText>
      <st.CommonDropDownButton type="button" onClick={handleIsLocationToggled}>
        <div>{selectedLocation}</div>
        <st.CommonUnderButton>지역 선택하기</st.CommonUnderButton>
      </st.CommonDropDownButton>
      {isLocationToggled ? (
        <st.LocationListUl>
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
              <li>{location}</li>
            </div>
          ))}
        </st.LocationListUl>
      ) : null}
    </st.StyleContainer>
  );
}

export default LocationFilter;
