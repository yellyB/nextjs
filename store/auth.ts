import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//  로그인모달은 1: 헤더에서 로그인 / 2: 회원가입에서 로그인 두가지 경로로 열 수 있다.
const initialState: { authMode: "signup" | "signin" } = {
  authMode: "signup",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인으로 변경
    setAuthMode(state, action: PayloadAction<"signup" | "signin">) {
      state.authMode = action.payload;
    },
  },
});

export const authActions = { ...auth.actions };

export default auth;
