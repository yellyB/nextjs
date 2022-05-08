import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";
// import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      // 쿠키 삭제
      // res.setHeader(
      //   "Set-Cookie",
      //   "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httyonly"
      // );
      res.statusCode = 204;
      return res.end();
    }
  } catch (e) {
    return res.send(e.message);
  }
  res.statusCode = 405;
  return res.end();
};
