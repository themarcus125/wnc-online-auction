import React from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import { useNavigate } from '../../hooks/useNavigate';
import { ToastContainer, toast } from 'react-toastify';

import { hoursToString } from '../../utils/time';
import { getUser, getToken } from '../../utils/auth';
import { postAPIWithToken } from '../../utils/api';

import { LOGIN_REQUIRED } from '../../utils/constants/error';

const API_URL = process.env.REACT_APP_API_URL;

const ProductItem = ({ productData, isWatchListScreen = false }) => {
  const {
    name,
    currentPrice,
    buyPrice,
    images,
    createdAt,
    bidCount,
    expiredAt,
    _id,
    currentBidder,
  } = productData;
  const { _id: userId } = getUser();
  const hourDiff = dayjs(expiredAt).diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  const { navigate } = useNavigate();

  const onClick = () => {
    navigate(`/product/${_id}`);
  };

  const onAddToWatchList = async (e) => {
    e.stopPropagation();
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    const token = await getToken();
    const response = await postAPIWithToken(
      `/api/user/watchlist`,
      {
        product: _id,
      },
      token,
    );
    if (!response.error) {
      toast.success('Sản phẩm đã được thêm vào Watch list');
    }
  };

  return (
    <>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <Product
        className="uk-flex uk-flex-row uk-margin-bottom"
        onClick={onClick}
      >
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
            {Number(currentPrice).toLocaleString()} đ
            {currentBidder && <span> - Bidder: {currentBidder.name}</span>}
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
            {!isWatchListScreen && (
              <span
                className="uk-text-danger"
                style={{
                  cursor: 'pointer',
                  padding: '5px 10px',
                  backgroundColor: '#f1f1f1',
                  borderRadius: '4px',
                }}
                onClick={onAddToWatchList}
              >
                Yêu thích <span uk-icon="heart"></span>
              </span>
            )}
          </div>
        </div>
      </Product>
    </>
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
