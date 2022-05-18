import axios from "../../../lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // 파일 정보 받기
      const form = new formidable.IncomingForm();
      const filename = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          resolve(files.file.originalFilename);
        });
      });
      res.statusCode = 200;
      res.send(filename);
    } catch (e) {
      console.log(e);
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 405;

  return res.end();
};
