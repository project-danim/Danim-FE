import { useRecoilValue } from "recoil";
import { createPost } from "../api/post";
import { ScheduleMap, TextImageInput } from "../components/createPostPage2";
import { postState } from "../recoil/post/postSelector";

function CreatePostPage2() {
  const postData = useRecoilValue(postState);

  const handleSubmit = async () => {
    // console.log(`서버로 전송될 데이터`, postData);
    // const formData = new FormData();
    // Object.keys(postData).forEach((key) => {
    //   formData.append(key, postData[key]);
    // });
    // try {
    //   const response = await createPost(formData);
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      {/* <h3>글 작성</h3>
      <TextImageInput /> */}

      <h3>스케줄지도</h3>
      <ScheduleMap />
      <button type="button" onClick={handleSubmit}>
        모임만들기
      </button>
    </div>
  );
}

export default CreatePostPage2;
