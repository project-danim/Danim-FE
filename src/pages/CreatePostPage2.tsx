import { ScheduleMap, TextImageInput } from "../components/createPostPage2";

function CreatePostPage2() {
  return (
    <div>
      <h3>글 작성</h3>
      <TextImageInput />

      <h3>스케줄지도</h3>
      <ScheduleMap />
    </div>
  );
}

export default CreatePostPage2;
