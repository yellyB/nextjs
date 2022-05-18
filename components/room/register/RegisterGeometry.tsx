import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";
import throttle from "lodash/throttle";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  /** 지도 위성 제거 */
  .gmnoprint .gm-style-mtc {
    display: none;
  }
  /** 로드뷰 아이콘 제거 */
  .gm-svpc {
    display: none;
  }
  /** 풀스크린 제거 */
  .gm-fullscreen-control {
    display: none;
  }
`;

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// 구글 지도 스크립트 불러오기
const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    // 지도를 불러왔을 때 window.initMap함수 실행하도록 설정
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

const RegisterGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  // 초기값은 서울로
  window.initMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });

      // 위치 표시 마커
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });

      // 드래그 시 이벤트 계속 발생 => 스로틑
      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();

          marker.setPosition({ lat: latitude, lng: longitude });

          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(centerLng));
        }, 300)
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확?</h2>
      <h3>3 step</h3>
      <p>당신의 위치는 여기가 맞나요?</p>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/photo"
      />
    </Container>
  );
};

export default RegisterGeometry;
