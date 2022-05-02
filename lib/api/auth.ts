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
