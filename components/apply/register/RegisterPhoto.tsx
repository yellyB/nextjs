import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { registerActions } from "../../../store/register";
import palette from "../../../styles/palette";
import RegisterFooter from "./RegisterFooter";
import Button from "../../common/Button";
import UploadIcon from "../../../public/static/svg/register/upload.svg";
import isEmpty from "lodash/isEmpty";
import { uploadFileAPI } from "../../../lib/api/file";
import RegisterPhotoCardList from "./RegisterPhotoCardList";

const Container = styled.div`
  margin-bottom: 100px;
  padding-top: 50px;
  display: flex;
  justify-content: center;

  h3 {
    font-size: 22px;
    font-weight: bold;
    color: ${palette.main_color};
    margin-bottom: 8px;
  }
  h2 {
    font-size: 32px;
    font-weight: 400;
    color: ${palette.main_color};
    margin-bottom: 36px;
  }
  .register-step-info {
    font-size: 14px;
    max-width: 400px;
    color: ${palette.gray_76};
    margin-bottom: 24px;
  }
  .register-step-description {
    color: ${palette.gray_b0};
    margin-bottom: 8px;
  }
  .register-upload-photo-wrapper {
    width: 658px;
    height: 433px;
    /* margin: auto; */
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
  .register-uploaded-wrapper {
    width: 658px;
    /* margin: auto; */
  }
  .register-uploaded {
    /* width: 658px; */
    /* height: 433px; */
    padding: 10px;
    /* margin: auto; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${palette.gray_bb};
    border-radius: 6px;
  }
`;

const RegisterPhoto: React.FC = () => {
  const photos = useSelector((state) => state.register.photos);
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
          dispatch(registerActions.setPhotos([...photos, temp]));
          setIsUpload(true);
          // 이미지를 서버에 저장할때에는 아래 코드로 제대로 저장
          //   dispatch(registerActions.setPhotos([...photos,data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <div>
        <h3>STEP 4.</h3>
        <h2>지원자님의 사진을 업로드 해주세요.</h2>
        <p className="register-step-info">
          여러명이 지원하는 경우 지원자 전부의 사진을 올려주세요.
        </p>

        {isEmpty(photos) && (
          <div className="register-upload-photo-wrapper">
            <>
              <input type="file" accept="image/*" onChange={uploadImage} />
              <Button icon={<UploadIcon />} color="bittersweet" width="167px">
                사진 업로드
              </Button>
            </>
          </div>
        )}

        {!isEmpty(photos) && (
          <div className="register-uploaded-wrapper">
            <p className="register-step-description">
              {lastUploadFileName} 파일을 업로드 해주셨네요.
              <br />
              하지만 그건 작성자님의 사진이 아닌것 같아서 제가 임의로 사진을
              골라봤습니다.
            </p>

            <div className="register-uploaded">
              <RegisterPhotoCardList photos={photos} />
            </div>
          </div>
        )}
      </div>

      <RegisterFooter
        prevHref="/apply/register/geometry"
        nextHref="/apply/register/name"
      />
    </Container>
  );
};

export default RegisterPhoto;
