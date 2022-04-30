import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../../types/user";
import jwt from "jsonwebtoken";

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
    const { email, id, password, passwordConfirm, birthday } = req.body;

    try {
      console.log("try");
      Data.user.exist({ email });
    } catch (e) {
      console.log(e);
      res.statusCode = 501;
    }

    if (true) {
      res.statusCode = 411;
      res.send("d");
    }

    // 2 값 전부?
    if (!email || !id || !password || !passwordConfirm || !birthday) {
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
    let userNo;
    if (users.length === 0) {
      userNo = 1;
    } else {
      userNo = users[users.length - 1].userNo + 1;
    }

    const newUser: StoredUserType = {
      userNo: userNo,
      email: email,
      id: id,
      password: hashedPassword,
      birthday: birthday,
      profileImage: "/static/image/user/default_profile.png",
    };
    Data.user.write([...users, newUser]);

    // 6 토큰
    const token = jwt.sign(String(newUser.userNo), process.env.JWT_SECRET!);
    // 토큰을 쿠키에 3일간 저장
    // httponly - api통신에서만 쿠키 값 불러오기. 이외의 접근 불가능
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      )}; httponly`
    );

    return res.end();
  }

  res.statusCode = 405;

  return res.end();
};

// res.status(200).json({ name: 'John Doe' })
