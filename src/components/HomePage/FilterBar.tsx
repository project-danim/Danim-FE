import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import {
  ageList,
  groupSizeList,
  keywordList,
  locationList,
} from "./FilterListData";
import { fetchSearch } from "../../api/search";
import {
  allKeywordState,
  filterList,
  filterdPost,
  filteredAge,
  filteredGroupSize,
  filteredLocation,
  isSearchClicked,
} from "../../recoil/filter/filterdPost";
import st from "./FilterBarST";

function FilterBar() {
  // 사용자가 선택한 모든 검색 조건들
  const [allKeywordAtom, setAllKeyword] = useRecoilState(allKeywordState);
  // 검색으로 받은 게시글 state
  const [filteredPosts, setFilteredPosts] =
    useRecoilState<string[]>(filterdPost);

  // 게시글 제목 state
  const [titleValue, handleChangeTitle, ,] = useInput("");
  // 키워드, 지역, 인원수, 연령대 선택값 state
  const [selectedKeyword, setSelectedKeyword] =
    useRecoilState<any[]>(filterList);
  const [selectedLocation, setSelectedLocation] =
    useRecoilState(filteredLocation);
  const [selectedGroupSize, setSelectedGroupSize] =
    useRecoilState(filteredGroupSize);
  const [selectedAge, setSelectedAge] = useRecoilState(filteredAge);
  // 지역, 인원수 버튼 리스트 토글 state
  const [isLocationToggled, handleIsLocationToggled] = useToggle(false);
  const [isGroupSizeToggled, handleIsGroupSizeToggled] = useToggle(false);
  // 현재 검색된 상태인지 토글 state
  const [isSearched, handleSearchClicked] = useRecoilState(isSearchClicked);
  // 더 이상 불러올 데이터가 있는지 표시하는 상태
  const [hasMore, setHasMore] = useState(true);

  // 게시글 페이지 state
  const [page, setPage] = useState(0);
  const size = 3;

  // 검색 뮤테이션 함수
  const { mutate: mutateSearch } = useMutation(fetchSearch, {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        handleSearchClicked(true);
        // 중복된 데이터 또 렌더링 하지 않게 처리
        console.log("여기임...");
        setFilteredPosts((prevData) => [...response.data]);
        // 더 이상 가져올 데이터 없음
        if (response.data.length < size) {
          setHasMore(false);
          console.log(page, "더 이상 가져올 데이터 없음");
        }
      }
    },
    onError: (error) => {
      console.log("애애앵애");
      console.log(error);
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 키워드 선택 핸들러
  const handleSelectKeyword = (e: React.MouseEvent<Element, MouseEvent>) => {
    const keyword = (e.target as Element).textContent || "";

    // 이미 선택된 키워드인지 확인
    const isKeywordSelected = selectedKeyword.includes(keyword);

    if (isKeywordSelected) {
      // 이미 선택된 키워드인 경우 제거
      setSelectedKeyword((prevKeywords) =>
        prevKeywords.filter((word) => word !== keyword)
      );
    } else {
      setSelectedKeyword((prevKeywords) => [...prevKeywords, keyword]);
    }
  };

  // 연령대 선택 핸들러
  const handleSelectedAge = (e: React.MouseEvent<Element, MouseEvent>) => {
    const age = (e.target as Element).textContent || "";

    // 이미 선택된 연령대인지 확인
    const isAgeSelected = selectedAge.includes(age);

    if (isAgeSelected) {
      // 이미 선택된 연령대인 경우 제거
      setSelectedAge((prevKeywords) =>
        prevKeywords.filter((word) => word !== age)
      );
    } else {
      setSelectedAge((prevAges) => [...prevAges, age]);
    }
  };

  // 지역 선택 핸들러
  const handleSelectLocation = (e: React.MouseEvent<Element, MouseEvent>) => {
    // location 기본값을 빈 문자열로 설정
    const location = (e.target as Element).textContent || "";
    setSelectedLocation(location);
    handleIsLocationToggled();
  };

  // 인원수 선택 핸들러
  const handleSelectGroupSize = (e: React.MouseEvent<Element, MouseEvent>) => {
    // groupSize 기본값을 빈 문자열로 설정
    const groupSize = (e.target as Element).textContent || "";
    setSelectedGroupSize(groupSize);
    handleIsGroupSizeToggled();
  };

  // 검색 클릭 핸들러
  const handleClickSearchButton = () => {
    // 배열을 문자로 변환
    const keywordString = selectedKeyword.toString();
    const ageString = selectedAge.toString();
    // 문자를 숫자로 변환
    const groupSizeNumber = Number(selectedGroupSize);

    // 검색 키워드 생성
    const allKeyword = {
      keyword: keywordString !== "" ? keywordString : null,
      location: selectedLocation !== "" ? selectedLocation : null,
      ageRange: ageString !== "" ? ageString : null,
      groupSize: groupSizeNumber !== 0 ? groupSizeNumber : null,
      searchKeyword: titleValue !== "" ? titleValue : null,
    };
    setAllKeyword({ ...allKeyword });
    mutateSearch({ allKeyword, page, size });
  };

  return (
    <st.FilterBarContainer>
      {/* 키워드 필터 박스 */}
      <st.KeywordFilterContainer>
        {keywordList.map((keyword) => (
          <st.CommonButton
            buttonName="keywordButton"
            key={keyword}
            type="button"
            onClick={handleSelectKeyword}
            data-active={selectedKeyword.includes(keyword)}
          >
            {keyword}
          </st.CommonButton>
        ))}
      </st.KeywordFilterContainer>
      {/* 제목, 지역, 인원수, 연령대 필터 박스 */}
      <st.DetailFilterContainer>
        <st.StyleContainer>
          {/* 제목 검색창 */}
          <label htmlFor="searchTitle">
            <st.CommonLableNameText>제목</st.CommonLableNameText>
            <st.TitleInput
              type="text"
              id="searchTitle"
              placeholder="게시글의 제목, 내용을 입력해주세요."
              value={titleValue}
              onChange={handleChangeTitle}
            />
          </label>
          <st.LocationAndSizeContainer>
            {/* 지역 필터 박스 */}
            <st.StyleContainer>
              <st.CommonLableNameText>지역</st.CommonLableNameText>
              <st.CommonDropDownButton
                type="button"
                onClick={handleIsLocationToggled}
              >
                <div>{selectedLocation}</div>
                <st.CommonUnderButton>지역 선택하기</st.CommonUnderButton>
              </st.CommonDropDownButton>
              <ul>
                {isLocationToggled
                  ? locationList.map((location) => (
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
                    ))
                  : null}
              </ul>
            </st.StyleContainer>
            {/* 인원수 필터 박스 */}
            <st.StyleContainer>
              <st.CommonLableNameText>인원수</st.CommonLableNameText>
              <st.CommonDropDownButton
                type="button"
                onClick={handleIsGroupSizeToggled}
              >
                <div>{selectedGroupSize}</div>
                <st.CommonUnderButton>인원수 선택하기</st.CommonUnderButton>
              </st.CommonDropDownButton>
              <ul>
                {isGroupSizeToggled
                  ? groupSizeList.map((groupSize) => (
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
                    ))
                  : null}
              </ul>
            </st.StyleContainer>
          </st.LocationAndSizeContainer>
        </st.StyleContainer>
        {/* 연령대 필터 박스 */}
        <st.AgeContainer>
          <st.CommonLableNameText>연령대</st.CommonLableNameText>
          <st.AgeButtonContainer>
            {ageList.map((age) => (
              <st.CommonButton
                buttonName="ageButton"
                key={age}
                type="button"
                onClick={handleSelectedAge}
                data-active={selectedAge.includes(age)}
              >
                {age}
              </st.CommonButton>
            ))}
          </st.AgeButtonContainer>
        </st.AgeContainer>
      </st.DetailFilterContainer>
      <button type="button" onClick={handleClickSearchButton}>
        검색
      </button>
    </st.FilterBarContainer>
  );
}

export default FilterBar;
