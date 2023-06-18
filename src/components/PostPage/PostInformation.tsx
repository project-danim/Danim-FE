import { useRecoilState } from "recoil";
import { PostGetState } from "../../recoil/post/postGetState";
import * as Styled from "./PostInformationStyle";

function PostInformation() {
  // 서버에서 가져온 전체 데이터를 recoil에서 불러옴
  const [postData] = useRecoilState(PostGetState);
  // 수정 중인지 아닌지에 대한 상태를 불러옴

  return (
    <Styled.Container>
      {postData ? (
        <>
          <Styled.TitleWrapper>{postData.postTitle}</Styled.TitleWrapper>
          <Styled.NicknameWrapper>
            <Styled.ProfileImage src={`${postData.myPageImageUrl}`} />
            <div>{postData.nickName}</div>
          </Styled.NicknameWrapper>
          <Styled.TextWapper>
            모집인원 : {postData.numberOfParticipants} / {postData.groupSize}
          </Styled.TextWapper>
          <Styled.DateWrapper>
            <Styled.TextWapper>
              모집기한 : {postData.recruitmentEndDate}
            </Styled.TextWapper>
            <Styled.TextWapper />
            <Styled.TextWapper>
              <Styled.DateVerticalLine />
              출발 날짜 : {postData.tripStartDate}
            </Styled.TextWapper>
            <Styled.TextWapper>
              도착 날짜 : {postData.tripEndDate}
            </Styled.TextWapper>
          </Styled.DateWrapper>
          <Styled.KeywordWrapper>
            <Styled.SingleKeywordWrapper>
              {postData.keyword}
            </Styled.SingleKeywordWrapper>
            <Styled.SingleKeywordWrapper>
              {postData.location}
            </Styled.SingleKeywordWrapper>
            <Styled.AgeGenderWrapper>
              {postData.ageRange?.map((value) => (
                <Styled.SingleKeywordWrapper key={value}>
                  {value}
                </Styled.SingleKeywordWrapper>
              ))}
            </Styled.AgeGenderWrapper>
            <Styled.AgeGenderWrapper>
              {postData.gender?.map((value) => (
                <Styled.SingleKeywordWrapper key={value}>
                  {value}
                </Styled.SingleKeywordWrapper>
              ))}
            </Styled.AgeGenderWrapper>
          </Styled.KeywordWrapper>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Styled.Container>
  );
}

export default PostInformation;
