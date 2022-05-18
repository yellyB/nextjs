import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import RegisterRoomFooter from "./RegisterRoomFooter";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Selector from "../../common/Selector";
import { countryList } from "../../../lib/staticData";
import Input from "../../common/Input";
import { getLocationInfoAPI } from "../../../lib/api/map";

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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;

const defaultSelector = "나라 선택";

const RegisterLocation: React.FC = () => {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };

  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };

  //*우편번호 변경시
  const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(e.target.value));
  };

  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      // console.log("latitude:", coords.latitude);
      // console.log("longitude:", coords.longitude);

      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log(currentLocation);

      dispatch(registerRoomActions.setLatitude(coords.latitude));
      dispatch(registerRoomActions.setLongitude(coords.longitude));

      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
    } catch (e) {
      console.log(e);
      alert(e?.message);
    }
    setLoading(false);
  };

  const onClickGetCurrentLocation = () => {
    setLoading(true);
    // getCurrentPosition -> 첫번째 인자로 성공했을 때 함수, 두번째 인자로 실패시 함수
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
  };

  const isValid = useMemo(() => {
    if (!country || !city || !district) {
      return false;
    }
    return true;
  }, [country, city, district]);

  return (
    <Container>
      <h2>거주하고 있는 위치를 알려주세요.</h2>
      <h3>2 step</h3>
      <p>정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</p>

      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "기다리시게.." : "현재 위치 사용"}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue={defaultSelector}
          disabledOptions={[defaultSelector]}
          value={country || undefined}
          onChange={onChangeCountry}
          isValid={!!country}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input
          label="시/도"
          value={city}
          onChange={onChangeCity}
          isValid={!!city}
        />
        <Input
          label="시/군/구"
          value={district}
          onChange={onChangeDistrict}
          isValid={!!district}
        />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="도로명주소"
          value={streetAddress}
          onChange={onChangeStreetAddress}
          useValidation={false}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input
          label="우편번호"
          value={postcode}
          onChange={onChangePostcode}
          useValidation={false}
        />
      </div>

      <RegisterRoomFooter
        isValid={isValid}
        prevHref="/room/register/building"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterLocation;
