import React, { useEffect, useRef } from "react";
import { Loader } from "@kakaosoft/kakao-sdk/loader";

function KakaoMap({ lat, lng }) {
  const container = useRef(null);

  useEffect(() => {
    Loader.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container.current, options);

      const svgMarkup = `
        <svg width="41" height="41" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.28 12 24 12 24C12 24 20.5 14.28 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 12.75C10.83 12.75 9.875 11.795 9.875 10.625C9.875 9.455 10.83 8.5 12 8.5C13.17 8.5 14.125 9.455 14.125 10.625C14.125 11.795 13.17 12.75 12 12.75Z" fill="#248CFA" stroke="#1c72ce" strokeWidth="0.5" />
          <circle cx="12" cy="9" r="5.5" fill="#fbfbfb" stroke="#1c72ce" strokeWidth="0.5" />
          <text x="11.7" y="12.5" fill="#000000" textAnchor="middle" fontSize="9">1</text>
        </svg>
      `;
      const encodedSvg = encodeURIComponent(svgMarkup);
      const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;

      const imageSize = new window.kakao.maps.Size(41, 41);
      const markerImage = new window.kakao.maps.MarkerImage(dataUrl, imageSize);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        image: markerImage,
      });

      marker.setMap(map);
    });
  }, [lat, lng]);

  return <div ref={container} style={{ width: "100%", height: "100%" }} />;
}

export default KakaoMap;
