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
