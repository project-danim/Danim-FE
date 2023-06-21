// ReviewAreaStyles.ts
import styled from "styled-components";

// export const Space = styled.div`
//   height: 114px;
// `; 이거 대신 최상위 태그에 margin-top

// 마이페이지 전체 컨테이너
export const MyPageContainer = styled.div`
  position: relative;
  height:2000px
`;


// 사용자 프로필 프롭 타입
type UserProfileProp = {
  userProfile: string;
};
// 점수와 닉네임 컨테이너
export const ScoreAndNicknameContainer = styled.div`
  display: flex;
  align-items: center;
`;
// 점수
export const Score = styled.div`
  color: 000000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px;
  border-radius: 20px;
  background-color: #F3F6FA;
  &::after {
    content: "mile";
    text-align: center;
    padding: 2px 4px;
    color: #FFFFFF;
    width: 34px;
    height: 21px;
    background-color: #7EA8E3;
    border-radius: 6px;
    margin-left: 8px;
  }
`;
// 프로필 박스 영역
export const ProfileArea = styled.div`
  /* height: 315px; */
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 42px 17px 41px 37px;
  box-sizing: border-box;
  margin-top: 93px;
  justify-content: flex-start;
  position: relative;
`;
// 프로필 박스 내 이미지 박스 영역
export const ImageBox = styled.div<UserProfileProp>`
  width: 232px;
  height: 232px;
  margin-right: 25px;
  /* 이런 에러가 뜸 */
  /* Failed to load url /mypage (resolved id: /mypage).
  This file is in /public and will be copied as-is during
  build without going through the plugin transforms, and
  herefore should not be imported from source code. It can only be referenced via HTML tags. */
  /* background-image: ${(props) => `url(${props.userProfile})`}; */
`;
// 프로필 박스 내 이미지 업로드 영역(원, 클릭시~)
export const ImageArea = styled.div`
  background-image: url("myPage/userProfile.svg");
  width: 232px;
  height: 232px;
  border-radius: 200px;
`;
export const FlexBox = styled.div`
  display: flex;
`;
// 유저인포(스코어, 닉네임, 수정)영역
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
// 유저 스코어 영역(mile 상위태그)
export const ProfileMileContainer = styled.div`
  /* width: 79px;
  height: 33px;
  border: 1px solid rgba(243, 246, 250, 1);
  border-radius: 20px;
  background-color: rgba(243, 246, 250, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 17px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
// 유저 닉네임 영역
export const UserNickName = styled.div`
  /* width: 70px; */
  height: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-left: 8px;
  margin-top: 2px;
  & > span {
    font-weight: 400;
  }
`;
// 수정 버튼 영역
export const FixButton = styled.button`
  width: 107px;
  height: 42px;
  border: 1px solid rgba(213, 213, 213, 1);
  border-radius: 8px;
  background-color: white;
  color: rgba(133, 133, 133, 1);
  cursor: pointer;
`;
// 텍스트 입력 영역
export const TextArea = styled.textarea<any>`
  height: 184px;
  font-size: 15px;
  border: 1px solid #D6D6D6;
  border-radius: 5px;
  resize: none;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 6px;



  
`;
export const ReviewMile = styled.div`
  width: 75px;
  height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ReviewContainer = styled.div`
height: 254px;
border-bottom:  0.5px solid #A3A3A3;

`



// 후기, 게시글 영역
export const PostContainer = styled.div`
height: 254px;
border-bottom:  0.5px solid #A3A3A3;
display:flex
`

export const TextContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 591px;
height: 195px;
`

export const PostTitle = styled.div`
width: 250px;
height: 24px;
padding: 20px;
font-family: Pretendard;
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: #000000;
`

export const PostDate = styled.div`
padding:10px 20px;

`

export const PostContent = styled.div`
width: 591px;
height: 97px;
padding:20px;

`

export const FormmatedImage = styled.img``

export const ImageContainer = styled.div`
position: absolute;
right: 25px;
margin-top: 23px;

`

export const CreatedTime = styled.div`
  color: rgba(133, 133, 133, 1);
  width: 74px;
  height: 34px;
`;
export const ReviewNickName = styled.div`
  width: 118px;
  height: 36px;
  color: rgba(0, 0, 0, 0.5);
`;
export const ReviewContents = styled.div`
  width: 458px;
  height: 59px;
  color: rgba(0, 0, 0, 1);
`;
// 탈퇴하기 버튼
export const WithDrawalButton = styled.button`
  border: none;
  position: absolute;
  color: #C2C2C2;
  top: 310px;
  right: 15px;
  background: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
`;
// 뒤로가기 버튼
export const MoveBackButton = styled.button`
  background-image: url("myPage/moveBack.svg");
  width: 50px;
  height: 50px;
  border: none;
  position: absolute;
  top: 13px;
  left: 4px;
  text-indent: -9999px;
  background-color: transparent;
  cursor: pointer;
`;

export const ProfileFixButton = styled.button`
background-image: url("myPage/profileFixButton.svg");
width: 30px;
height: 30px;
border: none;
position: absolute;
top: 240px;
left:220px;
background-color: transparent;
cursor: pointer;

`

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 120px;
`;

// 버튼 Wrapper
export const TabButtonWrapper = styled.div`
  width: 100%;
  border-bottom: 0.25px solid #c2c2c2;
`;

// 탭 버튼
export const TabButton = styled.button<{ active: boolean }>`
  font-size: 16px;
  padding: 30px 10px;
  width: 50%;
  background-color: transparent;
  color: ${({ active }) => (active ? "#5C5C5C" : "#C2C2C2")};
  border: none;
  cursor: pointer;
  border-bottom: ${({ active }) =>
    active ? "11px solid #A3BF3B" : "11px solid transparent"};
`;

export const TabContent = styled.div`
  width: 100%;
`;

export const FormattedPostTitle = styled.div`
width: 250px;
height: 24px;
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
`


