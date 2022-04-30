import axios from "axios";

interface SignUpAPIBody {
  //   userNo: number;
  email: string;
  id: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post("/api/auth/signup", body);
