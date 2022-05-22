import axios from "axios";
import { StoredAppliedType } from "../../types/apply";
import { RegisterState } from "../../types/reduxState";
import { makeQueryString } from "../utils";

export const registerAPI = (body: RegisterState & { userId: number }) =>
  axios.post("/api/applies", body);

type GetApplyListAPIQueries = {
  limit: string | string[];
  page: string | string[];
};

// 리스트 불러오기
export const getApplyListAPI = (queries: GetApplyListAPIQueries) => {
  return axios.get<StoredAppliedType[]>(
    makeQueryString("/api/applies", queries)
  );
};
