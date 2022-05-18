import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";
import throttle from "lodash/throttle";
import Button from "../../common/Button";
import UploadIcon from "../../../public/static/svg/register/upload.svg";
import isEmpty from "lodash/isEmpty";
import { uploadFileAPI } from "../../../lib/api/file";
import RegisterPhotoCardList from "./RegisterPhotoCardList";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-upload-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterPhoto: React.FC = () => {
  const photos = useSelector((state) => state.registerRoom.photos);
  const [isUpload, setIsUpload] = useState(false);
  const [lastUploadFileName, setLastUploadFileName] = useState("");

  const dispatch = useDispatch();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    // console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const { data } = await uploadFileAPI(formdata);
        setLastUploadFileName(data);
        if (data) {
          const temp = Math.floor(Math.random() * 9) + ".png";
          dispatch(registerRoomActions.setPhotos([...photos, temp]));
          setIsUpload(true);
          // 이미지를 서버에 저장할때에는 아래 코드로 제대로 저장
          //   dispatch(registerRoomActions.setPhotos([...photos,data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <h2>사진 업로드</h2>
      <h3>4 step</h3>
      <p className="register-room-step-info">자신의 사진 올리기</p>
      {isUpload && (
        <div>
          {lastUploadFileName}파일을 업로드 해주셨네요. 하지만 그건 작성자님의
          사진이 아닌것 같아서 제가 임의로 사진을 골라봤습니다.
        </div>
      )}
      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <Button icon={<UploadIcon />} color="bittersweet" width="167px">
              사진 업로드
            </Button>
          </>
        </div>
      )}

      {!isEmpty(photos) && <RegisterPhotoCardList photos={photos} />}

      <RegisterRoomFooter
        prevHref="/room/register/geometry"
        nextHref="/room/register/title"
      />
    </Container>
  );
};

export default RegisterPhoto;
