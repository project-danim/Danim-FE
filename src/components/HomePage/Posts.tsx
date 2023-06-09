import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import {
  allKeywordState,
  filterList,
  filterdPost,
  isSearchClicked,
} from "../../recoil/filter/filterdPost";
import useToggle from "../../hooks/useToggle";
import { fetchAllPosts, fetchSearch } from "../../api/search";
import Post from "./Post";

function Posts() {
  // 전체 게시글 state
  const [allPosts, setAllPosts] = useState<any[]>([]);
  // 검색으로 받은 게시글 state
  const [filteredPosts, setFilteredPosts] = useRecoilState<any[]>(filterdPost);
  // 사용자가 선택한 모든 검색 조건들 state
  const [allFilter, setAllFilter] = useRecoilState<any>(allKeywordState);
  // 키워드(맛집탐방,투어 등) state
  const [allFilterList, setAllFilterList] = useRecoilState<any[]>(filterList);
  // 게시글 페이지 state
  const [page, setPage] = useState(0);
  // 검색 토글 state
  const [isSearched, handleSearchClicked] = useRecoilState(isSearchClicked);
  // 더 이상 불러올 데이터가 있는지 표시하는 상태
  const [hasMore, setHasMore] = useState(true);

  // 옵저버 객체가 참조할 값 생성
  const observer = useRef<any>();
  const lastPostRef = useRef();
  const size = 3;

  // 검색 뮤테이션 함수
  const { mutate: mutateSearch } = useMutation(fetchSearch, {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        handleSearchClicked(true);
        setFilteredPosts((prevData) => [...prevData, ...response.data]);
        // 더 이상 가져올 데이터 없음
        if (response.data.length < size) {
          setHasMore(false);
          console.log(page, "더 이상 가져올 데이터 없음");
        }
      }
    },
    onError: (error) => {
      console.log(error);
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 전체 게시글 조회 뮤테이션 함수
  const { mutate: mutateAllPosts } = useMutation(fetchAllPosts, {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        setAllPosts((prevPosts) => [...prevPosts, ...response.data]);
        // setHasMore(true);
        // 더 이상 가져올 데이터 없음
        if (response.data.length < size) {
          setHasMore(false);
          console.log(page, "더 이상 가져올 데이터 없음");
        }
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 전체 게시글 불러오기
  const getAllPosts = () => {
    // 더 이상 불러올 데이터가 없다면 종료
    if (!hasMore) return;
    mutateAllPosts({ page, size });
  };

  // 검색된 게시글 불러오기
  const getSearchedPosts = () => {
    // 더 이상 불러올 데이터가 없다면 종료
    if (!hasMore) return;
    const allKeyword = allFilter;
    mutateSearch({ allKeyword, page, size });
  };

  // page 값에 따른 전체 게시글 불러오기
  useEffect(() => {
    const getPosts = async () => {
      if (isSearched) {
        await getSearchedPosts();
      } else {
        await getAllPosts();
      }
    };
    getPosts();
  }, [page]);

  // 옵저버 객체 생성
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio >= 1) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
    if (lastPostRef.current) {
      // 데이터가 불러와지기 전에 실행하면 안되니까 lastPostRef.current가 있을때로 조건 생성
      observer.current.observe(lastPostRef.current);
    }
  }, [allPosts, filteredPosts]);

  return (
    <div>
      <p>게시글 리스트</p>
      <div>
        {isSearched ? (
          // 검색이 진행됐을 때 렌더링
          <div>
            {filteredPosts.length !== 0 ? (
              filteredPosts.map((post: any, index) => {
                if (index === filteredPosts.length - 1) {
                  return (
                    <Post
                      ref={lastPostRef}
                      key={post.id}
                      post={post}
                      allFilterList={allFilterList}
                    />
                  );
                }
                return (
                  <Post
                    key={post.id}
                    post={post}
                    allFilterList={allFilterList}
                  />
                );
              })
            ) : (
              <div>게시글이 존재하지 않습니다.</div>
            )}
          </div>
        ) : (
          <div>
            {/* 검색이 진행되지 않았을 때(메인 페이지의 기본값) 렌더링 */}
            {allPosts.length !== 0 ? (
              allPosts.map((post: any, index) => {
                if (index === allPosts.length - 1) {
                  return (
                    <Post
                      ref={lastPostRef}
                      key={post.id}
                      post={post}
                      allFilterList={allFilterList}
                    />
                  );
                }
                return (
                  <Post
                    key={post.id}
                    post={post}
                    allFilterList={allFilterList}
                  />
                );
              })
            ) : (
              <div>조건에 맞는 게시글이 존재하지 않습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Posts;
