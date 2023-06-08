import { useRecoilState } from "recoil";
import { PostGetState } from "../../recoil/post/postGetState";

function PostInformation() {
  // 서버에서 가져온 전체 데이터를 recoil에서 불러옴
  const [postData] = useRecoilState(PostGetState);
  // 수정 중인지 아닌지에 대한 상태를 불러옴

  return (
    <div>
      {postData ? (
        <>
          <h1>제목 : {postData.postTitle}</h1>
          <div>아직 nickname 값 없음</div>
          <div>
            모집인원 : 아직 현재까지 모인 인원 수 없음 / {postData.groupSize}
          </div>
          <div>모집기한 : {postData.recruitmentEndDate}</div>
          <div>
            여행날짜 : {postData.tripStartDate} ~ {postData.tripEndDate}
          </div>
          <div>{postData.keyword}</div>
          <div>{postData.location}</div>
          <div>
            {postData.ageRange?.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
          <div>
            {postData.gender?.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PostInformation;
