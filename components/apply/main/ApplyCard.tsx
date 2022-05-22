import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { StoredAppliedType } from "../../../types/apply";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";

const Container = styled.li`
  width: calc((100% - 48px) / 4);
  &:nth-child(4n) {
    margin-right: 0;
  }
  margin-right: 16px;
  margin-bottom: 32px;

  @media (min-width: 1440px) {
    width: calc((100% - 64px) / 5);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
  .apply-card-photo-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66.66%;
    margin-bottom: 14px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 70%;
      height: 100%;
    }
  }
  .apply-card-apply-info {
    font-size: 12px;
    color: ${palette.gray_71};
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .apply-card-title {
    font-size: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .apply-card-price {
    margin-bottom: 4px;
    b {
      font-weight: 800;
    }
  }
  .apply-card-total-price {
    font-size: 14px;
    color: ${palette.gray_71};
  }
  .apply-bed-bath-apply-info {
    display: none;
  }
`;

interface IProps {
  room: StoredAppliedType;
}

const ApplyCard: React.FC<IProps> = ({ room }) => {
  //* 한글로 된 숙소 유형
  const translatedRoomType = useMemo(() => {
    switch (room.applyType) {
      case "entire":
        return "종족 전체";
      case "private":
        return "혼자";
      case "public":
        return "일부";
      default:
        return "";
    }
  }, []);

  return (
    <Container>
      {/* <Link href={`/apply/${room.id}`}> */}
      {/* <a> */}
      <div className="apply-card-photo-wrapper">
        <img src={"/static/image/file/" + room.photos[0]} alt="" />
      </div>
      <div className="apply-card-info-texts">
        <p className="apply-card-title">{room.name}</p>
        <p className="apply-card-apply-info">
          {room.speciesType} / {translatedRoomType}
          <br /> {room.city} {room.district}
        </p>
        <div className="apply-card-text-divider" />
      </div>
      {/* </a> */}
      {/* </Link> */}
    </Container>
  );
};

export default ApplyCard;
