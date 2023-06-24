import styled from "styled-components";

export const Container = styled.div`
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 97%;
  margin: 10px 0px;
`;

export const StyledInput = styled.div`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 10.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #5c5c5c;
`;

// 지도 정보 Container
export const MapInfoContainer = styled.div`
  position: relative; // 숫자 아래 선을 배치하기 위한 부모 컴포넌트 지정
  width: 98.5%;
  height: 500px;
  /* margin-bottom: 30px; */
  border-top: solid 1px #d9d9d9;
  overflow: auto; /* 스크롤 바 스타일링 */
  overflow-x: hidden;
  margin-right: 10px;

  ::-webkit-scrollbar {
    width: 16px; /* 스크롤 바 너비 */
    background-color: #d9d9d9; /* 스크롤 바 배경색 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a4bf3b; /* 스크롤 바 색상 */
    border-radius: 4px; /* 스크롤 바 모서리 둥글기 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #2f5901; /* 스크롤 바 호버 시 색상 */
  }
`;

// 세로선
export const VerticalLine = styled.div`
  position: absolute; // MapInfoContainer 를 부모로 가짐
  width: 1px;
  height: 100%;
  left: 2.6%;
  background-color: #a3bf3b;
  /* z-index: -1; */
`;

// 지도 정보 Wrapper
export const MapInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  /* margin: 32px 5px; */
  padding: 16px 5px;
  /* border: solid 1px black; */
`;

// input - add wrapper.
export const InputAddWrapper = styled.div`
  margin: 10px 0 10px 0;
`;

// 숫자 선 wrapper
export const NumberWithLineWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// 원형 숫자
export const CircleNumbering = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #2e5902;
  color: #ffffff;
  text-align: center;
  margin-right: 8px;
  margin-bottom: 3px;
  font-size: 16px;
  font-family: "Pridi", serif;
  z-index: 1;
`;

// 지도 텍스트 wrapper
export const MapTextWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HoverStyledOverlay = styled.div`
  .wrap {
    display: flex;
    align-items: center;
    border: 3px solid #248cfa;
    border-radius: 10px;
    padding: 3px 3px;
    position: relative;
    height: 25px;
    top: -60px;
    left: 0;
    z-index: 10px;
    background-color: white;
  }
`;

export const StyledOverlay = styled.div`
  .wrap {
    display: flex;
    align-items: center;
    border: 2px solid #2e5902;
    border-radius: 5px;
    padding: 3px 3px;
    position: relative;
    min-height: 35px;
    top: -65px;
    left: 0;
    z-index: 10px;
    background-color: white;
  }

  .body {
    margin: 3px;
  }
  .title {
    font-size: 15px;
    margin-bottom: 1px;
  }

  .address {
    font-size: 13px;
  }
`;

export const MarkerContent = styled.div`
  color: #000;
  font-size: 14px; // 원하는 폰트 크기
  border-radius: 5px;
  width: 100px;
`;

// 방문 장소
export const MapInfoText = styled.div`
  font-size: 16px;
`;

// 방문 날짜
export const MapDateText = styled.div`
  font-size: 12px;
  color: #c5c5c5;
`;

// TextWrapper
export const MapInfoTextWrapper = styled.div`
  border: solid 1px #e7e7e7;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// 지도 정보 삭제 버튼
export const MapInfoDeleteButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 19px;
  background-color: transparent;
  border: solid 1px #d9d9d9;
  border-radius: 50%;
  /* padding: 10px 12px; */
  color: #d9d9d9;
  font-size: 12px;
  height: 18px;
  width: 18px;
  cursor: pointer;
`;

export const XButtonText = styled.span`
  padding-bottom: 1.1px; /* 상단 여백 조정 */
  padding-left: 0.9; /* 좌측 여백 조정 */
`;
