import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";
// import jwt from "jsonwebtoken";

/*
[회원가입 api]
1. 메서드가 POST인지 확인
2. req.body에 필요한 값 전부 있는지
3. email이 중복인지
4. 패스워드 암호화
5. 유저 정보 추가
6. 추가된 유저 정보와 토큰 전달
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 1 메서드 POST?
  if (req.method === "POST") {
    const { email, password, passwordConfirm, birthday } = req.body;

    // 2 값 전부?
    if (!email || !password || !passwordConfirm || !birthday) {
      res.statusCode = 400;
      return res.send("입력되지 않은 데이터가 있습니다.");
    }

    // 3 email중복?
    const userExist = Data.user.exist(email);

    if (userExist) {
      res.statusCode = 409;
      res.send("이미 사용중인 이메일입니다.");
    }

    // 4 비번 암호화
    const hashedPassword = bcrypt.hashSync(password, 8);

    // 5 추가
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].userId + 1;
    }

    const newUser: StoredUserType = {
      userId,
      email,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/user/default_profile.png",
    };
    Data.user.write([...users, newUser]);

    /*
    // 6 토큰
    const token = jwt.sign(String(newUser.userId), process.env.JWT_SECRET!);
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
    return res.send(newUser);
  }

  res.statusCode = 405;

  return res.end();
};

// res.status(200).json({ name: 'John Doe' })
