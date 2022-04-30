import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // if(!email || !id || !password || !passwordConfirm||birthday){
    //   res.statusCode = 400
    //   return res.send("입력되지 않은 데이터가 있습니다.")
    // }

    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send("이미 사용중인 이메일입니다.");
    }
    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};

/*
1. 메서드가 POST인지 확인
2. req.body에 필요한 값 전부 있는지
3. email이 중복인지
4. 패스워드 암호화
5. 유저 정보 추가
6. 추가된 유저 정보와 토큰 전달
*/

// res.status(200).json({ name: 'John Doe' })
