import { useNavigate } from "react-router-dom";
import st from "./PostST";

// const Post = React.forwardRef<any, PostProps>(({ post }, ref) => {
function Post({ post, lastPostRef }: any) {
  // 네비게이션 함수
  const navigate = useNavigate();

  // 사용자 닉네임 클릭시
  const handleNicknameClick = (userId: number, event: any) => {
    // 현재 이벤트가 상위 DOM 요소로 전파되는 것을 중지
    event.stopPropagation();
    navigate(`/myPage/${userId}`);
  };

  // 자세히 보기 버튼 클릭시
  const handleDetailButtonClick = (id: number, event: any) => {
    // 현재 이벤트가 상위 DOM 요소로 전파되는 것을 중지
    event.stopPropagation();
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
    // <st.expiredPostContainer expired={post.isRecruitmentEnd}>
    <st.postContainer
      key={post.id}
      ref={lastPostRef}
      onClick={(event) => handleDetailButtonClick(post.id, event)}
    >
      <st.postTitle>{post.postTitle}</st.postTitle>
      <st.expiredPostContainer expired={post.isRecruitmentEnd}>
        <st.postNickname
          profile={post.userImage}
          onClick={(event) => handleNicknameClick(post.userId, event)}
        >
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
      </st.expiredPostContainer>
      <st.CommonButton
        buttonName="postDetail"
        type="button"
        onClick={(event) => handleDetailButtonClick(post.id, event)}
      >
        자세히 보기
      </st.CommonButton>
    </st.postContainer>
    // </st.expiredPostContainer>
  );
}
// React.forwardRef와 같이 고차 컴포넌트(HOC)를 사용하는 경우, 자동으로 컴포넌트 이름을 추정할 수 없으므로, displayName을 직접 설정하는 것이 좋다.
// Post.displayName = "Post";
export default Post;
