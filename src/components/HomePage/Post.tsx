import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  filteredAge,
  filteredGroupSize,
  filteredLocation,
  isSearchClicked,
} from "../../recoil/filter/filterdPost";
import { PostProps } from "../../types/postType";

const Post = React.forwardRef<any, PostProps>(
  ({ post, allFilterList }, ref) => {
    // 지역, 인원수, 연령대 선택값 state
    const [selectedLocation, setSelectedLocation] =
      useRecoilState(filteredLocation);
    const [selectedGroupSize, setSelectedGroupSize] =
      useRecoilState(filteredGroupSize);
    const [selectedAge, setSelectedAge] = useRecoilState(filteredAge);
    // 검색 토글 state
    const [isSearched, handleSearchClicked] = useRecoilState(isSearchClicked);

    // 날짜 변환 함수
    const getEndDate = (endDate: number) => {
      const date = new Date(endDate);
      const year = `${date.getFullYear()}`.slice(-2);
      // 한 자리일 경우 0 붙여서 두 자리로 자름
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const tripEndDate = `${year}-${month}-${day}`;
      return tripEndDate;
    };

    return (
      <div>
        {isSearched ? (
          <div key={post.id} ref={ref}>
            <p>게시글 제목 : {post.title}</p>
            <p>닉네임 : {post.nickname}</p>
            <img src={post.imageUrl} alt="게시글 이미지" />
            <p>
              모집 인원 : {post.numberOfParticipants}/{post.groupSize}
            </p>
            {/* (키워드 / 지역 / 모집인원 / 연령대) */}
            <p>모집 기한 : {getEndDate(post.recruitmentEndDate)}</p>
            <div>게시글 지역 : {post.location}</div>
            <div>게시글 : {post.groupSize}</div>
            <div>게시글 : {post.ageRange}</div>
            <div>게시글자체 키워드 : {post.keyword}</div>
            <button type="button">자세히 보기</button>
          </div>
        ) : (
          <div key={post.id} ref={ref}>
            <p>게시글 제목 : {post.title}</p>
            <p>닉네임 : {post.nickname}</p>
            <img src={post.imageUrl} alt="게시글 이미지" />
            <p>
              모집 인원 : {post.numberOfParticipants}/{post.groupSize}
            </p>
            <p>모집 기한 : {getEndDate(post.recruitmentEndDate)}</p>
            <div>게시글 지역 : {post.location}</div>
            <div>게시글 연령대 : {post.ageRange}</div>
            <button type="button">자세히 보기</button>
          </div>
        )}
      </div>
    );
  }
);
Post.displayName = "Post";
export default Post;
