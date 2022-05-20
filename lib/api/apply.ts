import axios from "axios";
import { RegisterState } from "../../types/reduxState";

export const registerAPI = (body: RegisterState & { userId: number }) =>
  axios.post("/api/applies", body);
