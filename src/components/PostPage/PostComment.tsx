import { useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import { IoFootstepsOutline } from "react-icons/io5";
import { createComment, getComment } from "../../api/comment";
import { postIdState } from "../../recoil/post/postGetState";

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

  return isLoading ? (
    <div> 로딩중입니다. </div>
  ) : (
    <div>
      <h2>댓글 작성</h2>
      <div>
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            type="button"
            key={score}
            onClick={() => handleScoreSelect(score)}
            style={{ color: score <= selectedScore ? "black" : "gray" }}
          >
            <IoFootstepsOutline />
          </button>
        ))}
      </div>
      <input value={comment} onChange={handleCommentChange} />
      <button type="button" onClick={handleSubmit}>
        댓글 작성
      </button>
      <h2>댓글 목록</h2>
      <ul>
        {fetchedComments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>평점: {comment.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostComment;
