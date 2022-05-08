import axios from "axios";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
  //   userNo: number;
  email: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

export const signinAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/signin", body);

// 쿠키에 저장된 유저 가져오기
export const meAPI = () => axios.get<UserType>("/api/auth/me");

export const singoutAPI = () => axios.delete("/api/auth/signout");
