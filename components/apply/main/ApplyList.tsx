import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../../store";
import ApplyCard from "./ApplyCard";

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;
  margin-left: 16px;
  width: 100%;
`;

const ApplyList: React.FC = () => {
  const rooms = useSelector((state) => state.apply.applies);
  return (
    <Container>
      {rooms.map((room) => (
        <ApplyCard room={room} key={room.id} />
      ))}
    </Container>
  );
};

export default ApplyList;
