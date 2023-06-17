import { Map, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import { PostGetState } from "../../recoil/post/postGetState";
import * as Styled from "./MapInformationStyle";

type MarkerInfo = {
  date: string;
  id: string;
  info: {
    position: { lat: number; lng: number };
    content: string;
    address: string;
  };
};

function MapInformation() {
  const [postData] = useRecoilState(PostGetState);

  // 지도 정보의 세로선
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // 서버에서 가져온 map data를 parsing
  const parsedMap: MarkerInfo[] =
    postData && postData.map ? JSON.parse(postData.map) : [];

  // console.log(parsedMap);

  // map data 중 첫번째 값 찾기
  const firstMarkerPosition = parsedMap[0]?.info.position;

  // map 세로선에 대한 css 처리
  useEffect(() => {
    if (lineRef.current !== null && containerRef.current !== null) {
      const observerCallback = () => {
        const containerHeight = containerRef.current?.scrollHeight || 0;
        if (lineRef.current !== null) {
          lineRef.current.style.height = `${containerHeight}px`;
        }
      };

      // 선의 높이를 초기화
      observerCallback();

      const observer = new MutationObserver(observerCallback);

      if (containerRef.current !== null) {
        observer.observe(containerRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      // Clean up
      return () => {
        observer.disconnect();
      };
    }

    // If refs are not defined, return an empty cleanup function
    return () => {};
  }, []);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData || !postData.map) {
    return <div>Loading...</div>;
  }
  return (
    <Styled.Container>
      <Styled.MapContainer>
        <Map
          // 지도를 첫번째 data 값을 기준으로 보여줌 값이 없다면 서울 중심지 표시
          center={firstMarkerPosition || { lat: 37.566826, lng: 126.9786567 }}
          style={{
            width: "100%",
            height: "330px",
          }}
          level={6}
        >
          {/* 선택된 마커들의 정보를 표시 - 커스텀오버레이 (svg 형식) */}
          {parsedMap.map((selectedInfo, index) => (
            <CustomOverlayMap
              key={`marker-${selectedInfo.info.content}-${selectedInfo.info.position.lat},
            ${selectedInfo.info.position.lng}`}
              position={selectedInfo.info.position}
            >
              {/* 지도 pin - svg */}
              <svg
                width="41"
                height="41"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

          {/* 연결선 표시 */}
          <Polyline
            path={parsedMap.map((markerInfo) => markerInfo.info.position)}
            strokeWeight={3}
            strokeColor="black"
            strokeOpacity={0.5}
            strokeStyle="solid"
          />
        </Map>
      </Styled.MapContainer>
      {/* ---------------------------------------------------------------------- */}

      <Styled.MapInfoContainer ref={containerRef}>
        {/* 선택한 정보를 화면에 표시 */}
        <Styled.VerticalLine ref={lineRef} />
        {[...parsedMap].reverse().map((parsedMapInfo, index) => (
          <Styled.MapInfoWrapper key={parsedMapInfo.id}>
            <Styled.NumberWithLineWrapper>
              {/* 넘버링 */}
              <Styled.CircleNumbering>
                {parsedMap.length - index}
              </Styled.CircleNumbering>
            </Styled.NumberWithLineWrapper>
            {/* 지도 정보 */}
            <Styled.MapInfoTextWrapper>
              <Styled.MapTextWrapper>
                <Styled.MapInfoText>
                  {parsedMapInfo.info.content}
                </Styled.MapInfoText>
                <Styled.MapInfoText>
                  {parsedMapInfo.info.address}
                </Styled.MapInfoText>
                <Styled.MapDateText>
                  {parsedMapInfo.date &&
                    `${new Date(parsedMapInfo.date).toLocaleDateString()} (${
                      ["일", "월", "화", "수", "목", "금", "토"][
                        new Date(parsedMapInfo.date).getDay()
                      ]
                    })`}
                </Styled.MapDateText>
              </Styled.MapTextWrapper>
            </Styled.MapInfoTextWrapper>
          </Styled.MapInfoWrapper>
        ))}
      </Styled.MapInfoContainer>
    </Styled.Container>
  );
}

export default MapInformation;
