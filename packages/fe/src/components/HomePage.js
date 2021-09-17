import React from 'react';
import styled from 'styled-components';

import CarouselItems from './common/Carouseltems';

const HomePage = () => {
  return (
    <div className="uk-padding-small">
      <div className="page uk-margin-auto">
        <p className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
          Sản phẩm sắp hết hạn
        </p>
        <CarouselItems
          data={[1, 2, 3, 4, 5]}
          renderItem={(item) => {
            return (
              <AlmostExpireProduct
                key={item}
                className="uk-card uk-card-default"
              >
                <div className="uk-card-media-top">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '200px',
                    }}
                  />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title title">
                    PS5 tên title rất là dài dài dài ơi là dài luônnn
                  </h3>
                  <p className="uk-margin-remove-top uk-margin-remove-bottom">
                    2, 999, 000 đ
                  </p>
                  <small>Số lượt ra giá: 10</small>
                  <p className="uk-text-danger uk-margin-remove-top uk-margin-remove-bottom">
                    16/09/2021 - 20:00
                  </p>
                </div>
              </AlmostExpireProduct>
            );
          }}
        />
        <p className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
          Sản phẩm nổi bật
        </p>
        <CarouselItems
          data={[1, 2, 3, 4, 5]}
          renderItem={(item) => {
            return (
              <MostPopularProduct
                key={item}
                className="uk-card uk-card-default"
              >
                <div className="uk-card-media-top">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '200px',
                    }}
                  />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title title">
                    PS5 tên title rất là dài dài dài ơi là dài luônnn
                  </h3>
                  <p className="uk-margin-remove-top uk-margin-remove-bottom">
                    2, 999, 000 đ
                  </p>
                  <h4
                    className="uk-text-bold uk-margin-remove-top uk-margin-remove-bottom"
                    style={{ color: '#666' }}
                  >
                    Số lượt ra giá: 10
                  </h4>
                </div>
              </MostPopularProduct>
            );
          }}
        />
        <p className="uk-text-center uk-text-bold uk-text-large uk-text-uppercase">
          Sản phẩm giá cao nhất
        </p>
        <CarouselItems
          data={[1, 2, 3, 4, 5]}
          renderItem={(item) => {
            return (
              <HighestPriceProduct
                key={item}
                className="uk-card uk-card-default"
              >
                <div className="uk-card-media-top">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '200px',
                    }}
                  />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title title">
                    PS5 tên title rất là dài dài dài ơi là dài luônnn
                  </h3>
                  <h4
                    className="uk-text-bold uk-margin-remove-top uk-margin-remove-bottom"
                    style={{ color: '#666' }}
                  >
                    2, 999, 000 đ
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
  }
`;

const MostPopularProduct = styled.div`
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const HighestPriceProduct = styled.div`
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
