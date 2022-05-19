import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import RegisterFooter from "./RegisterFooter";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Selector from "../../common/Selector";
import { countryList } from "../../../lib/staticData";
import Input from "../../common/Input";
import { getLocationInfoAPI } from "../../../lib/api/map";

const Container = styled.div`
  padding: 62px 30px 100px;
  h3 {
    font-size: 22px;
    font-weight: bold;
    color: ${palette.main_color};
    margin-bottom: 6px;
  }
  h2 {
    font-size: 32px;
    font-weight: 400;
    color: ${palette.main_color};
    margin-bottom: 36px;
  }
  p {
    margin-bottom: 24px;
    color: ${palette.gray_76};
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 6px;
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
  const country = useSelector((state) => state.register.country);
  const city = useSelector((state) => state.register.city);
  const district = useSelector((state) => state.register.district);
  const streetAddress = useSelector((state) => state.register.streetAddress);
  const postcode = useSelector((state) => state.register.postcode);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerActions.setCountry(event.target.value));
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setCity(event.target.value));
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setDistrict(event.target.value));
  };

  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerActions.setStreetAddress(event.target.value));
  };

  //*우편번호 변경시
  const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setPostcode(e.target.value));
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

      dispatch(registerActions.setLatitude(coords.latitude));
      dispatch(registerActions.setLongitude(coords.longitude));

      // dispatch(registerActions.setCountry(currentLocation.country));
      dispatch(registerActions.setCity(currentLocation.city));
      dispatch(registerActions.setDistrict(currentLocation.district));
      dispatch(registerActions.setStreetAddress(currentLocation.streetAddress));
      dispatch(registerActions.setPostcode(currentLocation.postcode));
      dispatch(registerActions.setLatitude(currentLocation.latitude));
      dispatch(registerActions.setLongitude(currentLocation.longitude));
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
      <h3>STEP 2.</h3>
      <h2>서식 중인 위치를 알려주세요.</h2>

      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "Loading.." : "위치 불러오기"}
        </Button>
      </div>
      <p>정확한 위치 확인을 위해 위치 정보를 불러와주세요.</p>
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
          // onChange={onChangeCity}
          isValid={!!city}
          readOnly
        />
        <Input
          label="시/군/구"
          value={district}
          // onChange={onChangeDistrict}
          isValid={!!district}
          readOnly
        />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="도로명주소"
          value={streetAddress}
          // onChange={onChangeStreetAddress}
          useValidation={false}
          readOnly
        />
      </div>
      <div className="register-room-location-postcode">
        <Input
          label="우편번호"
          value={postcode}
          // onChange={onChangePostcode}
          useValidation={false}
          readOnly
        />
      </div>

      <RegisterFooter
        isValid={isValid}
        prevHref="/room/register/species"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterLocation;
