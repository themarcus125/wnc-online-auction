import React from 'react';
import styled from 'styled-components';

const SearchPage = () => {
  return (
    <Wrapper className="uk-padding">
      <div className="page uk-margin-auto">
        <div className="uk-flex uk-flex-between uk-margin-bottom">
          <input className="uk-input black-border" type="text" />
          <select class="uk-select drop-down black-border">
            <option>Category 01</option>
            <option>Categoryyyyyy 02</option>
          </select>
          <button className="uk-button button">Tìm kiếm</button>
        </div>
        <div className="uk-child-width-auto uk-flex uk-flex-between uk-flex-bottom uk-margin-bottom">
          <span>
            <b>2,261</b> results for ps5
          </span>
          <select class="uk-select drop-down">
            <option>Thời gian kết thúc giảm dần</option>
            <option>Giá tăng dần</option>
          </select>
        </div>
        <div>
          <div className="uk-flex uk-flex-row black-border item-container">
            <img
              className="image"
              src="https://picsum.photos/seed/picsum/200/300"
            />
            <div className="uk-flex uk-flex-1 uk-flex-column">
              <div className="uk-flex uk-flex-row uk-flex-between">
                <p className="uk-text-large uk-margin-remove-bottom ">
                  PS5 mới toanh
                </p>
                <span className="banner uk-text-bold uk-background-primary">
                  NEW
                </span>
              </div>
              <p className="uk-margin-remove-bottom">
                2,999,999 đ - Bidder: Trần Văn A
              </p>
              <p className="uk-text-large uk-margin-remove-bottom uk-text-bold">
                Giá mua ngay: 15,000,000 đ
              </p>
              <p className="uk-margin-remove-bottom">
                <small className="uk-margin-right">Số lượt ra giá: 10</small>{' '}
                Thời gian còn lại: <b>15 ngày</b>
              </p>
              <small>Ngày đăng: 21/8/2021</small>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  .black-border {
    border: 0.5px solid #666 !important;
  }
  .drop-down {
    text-overflow: ellipsis;
    width: 150px;
  }
  .button {
    width: 150px;
    margin-left: 10px;
  }
  .image {
    object-fit: cover;
    width: 200px;
    height: 200px;
    margin-right: 10px;
  }
  .item-container {
    padding: 10px;
  }
  .page {
    max-width: 1000px;
  }
  .banner {
    color: white;
    align-self: flex-start;
    padding: 5px;
  }
`;
