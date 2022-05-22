import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { getApplyListAPI } from "../../../lib/api/apply";
import { applyActions } from "../../../store/apply";
import palette from "../../../styles/palette";
import { StoredAppliedType } from "../../../types/apply";
import ApplyList from "./ApplyList";

const Container = styled.div`
  padding: 50px 80px 0 80px;
  display: flex;
  justify-content: center;

  .apply-list-info {
    margin-bottom: 8px;
  }
  .apply-list-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
  }
  .apply-list-wrapper {
    display: flex;
  }
`;

const ApplyMain: React.FC = () => {
  //   const rooms = useSelector((state) => state.apply.applies);
  const dispatch = useDispatch();
  const [applies, setApplies] = useState<StoredAppliedType[]>([]);

  const getData = async () => {
    const { data } = await getApplyListAPI({
      limit: "20",
      page: "1",
    });
    setApplies(data);
    dispatch(applyActions.setApplies(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div>
        <h1 className="apply-list-title">지원한 크리쳐</h1>
        <p className="apply-list-info">{applies.length}개의 데이터</p>
        <div className="apply-list-wrapper">
          <ApplyList />
        </div>
      </div>
    </Container>
  );
};

export default ApplyMain;
