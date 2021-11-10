import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import dayjs from 'dayjs';
import UIKit from 'uikit/dist/js/uikit.min.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from '../../hooks/useNavigate';
import { useProduct } from '../../hooks/useProduct';
import useStore from '../../store/useStore';

import LoadingOverlay from './LoadingOverlay';
import CarouselItems from './Carouseltems';
import MostPopularProduct from '../common/Carousel/MostPopularProduct';
import Modal, { showModal } from './Modal';

import {
  getAPI,
  postAPIWithToken,
  patchAPIWithToken,
  deleteAPIWithToken,
} from '../../utils/api';
import { hoursToString } from '../../utils/time';
import { getToken, getUser } from '../../utils/auth';
import { checkIfValidBid, maskedString } from '../../utils/bid';

import { DEFAULT_ERROR, LOGIN_REQUIRED } from '../../utils/constants/error';
import {
  PRODUCT_STATUS,
  VALID_RATING_SCORE,
} from '../../utils/constants/product';
import CommonLayout from './Layout/CommonLayout';

const API_URL = process.env.REACT_APP_API_URL;
const bidHistoryModalID = 'bidHistoryModal';

const ProductDetailPage = () => {
  const { _id: userId } = getUser();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [otherProducts, setOtherProducts] = useState([]);
  const [bidHistory, setBidHistory] = useState([]);
  const [biddersBid, setBiddersBid] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [autoBidAmount, setAutoBidAmount] = useState('');
  const [status, setStatus] = useState(PRODUCT_STATUS.NORMAL);
  const watchList = useStore((state) => state.watchList);
  const productList = useStore((state) => state.productList);
  const addItemToWatchList = useStore((state) => state.addItemToWatchList);
  const removeItemFromWatchList = useStore(
    (state) => state.removeItemFromWatchList,
  );
  const [currentBidderScore, setCurrentBidderScore] = useState({});
  const [sellerScore, setSellerScore] = useState({});
  const [userScore, setUserScore] = useState({});

  const { navigate } = useNavigate();
  const { productId } = useProduct();

  const isFavouriteProduct =
    watchList.findIndex(
      (item) => item.product === productId || item.product._id === productId,
    ) !== -1;

  useEffect(() => {
    if (productId) {
      loadProduct();
      window.scrollTo(0, 0);
    }
  }, [productId]);

  useEffect(() => {
    const index = productList.findIndex((product) => product._id === productId);
    if (index !== -1) {
      console.log(productList[index]);
      setProduct(productList[index]);
    }
  }, [productList]);

  const loadProduct = async () => {
    setLoading(true);
    const response = await getAPI(`/api/product/${productId}`);
    if (response && !response.error) {
      setProduct(response);
      setIsOwner(userId === response.seller._id);
      loadOtherProduct(response.category._id);
      loadRatingScores(response.seller?._id, response.currentBidder?._id);

      if (userId === response.seller._id) {
        loadBid();
      }

      let productStatus = PRODUCT_STATUS.NORMAL;
      if (
        dayjs().diff(dayjs(response.expiredAt), 'millisecond') > 0 &&
        response.status === PRODUCT_STATUS.NORMAL
      ) {
        productStatus = PRODUCT_STATUS.EXPIRED;
      } else {
        productStatus = response.status;
      }
      setStatus(productStatus);
    }
    setLoading(false);
    if (!response) {
      navigate('/');
    }
  };

  const loadRatingScores = async (sellerId, bidderId) => {
    const [sellerResponse, userResponse] = await Promise.all([
      getAPI(`/api/rating/score/${sellerId}`),
      getAPI(`/api/rating/score/${userId}`),
    ]);

    if (bidderId) {
      const bidderResponse = await getAPI(`/api/rating/score/${bidderId}`);

      if (!bidderResponse.error) {
        setCurrentBidderScore(bidderResponse);
      }
    }

    if (!sellerResponse.error) {
      setSellerScore(sellerResponse);
    }
    if (!userResponse.error) {
      setUserScore(userResponse);
    }
  };

  const loadBidHistory = async () => {
    setLoading(true);
    const response = await getAPI(`/api/bid/product/${productId}`);
    if (response && !response.error) {
      setBidHistory(response.reverse());
    }
    setLoading(false);
  };

  const loadBid = async () => {
    // Seller load bidders' bids
    setLoading(true);
    const response = await getAPI(`/api/bid/product/${productId}`);
    if (response && !response.error) {
      const bidders = [];
      response.reverse().forEach((item) => {
        if (
          bidders.findIndex((bid) => bid.bidder._id === item.bidder._id) === -1
        ) {
          bidders.push(item);
        }
      });
      setBiddersBid(bidders);
    }
    setLoading(false);
  };

  const loadOtherProduct = async (categoryId) => {
    const productListResponse = await getAPI(
      `/api/product?mode=category&&category=${categoryId}&&productId=${productId}&&limit=5&&skip=0`,
    );
    if (!productListResponse.error) {
      setOtherProducts(productListResponse.products);
    }
  };

  const openBidHistory = () => {
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    showModal(bidHistoryModalID);
    loadBidHistory();
  };

  const onTerminateBid = (bidId) => {
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn hủy lượt ra giá này?').then(
      async () => {
        setLoading(true);
        const token = await getToken();
        const response = await patchAPIWithToken(
          `/api/bid/${bidId}/reject`,
          {},
          token,
        );
        if (!response.error) {
          toast.success('Từ chối bid thành công');
          loadProduct();
        }
        setLoading(false);
      },
      () => {},
    );
  };

  const onBuyNow = async () => {
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    if (product.onlyRatedBidder) {
      toast.error('Bạn cần có điểm đánh giá mới có thểm gia đấu giá!');
      return;
    }

    const token = await getToken();
    const response = await patchAPIWithToken(
      `/api/bid/product/${productId}/buynow`,
      {
        productId,
      },
      token,
    );

    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }

    if (!response.error) {
      toast.success('Mua thành công!');
      loadProduct();
    }
  };

  const onPlaceBid = async () => {
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    if (
      product.onlyRatedBidder &&
      (userScore.total === 0 ||
        userScore.pos / userScore.total >= VALID_RATING_SCORE)
    ) {
      toast.error('Bạn cần có điểm đánh giá cao mới có thểm gia đấu giá!');
      return;
    }

    const bidPrice = bidAmount.split(',').join('');
    if (
      typeof Number(bidPrice) !== 'number' ||
      bidPrice < product.currentPrice + product.stepPrice ||
      (product.buyPrice > 0 && bidPrice >= product.buyPrice) ||
      !checkIfValidBid(Number(bidPrice), product.stepPrice, product.startPrice)
    ) {
      toast.error('Giá bid không hợp lệ');
      return;
    }

    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn bid với giá này?').then(
      async () => {
        setLoading(true);
        const token = await getToken();
        const response = await postAPIWithToken(
          '/api/bid',
          {
            product: productId,
            price: Number(bidPrice),
          },
          token,
        );

        if (response.error && response.message === 'REJECTED_BIDDER') {
          toast.error('Bạn đã bị cấm đấu giá sản phẩm này');
        }
        if (response.error && response.message === 'CURRENT_BIDDER') {
          toast.error('Bạn đang là người đấu giá cao nhất!');
        }
        if (!response.error) {
          toast.success('Đặt bid thành công!');
          setBidAmount('');
          // setProduct(response.product);
        }
        setLoading(false);
      },
      () => {},
    );
  };

  const onPlaceAutoBid = () => {
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    if (
      product.onlyRatedBidder &&
      (userScore.total === 0 ||
        userScore.pos / userScore.total >= VALID_RATING_SCORE)
    ) {
      toast.error('Bạn cần có điểm đánh giá cao mới có thểm gia đấu giá!');
      return;
    }

    const autoBidPrice = autoBidAmount.split(',').join('');
    if (
      typeof Number(autoBidPrice) !== 'number' ||
      autoBidPrice < product.currentPrice + product.stepPrice ||
      (product.buyPrice > 0 && autoBidPrice >= product.buyPrice) ||
      !checkIfValidBid(
        Number(autoBidPrice),
        product.stepPrice,
        product.startPrice,
      )
    ) {
      toast.error('Giá bid không hợp lệ');
      return;
    }

    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal
      .confirm('Bạn có chắc chắn muốn bid tự động với số tiền này?')
      .then(
        async () => {
          setLoading(true);
          const token = await getToken();
          const response = await postAPIWithToken(
            '/api/bid',
            {
              product: productId,
              price: product.currentPrice + product.stepPrice,
              maxAutoPrice: Number(autoBidPrice),
            },
            token,
          );

          if (response.error && response.message === 'REJECTED_BIDDER') {
            toast.error('Bạn đã bị cấm đấu giá sản phẩm này');
          }
          if (response.error && response.message === 'CURRENT_BIDDER') {
            toast.error('Bạn đang là người đấu giá cao nhất!');
          }
          if (!response.error) {
            toast.success('Đặt bid tự động thành công!');
            setAutoBidAmount('');
            // setProduct(response.product);
          }
          setLoading(false);
        },
        () => {},
      );
  };

  const onAmountBidChange = (e) => {
    const number = e.target.value.split(',').join('');
    setBidAmount(Number(number).toLocaleString());
  };

  const onAutoBidAmountChange = (e) => {
    const number = e.target.value.split(',').join('');
    setAutoBidAmount(Number(number).toLocaleString());
  };

  const renderStatus = () => {
    switch (status) {
      case PRODUCT_STATUS.EXPIRED:
        return (
          <p className="uk-text-bold uk-text-large uk-text-danger">
            Đã hết hạn
          </p>
        );
      case PRODUCT_STATUS.SOLD:
        return (
          <p className="uk-text-bold uk-text-large uk-text-success">Đã bán</p>
        );
      case PRODUCT_STATUS.CANCELED:
        return (
          <p className="uk-text-bold uk-text-large uk-text-success">
            Đã bị hủy
          </p>
        );
      default:
        return (
          <p className="uk-text-small">
            Thời hạn còn lại: {timeLeft} |{' '}
            <b>{dayjs(product.expiredAt || '').format('HH:mm - DD/MM/YYYY')}</b>
          </p>
        );
    }
  };

  const onAddToWatchList = async () => {
    if (!userId) {
      toast.error(LOGIN_REQUIRED);
      return;
    }

    if (!isFavouriteProduct) {
      const token = await getToken();
      const response = await postAPIWithToken(
        `/api/user/watchlist`,
        {
          product: productId,
        },
        token,
      );
      if (!response.error) {
        toast.success('Sản phẩm đã được thêm vào Watch list');
        addItemToWatchList(response);
      }
    } else {
      const watchlistIndex = watchList.findIndex(
        (item) => item.product._id === productId,
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

  const onClickSuggestedPrice = () => {
    setBidAmount(
      Number(
        (product.currentPrice || 0) + (product.stepPrice || 0),
      ).toLocaleString(),
    );
  };

  const hourDiff = dayjs(product.expiredAt || '').diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  return (
    <CommonLayout>
      <Helmet title={`${product.name || ''} - Biddly`} defer={false} />
      <div className="uk-padding-small">
        <div className="page uk-margin-auto">
          <div>
            <ToastContainer
              position={toast.POSITION.TOP_RIGHT}
              autoClose={3000}
              theme="colored"
            />
            {/*Head*/}
            <div className="uk-flex uk-flex-row">
              <ImageContainer>
                <CarouselItems
                  data={product.images || []}
                  renderItem={(item) => {
                    return <Image src={`${API_URL}/${item}`} />;
                  }}
                  itemsPerPage={1}
                />
              </ImageContainer>
              <div className="uk-width-expand">
                <h3 className="uk-text-primary uk-text-bold">
                  {product.name || ''}
                </h3>
                <Divider />
                <div className="uk-margin-top">
                  <p className="uk-text-small">
                    Ngày đăng:{' '}
                    {dayjs(product.createdAt || '').format(
                      'HH:mm - DD/MM/YYYY',
                    )}
                  </p>
                  {renderStatus()}
                  <p className="uk-text-small uk-flex uk-flex-between">
                    <span>Lượt bid: {product.bidCount}</span>
                    <HistoryButton
                      className="uk-text-primary"
                      onClick={openBidHistory}
                    >
                      Lịch sử đấu giá
                    </HistoryButton>
                  </p>
                </div>
                <Divider />
                <div className="uk-flex uk-flex-row uk-margin-top uk-margin-bottom">
                  <div className="uk-width-expand">
                    <span className="uk-margin-right uk-margin-bottom uk-text-bold uk-text-large uk-width-expand">
                      Giá hiện tại:{' '}
                      {Number(product.currentPrice || 0).toLocaleString()} đ
                    </span>
                    {!isOwner && status === PRODUCT_STATUS.NORMAL && (
                      <div className="uk-flex uk-flex-bottom uk-flex-column uk-margin-top">
                        <div>
                          <div>
                            <BidInput
                              className="uk-input"
                              placeholder="Nhập bid"
                              value={bidAmount}
                              onChange={onAmountBidChange}
                            />
                            <Button
                              className="uk-button uk-button-primary"
                              onClick={onPlaceBid}
                              disabled={loading}
                            >
                              Đặt bid
                            </Button>
                          </div>
                          <small>
                            Bước giá:{' '}
                            {Number(product.stepPrice || 0).toLocaleString()} đ
                            - Giá đề nghị:{' '}
                            <SuggestedPriceButton
                              className="uk-text-primary"
                              onClick={onClickSuggestedPrice}
                            >
                              {Number(
                                (product.currentPrice || 0) +
                                  (product.stepPrice || 0),
                              ).toLocaleString()}{' '}
                              đ
                            </SuggestedPriceButton>
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!isOwner && status === PRODUCT_STATUS.NORMAL && (
                  <>
                    <Divider />
                    <div className="uk-flex uk-flex-row uk-margin-top uk-margin-bottom">
                      <div className="uk-width-expand">
                        <span className="uk-margin-right uk-margin-bottom uk-text-bold uk-text-large uk-width-expand">
                          Đấu giá tự động
                        </span>
                        <div className="uk-flex uk-flex-bottom uk-flex-column uk-margin-top">
                          <div>
                            <div>
                              <BidInput
                                className="uk-input"
                                placeholder="Nhập giá cao nhất"
                                value={autoBidAmount}
                                onChange={onAutoBidAmountChange}
                              />
                              <Button
                                className="uk-button uk-button-primary"
                                onClick={onPlaceAutoBid}
                                disabled={loading}
                              >
                                Xác nhận
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="uk-flex uk-flex-right uk-margin-top"></div>
                {product.buyPrice > 0 && (
                  <>
                    <Divider />
                    <div className="uk-flex uk-flex-row uk-margin-top uk-margin-bottom">
                      <span className="uk-margin-right uk-text-bold uk-text-large uk-width-expand">
                        Giá mua ngay:{' '}
                        {Number(product.buyPrice || 0).toLocaleString()} đ
                      </span>
                      {!isOwner && status === PRODUCT_STATUS.NORMAL && (
                        <Button
                          className="uk-button uk-button-primary"
                          onClick={onBuyNow}
                        >
                          Mua ngay
                        </Button>
                      )}
                    </div>
                  </>
                )}
                {!isOwner && (
                  <div className="uk-flex uk-flex-right">
                    <Button
                      className={`uk-button uk-flex uk-flex-middle uk-flex-center uk-text-right ${
                        isFavouriteProduct
                          ? 'uk-button-default'
                          : 'uk-button-danger'
                      }`}
                      disabled={status !== PRODUCT_STATUS.NORMAL}
                      onClick={onAddToWatchList}
                    >
                      {isFavouriteProduct ? 'Đã yêu thích' : 'Yêu thích'}{' '}
                      <span
                        className="uk-margin-small-left"
                        uk-icon="heart"
                      ></span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {isOwner && (
              <div className="uk-margin-top">
                <p className="uk-text-bold uk-text-large">
                  Thông tin các người đấu giá
                </p>
                <table className="uk-table uk-table-divider uk-table-striped">
                  <thead>
                    <tr>
                      <th className="uk-width-large">Người đấu giá</th>
                      <th className="uk-width-large">Email</th>
                      <th className="uk-width-large">Số tiền</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {biddersBid.map((bid) => {
                      return (
                        <tr key={bid._id}>
                          <td className="uk-text-middle">
                            {maskedString(bid.bidder.name)}
                          </td>
                          <td className="uk-text-middle">{bid.bidder.email}</td>
                          <td className="uk-text-middle">
                            {Number(bid.price).toLocaleString()} đ
                          </td>
                          <td>
                            <button
                              className="uk-button uk-button-danger"
                              style={{ width: '120px' }}
                              disabled={loading}
                              onClick={() => onTerminateBid(bid._id)}
                            >
                              Từ chối
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className="uk-flex uk-flex-row uk-margin-top">
              {/*Thông tin người bán*/}
              <div className="uk-flex-1">
                <p className="uk-text-bold uk-text-large">
                  Thông tin người bán
                </p>
                <p>Họ tên: {product.seller?.name || ''}</p>
                <p>Email: {product.seller?.email || ''}</p>
                <p>
                  Điểm đánh giá: {sellerScore.pos}/{sellerScore.total}
                </p>
              </div>
              <div
                className="uk-flex-stretch"
                style={{
                  width: 1,
                  backgroundColor: 'gray',
                  marginRight: '20px',
                  marginLeft: '20px',
                }}
              />
              {/*Thông tin bidder cao nhất*/}
              <div className="uk-flex-1">
                <p className="uk-text-bold uk-text-large">
                  Thông tin bidder cao nhất
                </p>
                {product.currentBidder ? (
                  <>
                    <p>Họ tên: {product.currentBidder?.name || ''}</p>
                    <p>
                      Điểm đánh giá: {currentBidderScore.pos ?? 0}/
                      {currentBidderScore.total ?? 0}
                    </p>
                  </>
                ) : (
                  <p>Chưa có người bid</p>
                )}
              </div>
            </div>
            <div className="uk-margin-top">
              <p className="uk-text-bold uk-text-large">Mô tả sản phẩm</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.descriptions?.join('') || '',
                }}
              />
            </div>
            <div className="uk-margin-top">
              <p className="uk-text-bold uk-text-large">Sản phẩm khác</p>
              <CarouselItems
                data={otherProducts}
                renderItem={(item) => {
                  return <MostPopularProduct key={item._id} item={item} />;
                }}
                itemsPerPage={3}
              />
            </div>
          </div>
          <LoadingOverlay isLoading={loading} />
          <Modal modalID={bidHistoryModalID} title="Lịch sử đấu giá">
            <div>
              <table className="uk-table uk-table-divider uk-table-striped">
                <thead>
                  <tr>
                    <th>Thời điểm</th>
                    <th>Người đấu giá</th>
                    <th>Số tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {bidHistory.map((row) => {
                    return (
                      <tr key={row._id}>
                        <td>
                          {dayjs(row.createdAt).format('HH:mm - DD/MM/YYYY')}
                        </td>
                        <td>{maskedString(row.bidder.name)}</td>
                        <td>{Number(row.price).toLocaleString()} đ</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Modal>
        </div>
      </div>
    </CommonLayout>
  );
};

export default ProductDetailPage;

const Image = styled.img`
  object-fit: contain;
  width: 400px;
  height: 400px;
  margin-right: 10px;
  background-color: #f2f3f2;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
`;

const Button = styled.button`
  width: 190px;
  height: 40px;
`;

const BidInput = styled.input`
  width: 250px !important;
  height: 40px;
`;

const HistoryButton = styled.span`
  cursor: pointer;
`;

const SuggestedPriceButton = styled.span`
  cursor: pointer;
`;
