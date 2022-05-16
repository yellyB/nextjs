import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeBuildingTypeList } from "../../../lib/staticData";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Selector from "../../common/Selector";

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
`;

const init = "please select one";
const disabledLargeBuildingTypeOptions = [init];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );
  const buildingType = useSelector((state) => state.registerRoom.buildingType);

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

  // large building 이 결정되면 그에따른 스텝 2의 옵션들 불러옴
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const { apartBuildingTypeList } = require("../../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(apartBuildingTypeList[0]));
        return [apartBuildingTypeList];
      }
      case "주택": {
        const { houstBuildingTypeList } = require("../../../lib/staticData");
        dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
        return houstBuildingTypeList;
      }
      case "별채": {
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

  return (
    <Container>
      <h2>등록할 숙소?</h2>
      <h3>1step</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue={init}
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="우선 범위를 좁혀볼"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          //   defaultValue={init}
          disabled={!largeBuildingType}
          label="건물 유형을 선택"
          options={detailBuildingOptions}
          onChange={onChangeBuildingType}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
