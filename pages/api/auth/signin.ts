import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../../types/user";
import jwt from "jsonwebtoken";

/*
[로그인 api]
1. 메서드가 POST인지 확인
2. req.body에 필요한 값 전부 있는지
3. 이메일-패스워드 체크
4. 추가된 유저 정보와 토큰 전달
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 1 메서드 POST?
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // 2 값 전부?
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("입력되지 않은 데이터가 있습니다.");
      }

      // 3 이메일-패스워드 체크
      const user = Data.user.find({ email });

      if (!user) {
        res.statusCode = 404;
        return res.send("해당 이메일의 유저가 없습니다.");
      }

      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      /* 
    // 4 토큰
    const token = jwt.sign(String(newUser.userNo), process.env.JWT_SECRET!);
    // 토큰을 쿠키에 3일간 저장
    // httponly - api통신에서만 쿠키 값 불러오기. 이외의 접근 불가능
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      )}; httponly`
    );

    // password는 제거 후 토큰,유저정보 전달
    // typescript의 유틸리티 이용해서 password를 partial로 만든 타입을 만든 후 delete사용
    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
      newUser;

    delete newUserWithoutPassword.password;
    */
      res.statusCode = 200;
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
