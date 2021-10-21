import React from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import { navigate } from 'gatsby-link';

import { hoursToString } from '../../utils/time';
import { getUser } from '../../utils/auth';

const API_URL = process.env.API_URL;

const ProductItem = ({ productData }) => {
  const {
    name,
    startPrice,
    buyPrice,
    images,
    createdAt,
    bidCount,
    expiredAt,
    _id,
    seller,
  } = productData;
  console.log(productData);
  const { _id: userId } = getUser();
  const isOwner = userId === seller;
  const hourDiff = dayjs(expiredAt).diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  const onClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Product className="uk-flex uk-flex-row uk-margin-bottom" onClick={onClick}>
      <img className="image" src={`${API_URL}/${images[0]}`} />
      <div className="uk-flex uk-flex-1 uk-flex-column uk-flex-between">
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
        <div className="uk-flex uk-flex-row uk-flex-between uk-flex-bottom">
          <div className="uk-margin-remove-bottom">
            <p className="uk-margin-remove-bottom">
              <small className="uk-margin-right">
                Số lượt ra giá: {bidCount}
              </small>{' '}
              {timeLeft && (
                <small>
                  Thời gian còn lại: <b>{timeLeft}</b>
                </small>
              )}
            </p>
            <small>
              Ngày đăng: {dayjs(createdAt).format('HH:mm DD/MM/YYYY')}
            </small>
          </div>
          {!isOwner && (
            <span className="uk-text-danger" style={{ cursor: 'pointer' }}>
              Yêu thích <span uk-icon="heart"></span>
            </span>
          )}
        </div>
      </div>
    </Product>
  );
};

const Product = styled.div`
  padding: 10px;
  border: 0.5px solid #666 !important;
  cursor: pointer;
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
