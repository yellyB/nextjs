import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerActions } from "../../../store/register";
import RegisterCheckStep from "./RegisterCheckStep";
import RegisterFooter from "./RegisterFooter";
import RegisterSubmitFooter from "./RegisterSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
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
  const register = useSelector((state) => state.register);

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
      return "species";
    }
    if (!isLocationActived) {
      return "location";
    }
    if (!isPhotoActived) {
      return "photo";
    }
    if (!isNameActived) {
      return "name";
    }
  }, []);

  return (
    <Container>
      <p className="register-checklist-info">등록한 후에 언제든지 수정 가능</p>
      <ul>
        <RegisterCheckStep
          step="종족"
          href="/apply/register/species"
          disabled={!isSpeciesActived}
          inProgress={stepInProgress === "species"}
        />
        <RegisterCheckStep
          step="위치"
          href="/apply/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <RegisterCheckStep
          step="사진"
          href="/apply/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterCheckStep
          step="이름"
          href="/apply/register/name"
          disabled={!isNameActived}
          inProgress={stepInProgress === "name"}
        />
      </ul>

      {/* 마지막 단계인 name이 등록되었다면 최종으로 등록 */}
      {isNameActived ? (
        <RegisterSubmitFooter />
      ) : (
        <RegisterFooter
          prevHref="/apply/register/name"
          nextHref={`/apply/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterChecklist;
