import React from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';

import { hoursToString } from '../../utils/time';

const API_URL = process.env.API_URL;

const ProductItem = ({ productData }) => {
  const { name, startPrice, buyPrice, images, createdAt, bidCount, expiredIn } =
    productData;
  const expireDate = dayjs(createdAt).add(expiredIn, 'hour');
  const hourDiff = dayjs(expireDate).diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  return (
    <Product className="uk-flex uk-flex-row uk-margin-bottom">
      <img className="image" src={`${API_URL}/${images[0]}`} />
      <div className="uk-flex uk-flex-1 uk-flex-column">
        <div className="uk-flex uk-flex-row uk-flex-between">
          <p className="uk-text-large uk-margin-remove-bottom ">{name}</p>
          {dayjs().diff(dayjs(createdAt), 'hour') < 24 && (
            <span className="banner uk-text-bold uk-background-primary">
              MỚI
            </span>
          )}
        </div>
        <p className="uk-margin-remove-bottom">
          {Number(startPrice).toLocaleString()} đ - Bidder: Trần Văn A
        </p>
        {!!buyPrice && (
          <p className="uk-text-large uk-margin-remove-bottom uk-text-bold">
            Giá mua ngay: {Number(buyPrice).toLocaleString()} đ
          </p>
        )}
        <p className="uk-margin-remove-bottom">
          <small className="uk-margin-right">Số lượt ra giá: {bidCount}</small>{' '}
          {timeLeft && (
            <span>
              Thời gian còn lại: <b>{timeLeft}</b>
            </span>
          )}
        </p>
        <small>Ngày đăng: {dayjs(createdAt).format('HH:mm DD/MM/YYYY')}</small>
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
