import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeSpeciesTypeList } from "../../../lib/staticData";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import RadioGroup from "../../common/RadioGroup";
import Selector from "../../common/Selector";
import RegisterFooter from "./RegisterFooter";

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

  .register-species-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-apply-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
`;

const init = "분류를 선택하세요.";
const disabledLargeBuildingTypeOptions = [init];

const applyTypeRadioOptions = [
  {
    label: "종족 전체",
    value: "entire",
    description: "종족 전체가 지원합니다.",
  },
  {
    label: "혼자",
    value: "private",
    description: "작성자 혼자 지원합니다.",
  },
  {
    label: "일부",
    value: "public",
    description: "종족의 일부만 지원합니다.",
  },
];

const RegisterSpecies: React.FC = () => {
  const largeSpeciesType = useSelector(
    (state) => state.register.largeSpeciesType
  );
  const speciesType = useSelector((state) => state.register.speciesType);
  const applyType = useSelector((state) => state.register.applyType);

  const dispatch = useDispatch();

  const onChangeLargeSpeciesType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(registerActions.setLargeSpeciesType(event.target.value));
  };

  const onChangeSpeciesType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerActions.setSpeciesType(event.target.value));
  };

  const onChangeApplyType = (value: "entire" | "private" | "public") => {
    dispatch(registerActions.setApplyType(value));
  };

  // 큰 speies type 이 결정되면 그에따른 스텝 2의 옵션들 불러옴
  const detailSpeciesOptions = useMemo(() => {
    switch (largeSpeciesType) {
      case "인간형": {
        const { humanTypeList } = require("../../../lib/staticData");
        dispatch(registerActions.setSpeciesType(humanTypeList[0]));
        return humanTypeList;
      }
      case "자연형": {
        const { natureTypeList } = require("../../../lib/staticData");
        dispatch(registerActions.setSpeciesType(natureTypeList[0]));
        return natureTypeList;
      }
      case "무형": {
        const { noneTypeList } = require("../../../lib/staticData");
        dispatch(registerActions.setSpeciesType(noneTypeList[0]));
        return noneTypeList;
      }
      default:
        return [];
    }
  }, [largeSpeciesType]);

  const isValid = useMemo(() => {
    if (!largeSpeciesType || !speciesType || !applyType) {
      return false;
    }
    return true;
  }, [largeSpeciesType, speciesType, applyType]);

  return (
    <Container>
      <h3>STEP 1.</h3>
      <h2>당신은 무슨 종족입니까?</h2>
      <div className="register-species-selector-wrapper">
        <Selector
          // isValid={!!largeSpeciesType}
          type="register"
          value={largeSpeciesType || undefined}
          defaultValue={init}
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="종족 대분류 선택"
          options={largeSpeciesTypeList}
          onChange={onChangeLargeSpeciesType}
          useValidation={false}
        />
      </div>
      <div className="register-species-selector-wrapper">
        <Selector
          // isValid={!!speciesType}
          type="register"
          value={speciesType || undefined}
          disabled={!speciesType}
          label="종족 선택"
          options={detailSpeciesOptions}
          onChange={onChangeSpeciesType}
          useValidation={false}
        />
      </div>
      {speciesType && (
        <div className="register-apply-type-radio">
          <RadioGroup
            // isValid={!!applyType}
            label="함께 지원하는 동족 여부"
            value={applyType}
            options={applyTypeRadioOptions}
            onChange={onChangeApplyType}
          />
        </div>
      )}

      <RegisterFooter
        // isValid={isValid}
        prevHref="/"
        nextHref="/apply/register/location"
      />
    </Container>
  );
};

export default RegisterSpecies;
