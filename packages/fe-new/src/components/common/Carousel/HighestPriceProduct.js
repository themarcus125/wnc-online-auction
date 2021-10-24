import React from 'react';
import styled from 'styled-components';
import { useNavigate } from '../../../hooks/useNavigate';

const API_URL = process.env.REACT_APP_API_URL;

export default function Product({ item }) {
  const { navigate } = useNavigate();

  const onClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <HighestPriceProduct className="uk-card uk-card-default" onClick={onClick}>
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
        <h4
          className="uk-text-bold uk-margin-remove-top uk-margin-remove-bottom"
          style={{ color: '#666' }}
        >
          Giá hiện tại: {Number(item.currentPrice).toLocaleString()} đ
        </h4>
      </div>
    </HighestPriceProduct>
  );
}

const HighestPriceProduct = styled.div`
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
