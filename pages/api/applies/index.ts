import { NextApiResponse, NextApiRequest } from "next";
import isEmpty from "lodash/isEmpty";
import { StoredAppliedType } from "../../../types/apply";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = req.query;
    try {
      const applies = await Data.apply.getList();
      //* 위치로 필터링 하기
      const filteredapplies = applies.filter((apply) => {
        if (latitude && latitude !== "0" && longitude && longitude !== "0") {
          if (
            !(
              Number(latitude) - 0.5 < apply.latitude &&
              apply.latitude < Number(latitude) + 0.05 &&
              Number(longitude) - 0.5 < apply.longitude &&
              apply.longitude < Number(longitude) + 0.05
            )
          ) {
            return false;
          }
        }
        if (checkInDate) {
          if (
            new Date(checkInDate as string) < new Date(apply.startDate) ||
            new Date(checkInDate as string) > new Date(apply.endDate)
          ) {
            return false;
          }
        }
        if (checkOutDate) {
          if (
            new Date(checkOutDate as string) < new Date(apply.startDate) ||
            new Date(checkOutDate as string) > new Date(apply.endDate)
          ) {
            return false;
          }
        }

        if (
          apply.maximumGuestCount <
          Number(adultCount as string) +
            (Number(childrenCount as string) * 0.5 || 0)
        ) {
          return false;
        }

        return true;
      });

      //* 갯수 자르기
      const limitedapplies = filteredapplies.splice(
        0 + (Number(page) - 1) * Number(limit),
        Number(limit)
      );
      //* host 정보 넣기
      const appliesWithHost = await Promise.all(
        limitedapplies.map(async (apply) => {
          const host = await Data.user.find({ id: apply.hostId });
          return { ...apply, host };
        })
      );
      res.statusCode = 200;
      return res.send(appliesWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === "POST") {
    try {
      const {
        largeSpeciesType,
        speciesType,
        applyType,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        latitude,
        longitude,
        photos,
        name,
        userId,
      } = req.body;
      if (
        !largeSpeciesType ||
        !speciesType ||
        !applyType ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        !detailAddress ||
        !postcode ||
        !latitude ||
        !longitude ||
        !photos ||
        !name ||
        !userId
      ) {
        res.statusCode = 400;
        res.send("입력되지 않은 항목이 있습니다.");
      }
      const applies = await Data.apply.getList();

      // 데이터 하나도 없으면 새로 만들기
      if (isEmpty(applies)) {
        const newApply: StoredAppliedType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.apply.write([newApply]);
        res.statusCode = 201;
        return res.end();
      }

      // 마지막 id+1 해서 데이터 추가
      const newApply: StoredAppliedType = {
        id: applies[applies.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.apply.write([...applies, newApply]);
      res.statusCode = 201;
      return res.end();
    } catch (e) {
      console.log(e);
      return res.send(e.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
