import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  return <Container>hellowfdfsdfsdf</Container>;
};

export default index;

/*
index뒤에 콜론(:)은 해당 변수에 타입을 지정해주는것
컴포넌트의 타입은 NextPage
*/
