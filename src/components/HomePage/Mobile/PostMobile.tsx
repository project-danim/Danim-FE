import { useNavigate } from "react-router-dom";
import st from "../PostST";

function PostMobile({ post, lastPostRef }: any) {
  // 네비게이션 함수
  const navigate = useNavigate();

  // 자세히 보기 버튼 클릭시
  const handleDetailButtonClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  // 날짜 변환 함수
  const getEndDate = (endDate: number) => {
    const date = new Date(endDate);
    const year = `${date.getFullYear()}`.slice(-2);
    // 한 자리일 경우 0 붙여서 두 자리로 자름
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const tripEndDate = `${year}. ${month}. ${day}`;
    return tripEndDate;
  };

  // 연령대 문자열 배열로 변환 함수
  const getAgeKeyword = (ages: string) => {
    const newAges = ages.split(",");
    return newAges;
  };

  return (
    <st.postContainer
      key={post.id}
      ref={lastPostRef}
      onClick={() => handleDetailButtonClick(post.id)}
    >
      <st.dateText>
        모집 기한 : {getEndDate(post.recruitmentEndDate)}
      </st.dateText>
      <st.expiredPostContainer expired={post.isRecruitmentEnd}>
        <st.postImage src={post.imageUrl} alt="게시글 이미지" />
        <st.postNickname profile={post.userImage}>
          {post.nickname}
        </st.postNickname>
        <st.postTitle>{post.postTitle}</st.postTitle>
        <st.keywordContainer>
          <st.CommonKeywordButton>{post.keyword}</st.CommonKeywordButton>
          <st.CommonKeywordButton>{post.location}</st.CommonKeywordButton>
          {getAgeKeyword(post.ageRange).map((age) => (
            <div key={age}>
              <st.CommonKeywordButton>{age}</st.CommonKeywordButton>
            </div>
          ))}
          <st.CommonKeywordButton>{post.groupSize}명</st.CommonKeywordButton>
        </st.keywordContainer>
      </st.expiredPostContainer>
    </st.postContainer>
    // </st.expiredPostContainer>
  );
}
// React.forwardRef와 같이 고차 컴포넌트(HOC)를 사용하는 경우, 자동으로 컴포넌트 이름을 추정할 수 없으므로, displayName을 직접 설정하는 것이 좋다.
// Post.displayName = "Post";
export default PostMobile;
