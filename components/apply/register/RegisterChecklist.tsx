import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import RegisterCheckStep from "./RegisterCheckStep";
import RegisterFooter from "./RegisterFooter";
import RegisterSubmitFooter from "./RegisterSubmitFooter";

const Container = styled.div`
  margin-bottom: 100px;
  padding-top: 50px;
  display: flex;
  justify-content: center;

  h3 {
    font-size: 22px;
    font-weight: bold;
    color: ${palette.main_color};
    margin-bottom: 8px;
  }
  h2 {
    font-size: 32px;
    font-weight: 400;
    color: ${palette.main_color};
    margin-bottom: 36px;
  }
  p {
    color: ${palette.gray_76};
  }
  .register-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterChecklist: React.FC = () => {
  // 다른 페이지들에서는 값을 불러왔지만
  // 이 페이지에서는 리렌더 발생 X 이기 때문에
  // register 객체를 불러옴
  const register = useSelector((state: RootState) => state.register);

  const isSpeciesActived = useMemo(() => {
    const { largeSpeciesType, speciesType, applyType } = register;
    if (!largeSpeciesType || !speciesType || !applyType) {
      return false;
    }
    return true;
  }, []);

  const isLocationActived = useMemo(() => {
    const { latitude, longitude, country, city, district, streetAddress } =
      register;
    if (
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress
    ) {
      return false;
    }
    return true;
  }, []);

  const isPhotoActived = useMemo(() => {
    const { photos } = register;
    if (isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  const isNameActived = useMemo(() => {
    const { name } = register;
    if (!name) {
      return false;
    }
    return true;
  }, []);

  // 지금 진행중 단계 구하기.
  // 입력안된 단계들 중 가장 앞 단계가 곧 지금 입력해야할 첫 단계
  // 따라서 순서대로 확인하여 리턴
  const stepInProgress = useMemo(() => {
    if (!isSpeciesActived) {
      return 1;
    }
    if (!isLocationActived) {
      return 2;
    }
    if (!isPhotoActived) {
      return 3;
    }
    if (!isNameActived) {
      return 4;
    }
  }, []);

  return (
    <Container>
      <div>
        <h3>CHECK</h3>
        <h2>작성 내용 최종 체크</h2>
        <p className="register-checklist-info">
          작성하지 않은 단계가 있다면 마저 작성해주세요.
        </p>
        <ul>
          <RegisterCheckStep
            step="종족"
            href="/apply/register/species"
            disabled={Number(stepInProgress) <= 1}
            inProgress={stepInProgress === 1}
          />
          <RegisterCheckStep
            step="위치"
            href="/apply/register/location"
            disabled={Number(stepInProgress) <= 2}
            inProgress={stepInProgress === 2}
          />
          <RegisterCheckStep
            step="사진"
            href="/apply/register/photo"
            disabled={Number(stepInProgress) <= 3}
            inProgress={stepInProgress === 3}
          />
          <RegisterCheckStep
            step="이름"
            href="/apply/register/name"
            disabled={Number(stepInProgress) <= 4}
            inProgress={stepInProgress === 4}
          />
        </ul>
      </div>
      {/* 마지막 단계인 name이 등록되었다면 최종으로 등록 */}

      <RegisterSubmitFooter disabled={Number(stepInProgress) < 4} />
    </Container>
  );
};

export default RegisterChecklist;
