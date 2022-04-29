import { NextPage } from "next";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const index: React.FC = () => {
  return (
    <Container>
      <Header />
      hello world
    </Container>
  );
};

export default index;
