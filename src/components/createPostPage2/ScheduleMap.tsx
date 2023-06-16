import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  MapMarker,
  Polyline,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedInfosState,
  tripEndDateState,
  tripStartDateState,
} from "../../recoil/post/postCreateState";
import { CommonButton, CommonInput } from "../common";
import * as Styled from "./ScheduleMapStyle";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

type Props = {
  value?: string;
  onClick?: () => void;
};

const defaultProps: Props = {
  value: "",
  onClick: () => {},
};

// DatePicker 스타일링 - Start
const CustomDateInput = React.forwardRef<HTMLDivElement, Props>(
  ({ value, onClick }, ref) => (
    <Styled.StyledInput onClick={onClick} ref={ref}>
      {value || "출발 날짜를 알려주세요."}
    </Styled.StyledInput>
  )
);
CustomDateInput.displayName = "CustomStartInput";
CustomDateInput.defaultProps = defaultProps;

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string; // 마커의 주소정보 저장
}

const days = ["일", "월", "화", "수", "목", "금", "토"];

function ScheduleMap() {
  // 글 수정 - 서버에서 가져온 PostState에서 content와 imageUrls 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { map: prevMapInfo } = getPostData || {};

  // const parsedMap = JSON.parse(prevMapInfo);
  let parsedMap: unknown;
  if (prevMapInfo) {
    parsedMap = JSON.parse(prevMapInfo);
  }

  // Date Picker에서 여행 날짜에 따라 선택 가능한 날짜의 범위
  const [tripStartDate] = useRecoilState(tripStartDateState);
  const [tripEndDate] = useRecoilState(tripEndDateState);
  const tripStartDateObj = tripStartDate ? new Date(tripStartDate) : null;
  const tripEndDateObj = tripEndDate ? new Date(tripEndDate) : null;

  // 수정 중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 사용자가 선택한 장소와 날짜를 저장하는 [] state
  const [selectedMapInfos, setSelectedMapInfos] =
    useRecoilState(selectedInfosState);

  // recoil의 state 값 저장
  useEffect(() => {
    if (postIsEditing && Array.isArray(parsedMap)) {
      const convertedMap = parsedMap.map((item: any) => ({
        info: {
          address: item.info.address,
          content: item.info.content,
          position: item.info.position,
        },
        date: new Date(item.date),
        id: item.id,
      }));
      setSelectedMapInfos(convertedMap);
    }
  }, []);

  // 지도의 state
  const [mapInfo, setMapInfo] = useState<kakao.maps.Map | null>(null);

  // 검색된 마커 중 선택한 마커의 정보 state
  const [info, setInfo] = useState<MarkerType | null>(null);

  // 검색시 지도에 표시되는 마커들의 정보 state
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  // 사용자가 input에 장소를 입력한 state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 사용자가 장소별 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const today = new Date(); // datePicker에서 오늘의 날짜 이후를 선택 가능하게 하기 위한 today

  // 지도 검색과 그 마커들을 표시
  const searchPlaces = () => {
    if (!mapInfo || !searchTerm) return; // searchTerm 이 비어있다면 종료!
    const kakaoPlace = new kakao.maps.services.Places();
    kakaoPlace.keywordSearch(searchTerm, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = data.map((item) => {
          const marker = {
            position: {
              lat: parseFloat(item.y),
              lng: parseFloat(item.x),
            },
            content: item.place_name,
            address: item.address_name,
          };
          bounds.extend(
            new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
          );
          return marker;
        });
        setMarkers(newMarkers);
        mapInfo.setBounds(bounds);
      }
    });
  };

  useEffect(() => {
    searchPlaces();
  }, [mapInfo, searchTerm]);

  // 선택된 장소와 시간들을 추가한 후 검색 키워드들을 삭제
  const addSelectedInfo = () => {
    if (info && selectedDate) {
      setSelectedMapInfos([
        ...selectedMapInfos,
        { info, date: selectedDate, id: Date.now().toString() },
      ]);
      setMarkers([]);
      setInfo(null);
      setSelectedDate(null);
      setSearchTerm("");
    }
  };

  // 지도 정보의 세로선
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // map 세로선에 대한 css 처리
  useEffect(() => {
    if (lineRef.current !== null) {
      const observer = new MutationObserver(() => {
        if (containerRef.current !== null && lineRef.current !== null) {
          lineRef.current.style.height = `${containerRef.current.scrollHeight}px`;
        }
      });

      if (containerRef.current !== null) {
        observer.observe(containerRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      // Clean up
      return () => observer.disconnect();
    }

    // If refs are not defined, return an empty cleanup function
    return () => {};
  }, []);

  return (
    <Styled.Container>
      <Styled.Wrapper>
        {/* 지도 */}
        <Map
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{
            width: "100%",
            height: "300px",
          }}
          level={6}
          onCreate={setMapInfo}
        >
          {/* 검색된 마커들의 정보를 표시 */}
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}

          {/* 선택된 장소 연결선 */}
          <Polyline
            path={selectedMapInfos.map(
              (selectedInfo) => selectedInfo.info.position
            )}
            strokeWeight={3} // 선의 두께
            strokeColor="black" // 선의 색깔
            strokeOpacity={0.5} // 선의 불투명도 ( 0 - 1 / 투명 -> 불투명)
            strokeStyle="solid" // 선의 스타일
          />

          {/* 선택된 마커들의 정보를 표시 - 커스텀오버레이 (svg 형식) */}
          {selectedMapInfos.map((selectedInfo, index) => (
            <CustomOverlayMap
              key={`marker-${selectedInfo.info.content}-${selectedInfo.info.position.lat},
            ${selectedInfo.info.position.lng}`}
              position={selectedInfo.info.position}
              // onClick={() => setInfo(selectedInfo.info)}
            >
              {/* 지도 pin - svg */}
              <svg
                width="41"
                height="41"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트가 CustomOverlayMap의 onClick 이벤트와 충돌하지 않도록 이벤트 전파 중단
                  setInfo(selectedInfo.info);
                }}
              >
                {/* 지도 pin - svg */}
                <path
                  d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.28 12 24 12 
                24C12 24 20.5 14.28 20.5 8.5C20.5 3.81 16.69 0 12 
                0ZM12 12.75C10.83 12.75 9.875 11.795 9.875 10.625C9.875 9.455 10.83 8.5 12 
                8.5C13.17 8.5 14.125 9.455 14.125 10.625C14.125 11.795 13.17 12.75 12 12.75Z"
                  fill="#2e5902"
                  stroke="#2e5902"
                  strokeWidth="0.5"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="5.5"
                  fill="#2e5902"
                  // stroke="#1c72ce"
                  strokeWidth="0.5"
                />
                <text
                  x="11.7"
                  y="12.5"
                  fill="#fbfbfb"
                  textAnchor="middle"
                  fontSize="9"
                >
                  {index + 1}
                </text>
              </svg>
            </CustomOverlayMap>
          ))}
        </Map>

        {/* 날짜 선택 캘린더 */}
        <Styled.InputAddWrapper>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            minDate={tripStartDateObj} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
            maxDate={tripEndDateObj} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
            placeholderText="출발 날짜를 알려주세요."
            customInput={<CustomDateInput />}
          />
        </Styled.InputAddWrapper>

        {/* 검색 input */}
        <Styled.InputAddWrapper>
          <CommonInput
            type="text"
            placeholder="장소를 추가해주세요."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Styled.InputAddWrapper>

        {/* 선택 정보 저장 버튼 */}
        <Styled.InputAddWrapper>
          <CommonButton type="button" onClick={addSelectedInfo}>
            + 등록하기
          </CommonButton>
        </Styled.InputAddWrapper>
        <Styled.MapInfoContainer ref={containerRef}>
          {/* 선택한 정보를 화면에 표시 */}
          <Styled.VerticalLine ref={lineRef} />
          {[...selectedMapInfos].reverse().map((selectedInfo, index) => (
            <Styled.MapInfoWrapper key={selectedInfo.id}>
              <Styled.NumberWithLineWrapper>
                {/* 넘버링 */}
                <Styled.CircleNumbering>
                  {selectedMapInfos.length - index}
                </Styled.CircleNumbering>
              </Styled.NumberWithLineWrapper>
              {/* 지도 정보 */}
              <Styled.MapInfoTextWrapper>
                <Styled.MapTextWrapper>
                  <Styled.MapInfoText>
                    {selectedInfo.info.content}
                  </Styled.MapInfoText>
                  <Styled.MapInfoText>
                    {selectedInfo.info.address}
                  </Styled.MapInfoText>
                  <Styled.MapDateText>
                    {selectedInfo.date &&
                      `${selectedInfo.date.toLocaleDateString()} (${
                        days[selectedInfo.date.getDay()]
                      })`}
                  </Styled.MapDateText>
                </Styled.MapTextWrapper>
                <Styled.MapInfoDeleteButton
                  type="button"
                  onClick={() => {
                    setSelectedMapInfos(
                      selectedMapInfos.filter(
                        (makerInfo) => makerInfo.id !== selectedInfo.id
                      )
                    );
                  }}
                >
                  <Styled.XButtonText>x</Styled.XButtonText>
                </Styled.MapInfoDeleteButton>
              </Styled.MapInfoTextWrapper>
            </Styled.MapInfoWrapper>
          ))}
        </Styled.MapInfoContainer>
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default ScheduleMap;
