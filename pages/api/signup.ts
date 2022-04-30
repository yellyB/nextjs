import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../types/user";

/*
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

    // 2 값 전부?
    if (!email || !id || !password || !passwordConfirm || birthday) {
      res.statusCode = 400;
      return res.send("입력되지 않은 데이터가 있습니다.");
    }

    // 3 email중복?
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send("이미 사용중인 이메일입니다.");
    }

    // 4 비번 암호화
    const hashedPassword = bcrypt.hashSync(password, 8);
    const users = Data.user.getList();
    let userNo;
    if (users.length === 0) {
      userNo = 1;
    } else {
      userNo = users[users.length - 1].userNo + 1;
    }

    // 5 추가
    const newUser: StoredUserType = {
      userNo: userNo,
      id: id,
      email,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/user/default_profile.png",
    };
    Data.user.write([...users, newUser]);

    return res.end();
  }

  res.statusCode = 405;

  return res.end();
};

// res.status(200).json({ name: 'John Doe' })
