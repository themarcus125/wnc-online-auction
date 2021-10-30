import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Helmet from 'react-helmet';

import { getAPI } from '../utils/api';

import CommonLayout from '../components/common/Layout/CommonLayout';
import CarouselItems from '../components/common/Carouseltems';
import MostPopularProduct from '../components/common/Carousel/MostPopularProduct';
import HighestPriceProduct from '../components/common/Carousel/HighestPriceProduct';
import AlmostExpireProduct from '../components/common/Carousel/AlmostExpireProduct';

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
    <CommonLayout>
      <Helmet title="Trang chủ | Biddly" />

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
              return <AlmostExpireProduct key={item._id} item={item} />;
            }}
          />
          <Title className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
            Sản phẩm nổi bật
          </Title>
          <CarouselItems
            data={popularProducts}
            renderItem={(item) => {
              return <MostPopularProduct key={item._id} item={item} />;
            }}
          />
          <Title className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
            Sản phẩm giá cao nhất
          </Title>
          <CarouselItems
            data={highestPriceProducts}
            renderItem={(item) => {
              return <HighestPriceProduct key={item._id} item={item} />;
            }}
          />
        </div>
      </div>
    </CommonLayout>
  );
};

export default HomePage;

const Title = styled.p`
  ${(props) =>
    !props.first &&
    css`
      margin-top: 100px;
    `}
`;
