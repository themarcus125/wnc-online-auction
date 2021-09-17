import React, { useEffect } from 'react';
import UIKit from 'uikit/dist/js/uikit.min.js';
import styled from 'styled-components';

const CarouselItems = ({ data, renderItem }) => {
  useEffect(() => {
    UIKit.slider('#slider');
  }, []);

  return (
    <div id="slider" className="uk-slider-container-offset" uk-slider="">
      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
      >
        <ul className="uk-slider-items uk-child-width-1-3@s uk-grid">
          {data?.map((item) => {
            return <li key={item}>{renderItem(item)}</li>;
          })}
          {/* <li>
            <AlmostExpireProduct className="uk-card uk-card-default">
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
          </li>
          <li>
            <MostPopularProduct className="uk-card uk-card-default">
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
          </li>
          <li>
            <HighestPriceProduct className="uk-card uk-card-default">
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
          </li>
          <li>
            <div className="uk-card uk-card-default">
              <div className="uk-card-media-top">
                <img src="images/photo2.jpg" alt="" />
              </div>
              <div className="uk-card-body">
                <h3 className="uk-card-title">Headline</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="uk-card uk-card-default">
              <div className="uk-card-media-top">
                <img src="images/photo3.jpg" alt="" />
              </div>
              <div className="uk-card-body">
                <h3 className="uk-card-title">Headline</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </li> */}
        </ul>

        <a
          className="uk-position-center-left"
          href="#"
          uk-slidenav-previous
          uk-slider-item="previous"
          style={ArrowButton}
          uk-icon="chevron-left"
        ></a>
        <a
          className="uk-position-center-right"
          href="#"
          uk-slidenav-next
          uk-slider-item="next"
          style={ArrowButton}
          uk-icon="chevron-right"
        ></a>
      </div>
    </div>
  );
};

export default CarouselItems;

const ArrowButton = {
  height: 50,
  width: 50,
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.3)',
};
