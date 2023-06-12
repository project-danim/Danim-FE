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
  color: #a3a3a3;
`;

// 지도 정보 Container
export const MapInfoContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 30px;
  border-top: solid 1px black;
  overflow: auto; /* 스크롤 바 스타일링 */
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 16px; /* 스크롤 바 너비 */
    background-color: #f2f2f2; /* 스크롤 바 배경색 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a4bf3b; /* 스크롤 바 색상 */
    border-radius: 4px; /* 스크롤 바 모서리 둥글기 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #2f5901; /* 스크롤 바 호버 시 색상 */
  }
`;

// 지도 정보 Wrapper
export const MapInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin: 32px 5px;
`;

// input - add wrapper.
export const InputAddWrapper = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
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
  display: flex;
  justify-content: space-between;
`;

// 지도 정보 삭제 버튼
export const MapInfoDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12.5px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 7px;
  padding: 10px 12px;
  font-size: 16px;
  height: 30px;
  cursor: pointer;
`;
