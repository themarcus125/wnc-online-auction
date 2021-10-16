import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { getAPI } from '../utils/api';

import CarouselItems from './common/Carouseltems';

const API_URL = process.env.API_URL;

const HomePage = () => {
  const [almostExpiredProducts, setAlmostExpiredProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [highestPriceProducts, setHighestPriceProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [almostExpiredResponse, popularResponse, highestPriceResponse] =
      await Promise.all([
        getAPI('/api/product?mode=finishSoon&&limit=5'),
        getAPI('/api/product?mode=bidCount&&limit=5'),
        getAPI('/api/product?mode=price&&limit=5'),
      ]);

    if (!almostExpiredResponse.error) {
      setAlmostExpiredProducts(almostExpiredResponse.products);
    }

    if (!popularResponse.error) {
      setPopularProducts(popularResponse.products);
    }

    if (!highestPriceResponse.error) {
      setHighestPriceProducts(highestPriceResponse.products);
    }
  };

  return (
    <div className="uk-padding-small">
      <div className="page uk-margin-auto">
        <Title
          first
          className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase"
        >
          Sản phẩm sắp hết hạn
        </Title>
        <CarouselItems
          data={almostExpiredProducts}
          renderItem={(item) => {
            return (
              <AlmostExpireProduct
                key={item._id}
                className="uk-card uk-card-default"
              >
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
                    Giá hiện tại:{' '}
                    <b>{Number(item.currentPrice).toLocaleString()} đ</b>
                  </p>
                  <small>Số lượt ra giá: {item.bidCount}</small>
                  <p className="uk-text-danger uk-text-bold uk-margin-remove-top uk-margin-remove-bottom">
                    Hết hạn:{' '}
                    {dayjs(item.expiredAt).format('HH:mm - DD/MM/YYYY')}
                  </p>
                </div>
              </AlmostExpireProduct>
            );
          }}
        />
        <Title className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
          Sản phẩm nổi bật
        </Title>
        <CarouselItems
          data={popularProducts}
          renderItem={(item) => {
            return (
              <MostPopularProduct
                key={item._id}
                className="uk-card uk-card-default"
              >
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
                    Giá hiện tại: {Number(item.currentPrice).toLocaleString()} đ
                  </p>
                  <h4
                    className="uk-text-bold uk-margin-remove-top uk-margin-remove-bottom"
                    style={{ color: '#666' }}
                  >
                    Số lượt ra giá: {item.bidCount}
                  </h4>
                </div>
              </MostPopularProduct>
            );
          }}
        />
        <Title className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
          Sản phẩm giá cao nhất
        </Title>
        <CarouselItems
          data={highestPriceProducts}
          renderItem={(item) => {
            return (
              <HighestPriceProduct
                key={item._id}
                className="uk-card uk-card-default"
              >
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
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;

const AlmostExpireProduct = styled.div`
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 70px;
  }
`;

const MostPopularProduct = styled.div`
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 70px;
  }
`;

const HighestPriceProduct = styled.div`
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 70px;
  }
`;

const Title = styled.p`
  ${(props) =>
    !props.first &&
    css`
      margin-top: 100px;
    `}
`;
