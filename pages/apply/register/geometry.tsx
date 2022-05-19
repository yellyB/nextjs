import { NextPage } from "next";
import dynamic from "next/dynamic";

// ssr방지.
// 컴포넌트 안에서 window를 사용해야 하는데
// 서버에서 window와 document 를 사용할 수 없기때문에
// dynamic 사용해서 ssr방지함
const RegisterGeometry = dynamic(
  import("../../../components/apply/register/RegisterGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterGeometry />;
};

export default geometry;
