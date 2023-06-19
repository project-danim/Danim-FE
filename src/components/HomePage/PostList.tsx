import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { filterdPost, isSearchClicked } from "../../recoil/filter/filterdPost";
import { fetchAllPosts } from "../../api/search";
import PostContainer from "./PostContainer";
import { searchedPageState } from "../../recoil/scroll/scroll";

function PostList() {
  // 사용자가 선택한 모든 검색 조건들
  // const [allFilter] = useRecoilState<any>(allKeywordState);

  // 전체 게시글 state
  const [allPosts, setAllPosts] = useState<any[]>([]);
  // 검색으로 받은 게시글 state
  // const [filteredPosts, setFilteredPosts] = useRecoilState<any[]>(filterdPost);
  const [filteredPosts] = useRecoilState<any[]>(filterdPost);
  // 검색 게시글 페이지 state
  const [, setSearchedPage] = useRecoilState<any>(searchedPageState);
  // 검색 토글 state
  const [isSearched] = useRecoilState(isSearchClicked);
  // 더 이상 불러올 데이터가 있는지 표시하는 상태
  const [hasMore, setHasMore] = useState(true);
  // 전체 게시글 페이지 state
  const [page, setPage] = useState(0);
  // 옵저버 객체가 참조할 값 생성
  const observer = useRef<any>();
  const lastPostRef = useRef();
  const size = 8;

  // 검색 뮤테이션 함수
  // const { mutate: mutateSearch } = useMutation(fetchSearch, {
  //   onSuccess: (response) => {
  //     if (response.statusCode === 200) {
  //       // 검색 됐는지에 대한 boolean 값 true로 변경
  //       handleSearchClicked(() => true);
  //       if (searchedPage === 0) {
  //         setFilteredPosts([...response.data]);
  //       }
  //       // 중복된 데이터 제거해서 보여주기
  //       if (searchedPage !== 0) {
  //         setFilteredPosts((prevPosts) => {
  //           const newPosts = response.data.filter(
  //             (newPost: any) =>
  //               !prevPosts.some((prevPost: any) => prevPost.id === newPost.id)
  //           );
  //           return [...prevPosts, ...newPosts];
  //         });
  //       }

  //       // 더 이상 가져올 데이터 없음
  //       if (response.data.length < size) {
  //         // console.log("더이상 가져올 데이터없음");
  //         setHasMore(false);
  //       }
  //     }
  //   },
  //   onError: () => {
  //     alert("요청이 실패했습니다. 다시 시도해주세요!");
  //   },
  // });

  // 전체 게시글 조회 뮤테이션 함수
  const { mutate: mutateAllPosts } = useMutation(fetchAllPosts, {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        setAllPosts((prevPosts) => {
          // 새로운 포스트만 필터링
          const newPosts = response.data.filter(
            (newPost: any) =>
              !prevPosts.some((prevPost) => prevPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
        if (response.data.length < size) {
          setHasMore(false);
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

  // page 값에 따른 전체 게시글 불러오기
  useEffect(() => {
    if (!isSearched) {
      const getPosts = async () => {
        await getAllPosts();
      };
      getPosts();
    }
    // if (isSearched) {
    //   const getSearchedPosts = () => {
    //     const allKeyword = allFilter;
    //     mutateSearch({ allKeyword, page: searchedPage, size });
    //   };
    //   getSearchedPosts();
    // }
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    if (isSearched) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRatio >= 1) {
            // 테스트할때 다시 살려서 사용하기
            // console.log("ssss");
            setSearchedPage((prev: number) => prev + 1);
          }
        },
        { threshold: 1 }
      );
      if (lastPostRef.current) {
        // 데이터가 불러와지기 전에 실행하면 안되니까 lastPostRef.current가 있을때로 조건 생성
        observer.current.observe(lastPostRef.current);
      }
    } else {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRatio >= 1) {
            // 테스트할때 다시 살려서 사용하기
            // console.log("hihi");
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1 }
      );
      if (lastPostRef.current) {
        // 데이터가 불러와지기 전에 실행하면 안되니까 lastPostRef.current가 있을때로 조건 생성
        observer.current.observe(lastPostRef.current);
      }
    }
  }, [allPosts, filteredPosts]);

  // 테스트할때 사용
  // useEffect(() => {
  //   console.log(searchedPage);
  // }, [searchedPage]);

  return (
    <div>
      {isSearched ? (
        <PostContainer
          postName="searchedPost"
          posts={filteredPosts}
          lastPostRef={lastPostRef}
        />
      ) : (
        <PostContainer
          postName="allPost"
          posts={allPosts}
          lastPostRef={lastPostRef}
        />
      )}
    </div>
  );
}
export default PostList;
