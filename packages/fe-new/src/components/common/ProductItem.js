import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import { useNavigate } from '../../hooks/useNavigate';
import { ToastContainer, toast } from 'react-toastify';

import useStore from '../../store/useStore';

import { hoursToString } from '../../utils/time';
import { getUser, getToken } from '../../utils/auth';
import { postAPIWithToken, deleteAPIWithToken } from '../../utils/api';

import { LOGIN_REQUIRED } from '../../utils/constants/error';

const API_URL = process.env.REACT_APP_API_URL;

const ProductItem = ({ productData, isWatchListScreen = false }) => {
  const [product, setProduct] = useState(productData);
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
  } = product;
  const productList = useStore((state) => state.productList);
  const watchList = useStore((state) => state.watchList);
  const addItemToWatchList = useStore((state) => state.addItemToWatchList);
  const removeItemFromWatchList = useStore(
    (state) => state.removeItemFromWatchList,
  );
  const { _id: userId } = getUser();
  const isFavouriteProduct =
    watchList.findIndex(
      (item) => item.product === _id || item.product._id === _id,
    ) !== -1;
  const hourDiff = dayjs(expiredAt).diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  const { navigate } = useNavigate();

  useEffect(() => {
    const index = productList.findIndex((product) => product._id === _id);
    if (index !== -1) {
      setProduct(productList[index]);
    }
  }, [productList]);

  const onClick = () => {
    navigate(`/product/${_id}`);
  };

  const onAddToWatchList = async (e) => {
    e.stopPropagation();
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    if (!isFavouriteProduct) {
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
        addItemToWatchList(response);
      }
    } else {
      const watchlistIndex = watchList.findIndex(
        (item) => item.product._id === _id,
      );

      if (watchlistIndex === -1) {
        return;
      }
      const token = await getToken();
      const response = await deleteAPIWithToken(
        `/api/user/watchlist/${watchList[watchlistIndex]._id}`,
        token,
      );

      if (!response.error) {
        toast.success('Sản phẩm đã được xóa khỏi Watch list');
        removeItemFromWatchList(watchList[watchlistIndex]._id);
      }
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
                style={{
                  cursor: 'pointer',
                  padding: '5px 10px',
                  backgroundColor: isFavouriteProduct ? '#f1f1f1' : '#f0506e',
                  color: isFavouriteProduct ? '#f0506e' : '#f1f1f1',
                  borderRadius: '4px',
                }}
                onClick={onAddToWatchList}
              >
                {isFavouriteProduct ? 'Đã yêu thích' : 'Yêu thích'}{' '}
                <span uk-icon="heart"></span>
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
