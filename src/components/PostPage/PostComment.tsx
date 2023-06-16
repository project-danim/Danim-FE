import { useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import { IoFootsteps } from "react-icons/io5";
import { createComment, getComment } from "../../api/comment";
import { postIdState } from "../../recoil/post/postGetState";
import * as Styled from "./PostCommentStyle";

interface Comment {
  id: number;
  comment: string;
  score: number;
}

function PostComment() {
  const [postId] = useRecoilState(postIdState);

  // mile 평점 state
  const [selectedScore, setSelectedScore] = useState<number>(0);
  // 댓글 내용 state
  const [comment, setComment] = useState<string>("");
  // 댓글 목록 state, 작성된 코맨트들
  // const [comments, setComments] = useState<Comment[]>([]);

  // 현재 로그인 중인 유저의 nickname, profileURL
  const userNickname = sessionStorage.getItem("nickname");
  const userprofileUrl = sessionStorage.getItem("profileUrl");

  console.log(userNickname, userprofileUrl);

  // 댓글 불러오기
  const {
    data: fetchedComments = [],
    refetch,
    isLoading,
  } = useQuery(
    ["comments", postId],
    () => getComment(postId),
    { enabled: !!postId } // postId가 존재할 때만 query 실행
  );

  // 댓글 작성 API 호출 (react-query의 useMutation 사용)
  const createCommentMutation = useMutation(
    (newComment) => createComment(newComment, postId),
    {
      onSuccess: () => {
        refetch(); // 댓글 작성 성공 후, 댓글 목록 재요청
      },
    }
  );

  // 선택된 평점 설정 함수
  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
  };

  // 댓글의 내용이 변경될 때 마다 comment 상태 업데이트
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  // 댓글 작성 버튼 클릭시 호출 함수
  const handleSubmit = () => {
    // api로 전달할 코멘트 객체 생성
    const newComment: Comment = {
      // id: Date.now(),
      comment,
      score: selectedScore,
    };

    // 댓글 생성 API 호출
    createCommentMutation.mutate(newComment);
    // 폼 초기화
    setComment("");
    setSelectedScore(0);
  };

  // 댓글 평점
  const commentFootprintRating = (score: number) => {
    const icons = [];
    for (let i = 0; i < score; i++) {
      icons.push(<IoFootsteps size={14} key={i} />);
    }
    return icons;
  };

  // 댓글 작성 날짜 변환
  const commentFormatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  };

  return isLoading ? (
    <div> 로딩중입니다. </div>
  ) : (
    <Styled.Container>
      <Styled.UserInFoAndButtonWrapper>
        <Styled.UserProfile src={`${userprofileUrl}`} />
        <Styled.UserNickname>{userNickname}</Styled.UserNickname>
        {[1, 2, 3, 4, 5].map((score) => (
          <Styled.FootButton
            key={score}
            onClick={() => handleScoreSelect(score)}
            style={{ color: score <= selectedScore ? "black" : "gray" }}
          >
            <IoFootsteps size={20} />
          </Styled.FootButton>
        ))}
      </Styled.UserInFoAndButtonWrapper>
      <Styled.AddInputButtonWrapper>
        <Styled.CommentInput
          placeholder="발자국 개수로 여행을 평가해주세요."
          value={comment}
          onChange={handleCommentChange}
        />
        <Styled.AddCommentButton type="button" onClick={handleSubmit}>
          후기 올리기
        </Styled.AddCommentButton>
      </Styled.AddInputButtonWrapper>
      <Styled.CommentContainer>
        {fetchedComments.map((comment) => (
          <Styled.CommnetWrapper key={comment.id}>
            <Styled.CommentWriterWrapper>
              <Styled.CommentUserProfile
                src={`${comment.userImageUrl}`}
                alt={`${comment.userImageUrl}`}
              />
              <Styled.CommentUserNickname>
                {comment.nickname}
              </Styled.CommentUserNickname>
              <Styled.FootprintRating>
                {commentFootprintRating(comment.score)}
              </Styled.FootprintRating>
              <p> 작성일 ㅣ {commentFormatDate(comment.createdAt)}</p>
            </Styled.CommentWriterWrapper>
            <Styled.CommentContent>{comment.comment}</Styled.CommentContent>
          </Styled.CommnetWrapper>
        ))}
      </Styled.CommentContainer>
    </Styled.Container>
  );
}

export default PostComment;
