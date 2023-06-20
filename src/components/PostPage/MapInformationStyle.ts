import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MapContainer = styled.div`
  flex: 1;
  margin: 15px;
`;

// 지도 정보 Container
export const MapInfoContainer = styled.div`
  flex: 1;
  position: relative; // 숫자 아래 선을 배치하기 위한 부모 컴포넌트 지정
  width: 98%;
  height: 100%;
  overflow: auto; /* 스크롤 바 스타일링 */
  overflow-x: hidden;

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
  top: 0;
  bottom: 0;
  /* height: 100%; */
  left: 2.6%;
  background-color: #a3bf3b;
  /* z-index: -1; */
`;

// 지도 정보 Wrapper
export const MapInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  /* width: 95%; */
  /* margin: 0 10px; */
  padding: 16px 5px;
  /* border: solid 1px black; */
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
  z-index: 3;
`;

// 지도 텍스트 wrapper
export const MapTextWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-right: 30px;
  display: flex;
  justify-content: space-between;
`;
