import React from 'react';
import styled from 'styled-components';

const ProductItem = () => {
  return (
    <Product className="uk-flex uk-flex-row">
      <img className="image" src="https://picsum.photos/seed/picsum/200/300" />
      <div className="uk-flex uk-flex-1 uk-flex-column">
        <div className="uk-flex uk-flex-row uk-flex-between">
          <p className="uk-text-large uk-margin-remove-bottom ">
            PS5 mới toanh
          </p>
          <span className="banner uk-text-bold uk-background-primary">NEW</span>
        </div>
        <p className="uk-margin-remove-bottom">
          2,999,999 đ - Bidder: Trần Văn A
        </p>
        <p className="uk-text-large uk-margin-remove-bottom uk-text-bold">
          Giá mua ngay: 15,000,000 đ
        </p>
        <p className="uk-margin-remove-bottom">
          <small className="uk-margin-right">Số lượt ra giá: 10</small> Thời
          gian còn lại: <b>15 ngày</b>
        </p>
        <small>Ngày đăng: 21/8/2021</small>
      </div>
    </Product>
  );
};

const Product = styled.div`
  padding: 10px;
  border: 0.5px solid #666 !important;
  .banner {
    color: white;
    align-self: flex-start;
    padding: 5px;
  }
  .image {
    object-fit: cover;
    width: 200px;
    height: 200px;
    margin-right: 10px;
  }
`;

export default ProductItem;
