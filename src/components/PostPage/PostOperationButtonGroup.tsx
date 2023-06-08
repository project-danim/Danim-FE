import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postIdState } from "../../recoil/post/postGetState";
import { deletePost } from "../../api/post";

function PostOperationButtonGroup() {
  const [postId] = useRecoilState(postIdState);
  const navigate = useNavigate();

  // 게시물 수정
  const handleEdit = () => {
    navigate(`/edit-post/step1/${postId}`);
  };

  // 게시물 삭제
  const deletePostMutation = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      console.log(`게시물 ${postId}를 삭제했습니다.`);
      navigate("/home");
    },
    onError: (error) => {
      console.error(`게시물 삭제에 실패했습니다: ${error}`);
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(postId);
  };

  // 모임 신청
  const handleApply = () => {};

  return (
    <div>
      <button type="button" onClick={handleEdit}>
        수정
      </button>
      <button type="button" onClick={handleDelete}>
        삭제
      </button>
      <button type="button" onClick={handleApply}>
        모임 신청하기
      </button>
    </div>
  );
}

export default PostOperationButtonGroup;
