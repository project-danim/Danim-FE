import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import useInput from "../../hooks/useInput";
import { ageList, keywordList, mainKeyword } from "./FilterListData";
import { fetchSearch } from "../../api/search";
import {
  allKeywordState,
  filterList,
  filterdPost,
  filteredAge,
  filteredGroupSize,
  filteredLocation,
  isRecruitmentEndState,
  isSearchClicked,
} from "../../recoil/filter/filterdPost";
import st from "./FilterBarST";
import common from "./PostST";
import { searchedPageState } from "../../recoil/scroll/scroll";
import RecruitmentEndButton from "./RecruitmentEndButton";
import LocationFilter from "./Location";
import GroupSize from "./GroupSize";

function FilterBar() {
  // 사용자가 선택한 모든 검색 조건들
  const [allFilter, setAllKeyword] = useRecoilState<any>(allKeywordState);
  // 검색으로 받은 게시글 state
  const [, setFilteredPosts] = useRecoilState<any[]>(filterdPost);
  // 게시글 제목 state
  const [titleValue, handleChangeTitle, ,] = useInput("");
  // 게시글 키워드, 지역, 인원수, 연령대 선택값 state
  const [selectedKeyword, setSelectedKeyword] =
    useRecoilState<any[]>(filterList);
  const [selectedLocation] = useRecoilState(filteredLocation);
  const [selectedGroupSize] = useRecoilState(filteredGroupSize);
  const [selectedAge, setSelectedAge] = useRecoilState(filteredAge);
  // 현재 검색된 상태인지 토글 state
  const [searchClicked, handleSearchClicked] = useRecoilState(isSearchClicked);
  // 더 이상 불러올 데이터가 있는지 표시하는 상태
  const [hasMore, setHasMore] = useState(true);
  // 검색 게시글 페이지 state
  const [searchedPage, setSearchedPage] =
    useRecoilState<any>(searchedPageState);
  // 옵저버 객체가 참조할 값 생성
  const size = 8;
  // 모집 마감 게시글을 포함할지 상태 (기본값 false)
  const [isRecruitmentEnd] = useRecoilState(isRecruitmentEndState);

  // 검색 뮤테이션 함수
  const { mutate: mutateSearch } = useMutation(fetchSearch, {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        // 검색 됐는지에 대한 boolean 값 true로 변경
        handleSearchClicked(() => true);
        if (searchedPage === 0) {
          setFilteredPosts([...response.data]);
        }
        // 중복된 데이터 제거해서 보여주기
        if (searchedPage !== 0) {
          setFilteredPosts((prevPosts) => {
            const newPosts = response.data.filter(
              (newPost: any) =>
                !prevPosts.some((prevPost: any) => prevPost.id === newPost.id)
            );
            return [...prevPosts, ...newPosts];
          });
        }

        // 더 이상 가져올 데이터 없음
        if (response.data.length < size) {
          console.log("더이상 가져올 데이터없음");
          setHasMore(false);
        }
      }
    },
    onError: () => {
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 검색된 게시글 불러오기
  const getSearchedPosts = (keyword: any) => {
    // 더 이상 불러올 데이터가 없다면 종료
    if (!hasMore) return;
    if (searchClicked) {
      mutateSearch({ allKeyword: keyword, page: searchedPage, size });
    }
  };

  // searchClicked 상태가 변경되면 페이지 0으로 초기화
  useEffect(() => {
    setSearchedPage(0);
  }, [searchClicked]);

  // searchedPage 상태가 변경되면 검색을 실행
  useEffect(() => {
    if (searchClicked) {
      const getPosts = async () => {
        await getSearchedPosts(allFilter);
      };
      getPosts();
    }
  }, [searchedPage, searchClicked]);

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
    let age = (e.target as Element).textContent || "";
    if (age === "60대 이상") {
      age = "60대이상";
    }
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

  // 검색 클릭 핸들러
  const handleClickSearchButton = () => {
    // 페이지를 초기화합니다.
    setSearchedPage(0);
    // 기존의 값을 토글해서 페이지 재설정을 트리거합니다.
    handleSearchClicked(() => true);
    setHasMore(() => true);

    const keywordString = selectedKeyword.toString();
    const ageString = selectedAge.toString();
    const groupSizeNumber = Number(selectedGroupSize);
    const allKeyword = {
      keyword: keywordString !== "" ? keywordString : null,
      location: selectedLocation !== "" ? selectedLocation : null,
      ageRange: ageString !== "" ? ageString : null,
      groupSize: groupSizeNumber !== 0 ? groupSizeNumber : null,
      searchKeyword: titleValue !== "" ? titleValue : null,
      exceptCompletedPost: isRecruitmentEnd,
    };
    setAllKeyword({ ...allKeyword });
    // 검색 실행
    getSearchedPosts(allKeyword);
  };

  return (
    <st.FilterBarContainer>
      {/* 키워드 필터 박스 */}
      <st.KeywordFilterContainer>
        {keywordList.map((keyword, index) => (
          <st.CommonButton
            buttonName="keywordButton"
            key={keyword}
            type="button"
            onClick={handleSelectKeyword}
            data-active={selectedKeyword.includes(keyword)}
            url={mainKeyword[index] || ""}
          >
            {keyword}
          </st.CommonButton>
        ))}
      </st.KeywordFilterContainer>
      {/* 제목, 지역, 인원수, 연령대, 모집 마감 박스 */}
      <st.RecruitEndAndDetailContainer>
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
              {/* 지역 선택 필터 */}
              <LocationFilter />
              {/* 인원수 필터 박스 */}
              <GroupSize />
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
                  data-active={
                    age !== "60대 이상"
                      ? selectedAge.includes(age)
                      : selectedAge.includes("60대이상")
                  }
                >
                  {age}
                </st.CommonButton>
              ))}
            </st.AgeButtonContainer>
          </st.AgeContainer>
        </st.DetailFilterContainer>
        <RecruitmentEndButton />
      </st.RecruitEndAndDetailContainer>
      <common.CommonButton
        buttonName="search"
        type="button"
        onClick={handleClickSearchButton}
      >
        검색
      </common.CommonButton>
    </st.FilterBarContainer>
  );
}

export default FilterBar;
