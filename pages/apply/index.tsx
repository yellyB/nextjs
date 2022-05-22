import React, { useEffect } from "react";
import { NextPage } from "next";
import ApplyMain from "../../components/apply/main/ApplyMain";
import { getApplyListAPI } from "../../lib/api/apply";
import { applyActions } from "../../store/apply";
import { useDispatch } from "react-redux";

const index: NextPage = () => {
  return <ApplyMain />;
};

// index.getInitialProps = async ({ store, query }) => {
//   const { limit, page = "1" } = query;
//   try {
//     const { data } = await getApplyListAPI({
//       limit: limit || "20",
//       page: page || "1",
//     });
//     store.dispatch(applyActions.setApplies(data));
//   } catch (e) {
//     console.log(e);
//   }

//   return {};
// };

export default index;
