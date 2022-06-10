import React, { useState, useEffect, useCallback } from "react";
import { uploadClothes } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { getUserInfo } from "../../../_actions/user_action";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;

const InputWrapper = styled.div`
  margin: auto;
  margin: 10px;
`;
const UploadBox = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  max-width: 500px;

  margin-top: 20px;
  padding: 32px;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  label {
    margin-top: 15px;
    text-align: left;
    width: 100%;
  }
  input {
    width: 100%;
    border: 1px solid grey;
    border-radius: 5px;
  }

  select {
    width: 100%;
    border: 1px solid grey;
    border-radius: 5px;
  }

  button {
    margin-top: 20px;
  }
`;

function UploadClothesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});

  // 이미지 업로드을 위한 Base64 변환.
  const [ImageSrc, setImageSrc] = useState("");

  const encFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 사용자 토큰 받아와서 업로더 구분하기 위한 장치
  useEffect(() => {
    const fetchUserInfoAsync = async () => {
      const response = await getUserInfo();
      const newUserInfo = response.payload;
      setUserInfo(newUserInfo);
    };
    fetchUserInfoAsync();
  }, []);

  const [Name, setName] = useState("");
  const [Brand, setBrand] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Season, setSeason] = useState("");
  const [PurchasePlace, setPurchasePlace] = useState("");
  const [PurchaseDate, setPurchaseDate] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onBrandHandler = (event) => {
    setBrand(event.currentTarget.value);
  };
  const onPriceHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const onCategoryHandler = (event) => {
    setCategory(event.currentTarget.value);
  };
  const onSeasonHandler = (event) => {
    setSeason(event.currentTarget.value);
  };
  const onPurchasePlaceHandler = (event) => {
    setPurchasePlace(event.currentTarget.value);
  };
  const onPurchaseDateHandler = (event) => {
    setPurchaseDate(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Name === "") {
      return alert("옷 이름을 입력하세요!");
    }

    let body = {
      useremail: userInfo.email,
      name: Name,
      brand: Brand,
      price: Price,
      category: Category,
      season: Season,
      purchasePlace: PurchasePlace,
      purchaseDate: PurchaseDate,
      img: ImageSrc,
    };

    uploadClothes(body).then((response) => {
      if (response.payload.success) {
        navigate("/main");
      } else {
        alert("Failed to Upload");
      }
    });
  };

  // console.log(ImageSrc);
  return (
    <Wrapper>
      <Title>옷 등록</Title>
      <InputWrapper>
        <UploadBox onSubmit={onSubmitHandler}>
          <div>
            {ImageSrc && (
              <img
                src={ImageSrc}
                alt="preview-img"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
          <input
            type="file"
            onChange={(e) => {
              encFileToBase64(e.target.files[0]);
            }}
          />

          <label>옷 이름</label>
          <input type="text" value={Name} onChange={onNameHandler} />
          <label>브랜드</label>
          <input type="text" value={Brand} onChange={onBrandHandler} />
          <label>가격</label>
          <input type="text" value={Price} onChange={onPriceHandler} />
          <label>분류</label>
          <select value={Category} onChange={onCategoryHandler}>
            <option>상의</option>
            <option>아우터</option>
            <option>바지</option>
            <option>원피스</option>
            <option>스커트</option>
            <option>스니커즈</option>
            <option>신발</option>
            <option>가방</option>
            <option>스포츠</option>
            <option>모자</option>
            <option>액세서리</option>
          </select>
          <label>계절</label>
          <select value={Season} onChange={onSeasonHandler}>
            <option>봄</option>
            <option>여름</option>
            <option>가을</option>
            <option>겨울</option>
          </select>
          <label>구매 장소</label>
          <input
            type="text"
            value={PurchasePlace}
            onChange={onPurchasePlaceHandler}
          />
          <label>구매 일자</label>
          <input
            type="date"
            value={PurchaseDate}
            onChange={onPurchaseDateHandler}
          />
          <button type="submit">옷 등록하기</button>
        </UploadBox>
      </InputWrapper>
    </Wrapper>
  );
}
export default UploadClothesPage;