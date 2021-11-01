import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from '../../../hooks/useNavigate';

import useStore from '../../../store/useStore';

const API_URL = process.env.REACT_APP_API_URL;

export default function Product({ item }) {
  const productList = useStore((state) => state.productList);
  const [product, setProduct] = useState(item);
  const { navigate } = useNavigate();

  useEffect(() => {
    const index = productList.findIndex(
      (productItem) => productItem._id === item._id,
    );
    if (index !== -1) {
      setProduct(productList[index]);
    }
  }, [productList]);

  const onClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <MostPopularProduct className="uk-card uk-card-default" onClick={onClick}>
      <div className="uk-card-media-top">
        <img
          src={`${API_URL}/${product.images[0]}`}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '200px',
          }}
        />
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title title">{product.name}</h3>
        <p className="uk-margin-remove-top uk-margin-remove-bottom">
          Giá hiện tại: {Number(product.currentPrice).toLocaleString()} đ
        </p>
        <h4
          className="uk-text-bold uk-margin-remove-top uk-margin-remove-bottom"
          style={{ color: '#666' }}
        >
          Số lượt ra giá: {product.bidCount}
        </h4>
      </div>
    </MostPopularProduct>
  );
}

const MostPopularProduct = styled.div`
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
