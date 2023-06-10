import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { selectedInfosState } from "../../recoil/post/postCreateState";
import CommonInput from "../common/CommonInput";
import * as Styled from "./ScheduleMapStyle";
import CommonButton from "../common/CommonButton";
import PinIcon from "../Test/PinIcon";

// DatePicker 스타일링 - Start
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <Styled.StyledInput onClick={onClick} ref={ref}>
    {value || "출발 날짜를 알려주세요."}
  </Styled.StyledInput>
));

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const days = ["일", "월", "화", "수", "목", "금", "토"];

function ScheduleMap() {
  // 지도의 state
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  // 검색된 마커 중 선택한 마커의 정보 state
  const [info, setInfo] = useState<MarkerType | null>(null);
  // 검색시 지도에 표시되는 마커들의 정보 state
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  // 사용자가 input에 장소를 입력한 state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 사용자가 장소별 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date(); // datePicker에서 오늘의 날짜 이후를 선택 가능하게 하기 위한 today

  // 사용자가 선택한 장소와 날짜를 저장하는 [] state
  const [selectedMapInfos, setSelectedMapInfos] =
    useRecoilState(selectedInfosState);

  // 지도 검색과 그 마커들을 표시
  const searchPlaces = () => {
    if (!map || !searchTerm) return; // searchTerm 이 비어있다면 종료!
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchTerm, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = data.map((item) => {
          const marker = {
            position: {
              lat: parseFloat(item.y),
              lng: parseFloat(item.x),
            },
            content: item.place_name,
          };
          bounds.extend(
            new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
          );
          return marker;
        });
        setMarkers(newMarkers);
        map.setBounds(bounds);
      }
    });
  };

  useEffect(() => {
    searchPlaces();
  }, [map, searchTerm]);

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

  return (
    <div>
      {/* 지도 */}
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "98%",
          height: "300px",
        }}
        level={6}
        onCreate={setMap}
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

        {/* 마커들의 정보를 표시 */}
        {selectedMapInfos.map((selectedInfo, index) => (
          <MapMarker
            key={`marker-${selectedInfo.info.content}-${selectedInfo.info.position.lat},
            ${selectedInfo.info.position.lng}`}
            position={selectedInfo.info.position}
            onClick={() => setInfo(selectedInfo.info)}
          >
            {/* <div style={{ color: "#000" }}>{index + 1}</div> */}
          </MapMarker>
        ))}
      </Map>

      <PinIcon />

      {/* 검색 input */}
      <CommonInput
        type="text"
        placeholder="장소를 추가해주세요."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {/* 날짜 선택 캘린더 */}
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          minDate={today} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
          placeholderText="출발 날짜를 알려주세요."
          customInput={<CustomDateInput />}
        />
      </div>

      {/* 선택 정보 저장 버튼 */}
      <CommonButton type="button" onClick={addSelectedInfo}>
        + 등록하기
      </CommonButton>

      {/* 선택한 정보를 화면에 표시 */}
      {selectedMapInfos.map((selectedInfo, index) => (
        <div key={selectedInfo.id}>
          <span>{index + 1}</span>
          <div>{selectedInfo.info.content}</div>
          {selectedInfo.date &&
            `${selectedInfo.date.toLocaleDateString()} (${
              days[selectedInfo.date.getDay()]
            })`}
          <button
            type="button"
            onClick={() => {
              setSelectedMapInfos(
                selectedMapInfos.filter(
                  (makerInfo) => makerInfo.id !== selectedInfo.id
                )
              );
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default ScheduleMap;
