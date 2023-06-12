import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { PostGetState } from "../../recoil/post/postGetState";

function MapInformation() {
  const [postData, setPostData] = useRecoilState(PostGetState);
  // console.log(postData?.map);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData) {
    return <div>Loading...</div>;
  }

  // 서버에서 가져온 map data를 parsing
  const parsedMap = JSON.parse(postData.map);

  // map data 중 첫번째 값 찾기
  const firstMarkerPosition = parsedMap[0]?.info.position;
  // console.log(firstMarkerPosition);

  return (
    <div>
      <Map
        // 지도를 첫번째 data 값을 기준으로 보여줌 값이 없다면 서울 중심지 표시
        center={firstMarkerPosition || { lat: 37.566826, lng: 126.9786567 }}
        style={{
          width: "400px",
          height: "350px",
        }}
        level={6}
      >
        {/* 마커들의 정보를 표시 */}
        {parsedMap.map((markerInfo, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={markerInfo.info.position}
          >
            <div>{markerInfo.info.content}</div>
          </MapMarker>
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
    </div>
  );
}

export default MapInformation;
