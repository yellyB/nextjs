import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadFileAPI } from "../../../lib/api/file";
import { registerRoomActions } from "../../../store/registerRoom";

import PencilIcon from "../../../public/static/svg/register/photo/pencil.svg";
import TrashCanIcon from "../../../public/static/svg/register/photo/trash_can.svg";
import PlusIcon from "../../../public/static/svg/register/photo/plus.svg";
import palette from "../../../styles/palette";

const Container = styled.ul`
  width: 858px;
  margin: auto;

  /** 첫번째 사진 */
  .register-first-photo-wrapper {
    width: 230px;
    height: 230px;
    margin: 0 0 24px 0;
    position: relative;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* border-radius: 6px; */

    overflow: hidden;
    .register-photo-interaction-buttons {
      display: flex;
      opacity: 0.6;
    }
    &:hover {
      .register-photo-interaction-buttons {
        display: flex;
        opacity: 0.9;
      }
    }
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

  /** 수정,삭제 버튼 */
  .register-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }

  li:nth-child(4n + 1) {
    margin-right: 0;
  }
  .register-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 48px) / 4 - 6px);
    height: 150px;
    border-radius: 6px;

    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    .register-photo-interaction-buttons {
      display: flex;
      opacity: 0.6;
    }
    &:hover {
      .register-photo-interaction-buttons {
        display: flex;
        opacity: 0.9;
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  /** 사진 추가하기 카드 */
  .register-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    display: flex;

    svg {
      margin-bottom: 12px;
    }
  }
`;

interface IProps {
  photos: string[];
}

const RegisterPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const dispatch = useDispatch();

  const addPhoto = () => {
    // 인풋 엘리먼트를 함수 내에서 만들어 사용
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            const temp = Math.floor(Math.random() * 9) + ".png";
            dispatch(registerRoomActions.setPhotos([...photos, temp]));
          })
          .catch((e) => console.log(e));
      }
    };
    el.click();
  };

  const deletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    dispatch(registerRoomActions.setPhotos(newPhotos));
  };

  const editPhoto = (index: number) => {
    const el = document.createElement("input");
    el.type = "file";
    el.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            const newPhotos = [...photos];
            newPhotos[index] = Math.floor(Math.random() * 9) + ".png";
            // newPhotos[index] = data;
            dispatch(registerRoomActions.setPhotos(newPhotos));
          })
          .catch((e) => console.log(e.message));
      }
    };
    el.click();
  };

  return (
    <Container>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-first-photo-wrapper">
              <img src={"/static/image/file/" + photo} alt="" />
              <div className="register-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className="register-photo-card">
              <img src={"/static/image/file/" + photo} alt="" />
              <div className="register-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li
        className="register-photo-card"
        role="presentation"
        onClick={addPhoto}
      >
        <div className="register-add-more-photo-card">
          <PlusIcon />
          동료 추가
        </div>
      </li>
    </Container>
  );
};

export default RegisterPhotoCardList;
