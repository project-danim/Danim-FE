import { useNavigate } from "react-router-dom";
import st from "./PostST";

// const Post = React.forwardRef<any, PostProps>(({ post }, ref) => {
function Post({ post, lastPostRef }: any) {
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
    <st.expiredPostContainer expired={post.isRecruitmentEnd}>
      <st.postContainer key={post.id} ref={lastPostRef}>
        <st.postTitle>{post.title}</st.postTitle>
        <st.postNickname profile={post.userImage}>
          {post.nickname}
        </st.postNickname>
        <st.postImage src={post.imageUrl} alt="게시글 이미지" />
        <st.groupSizeAndDateContainer>
          <p>
            모집 인원 : {post.numberOfParticipants}/{post.groupSize}
          </p>
          <p>모집 기한 : {getEndDate(post.recruitmentEndDate)}</p>
        </st.groupSizeAndDateContainer>
        <st.keywordContainer>
          <st.CommonKeywordButton>{post.keyword}</st.CommonKeywordButton>
          <st.CommonKeywordButton>{post.location}</st.CommonKeywordButton>
          {getAgeKeyword(post.ageRange).map((age) => (
            <div key={age}>
              <st.CommonKeywordButton>{age}</st.CommonKeywordButton>
            </div>
          ))}
        </st.keywordContainer>
        <st.CommonButton
          buttonName="postDetail"
          type="button"
          onClick={() => handleDetailButtonClick(post.id)}
        >
          자세히 보기
        </st.CommonButton>
      </st.postContainer>
    </st.expiredPostContainer>
  );
}
// React.forwardRef와 같이 고차 컴포넌트(HOC)를 사용하는 경우, 자동으로 컴포넌트 이름을 추정할 수 없으므로, displayName을 직접 설정하는 것이 좋다.
// Post.displayName = "Post";
export default Post;
