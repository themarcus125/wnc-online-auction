import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby-link';
import dayjs from 'dayjs';

const API_URL = process.env.API_URL;

export default function Product({ item }) {
  const onClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <AlmostExpireProduct className="uk-card uk-card-default" onClick={onClick}>
      <div className="uk-card-media-top">
        <img
          src={`${API_URL}/${item.images[0]}`}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '200px',
          }}
        />
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title title">{item.name}</h3>
        <p className="uk-margin-remove-top uk-margin-remove-bottom">
          Giá hiện tại: <b>{Number(item.currentPrice).toLocaleString()} đ</b>
        </p>
        <small>Số lượt ra giá: {item.bidCount}</small>
        <p className="uk-text-danger uk-text-bold uk-margin-remove-top uk-margin-remove-bottom">
          Hết hạn: {dayjs(item.expiredAt).format('HH:mm - DD/MM/YYYY')}
        </p>
      </div>
    </AlmostExpireProduct>
  );
}

const AlmostExpireProduct = styled.div`
  cursor: pointer;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 70px;
  }
`;
