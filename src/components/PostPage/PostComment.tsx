import { useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import { IoFootstepsOutline } from "react-icons/io5";
import { createComment } from "../../api/comment";
import { postIdState } from "../../recoil/post/postGetState";

interface Comment {
  id: number;
  comment: string;
  score: number;
}

function PostComment() {
  const [postId] = useRecoilState(postIdState);
  console.log(postId);

  // mile 평점 state
  const [selectedScore, setSelectedScore] = useState<number>(0);
  // 댓글 내용 state
  const [comment, setComment] = useState<string>("");
  // 댓글 목록 state, 작성된 코맨트들
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 작성
  const createCommentMutation = useMutation<Comment, Error>(
    (newComment) => createComment(newComment, postId),
    {
      onSuccess: (data) => {
        const updatedComments = [...comments, data];
        setComments(updatedComments);
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

    // createCommentMutation 함수로 댓글 생성 API 로 데이터를 보냄 (newComment)
    createCommentMutation.mutate(newComment);
    setComment("");
    setSelectedScore(0);
  };

  // 댓글 삭제 버튼 클릭 호출 함수
  // const handleDeleteComment = (commentId: number) => {
  //   const updatedComments = comments.filter(
  //     (comment) => comment.id !== commentId
  //   );
  //   setComments(updatedComments);
  // };

  return (
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
      <textarea value={comment} onChange={handleCommentChange} />
      <button type="button" onClick={handleSubmit}>
        댓글 작성
      </button>

      <h2>댓글 목록</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>평점: {comment.score}</p>

            {/* 삭제 버튼
            <button
              type="button"
              onClick={() => handleDeleteComment(comment.id)}
            >
              삭제
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostComment;
