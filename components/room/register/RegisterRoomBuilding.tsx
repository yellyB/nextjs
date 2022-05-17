import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeBuildingTypeList } from "../../../lib/staticData";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import RadioGroup from "../../common/RadioGroup";
import Selector from "../../common/Selector";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;

  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
`;

const init = "select one";
const disabledLargeBuildingTypeOptions = [init];

const roomTypeRadioOptions = [
  {
    label: "종족 전체",
    value: "entire",
    description: "종족 전체가 지원합니다.",
  },
  {
    label: "개인",
    value: "private",
    description: "작성자 혼자 지원합니다.",
  },
  {
    label: "일부",
    value: "public",
    description: "종족의 일부만 지원합니다.",
  },
];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.roomType);

  const dispatch = useDispatch();

  const onChangeLargeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };

  const onChangeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value));
  };

  const onChangeRoomType = (value: "entire" | "private" | "public") => {
    dispatch(registerRoomActions.setRoomType(value));
  };

  // large building 이 결정되면 그에따른 스텝 2의 옵션들 불러옴
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "인간형": {
        const { apartBuildingTypeList } = require("../../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(apartBuildingTypeList[0]));
        return apartBuildingTypeList;
      }
      case "자연형": {
        const { houstBuildingTypeList } = require("../../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
        return houstBuildingTypeList;
      }
      case "무형": {
        const {
          secondaryBuildingTypeList,
        } = require("../../../lib/staticData");
        dispatch(
          registerRoomActions.setBuildingType(secondaryBuildingTypeList[0])
        );
        return secondaryBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  const isValid = useMemo(() => {
    if (!largeBuildingType || !buildingType || !roomType) {
      return false;
    }
    return true;
  }, [largeBuildingType, buildingType, roomType]);

  return (
    <Container>
      <h2>당신은 무슨 타입 종족입니까?</h2>
      <h3>1step</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          isValid={!!largeBuildingType}
          type="register"
          value={largeBuildingType || undefined}
          defaultValue={init}
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="종족 종류 선택"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          isValid={!!buildingType}
          type="register"
          value={buildingType || undefined}
          //   defaultValue={init}
          disabled={!largeBuildingType}
          label="종족 선택"
          options={detailBuildingOptions}
          onChange={onChangeBuildingType}
        />
      </div>
      {buildingType && (
        <div className="register-room-type-radio">
          <RadioGroup
            isValid={!!roomType}
            label="함께 지원할 동족 여부"
            value={roomType}
            options={roomTypeRadioOptions}
            onChange={onChangeRoomType}
          />
        </div>
      )}

      <RegisterRoomFooter
        isValid={isValid}
        prevHref="/"
        nextHref="/room/register/location"
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
