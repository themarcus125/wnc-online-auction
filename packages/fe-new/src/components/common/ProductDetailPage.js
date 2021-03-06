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
    UIKit.modal.labels = { ok: '?????ng ??', cancel: 'Kh??ng' };
    UIKit.modal.confirm('B???n c?? ch???c ch???n mu???n h???y l?????t ra gi?? n??y?').then(
      async () => {
        setLoading(true);
        const token = await getToken();
        const response = await patchAPIWithToken(
          `/api/bid/${bidId}/reject`,
          {},
          token,
        );
        if (!response.error) {
          toast.success('T??? ch???i bid th??nh c??ng');
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
      toast.error('B???n c???n c?? ??i???m ????nh gi?? m???i c?? th???m gia ?????u gi??!');
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
      toast.success('Mua th??nh c??ng!');
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
      toast.error('B???n c???n c?? ??i???m ????nh gi?? cao m???i c?? th???m gia ?????u gi??!');
      return;
    }

    const bidPrice = bidAmount.split(',').join('');
    if (
      typeof Number(bidPrice) !== 'number' ||
      bidPrice < product.currentPrice + product.stepPrice ||
      (product.buyPrice > 0 && bidPrice >= product.buyPrice) ||
      !checkIfValidBid(Number(bidPrice), product.stepPrice, product.startPrice)
    ) {
      toast.error('Gi?? bid kh??ng h???p l???');
      return;
    }

    UIKit.modal.labels = { ok: '?????ng ??', cancel: 'Kh??ng' };
    UIKit.modal.confirm('B???n c?? ch???c ch???n mu???n bid v???i gi?? n??y?').then(
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
          toast.error('B???n ???? b??? c???m ?????u gi?? s???n ph???m n??y');
        }
        if (response.error && response.message === 'CURRENT_BIDDER') {
          toast.error('B???n ??ang l?? ng?????i ?????u gi?? cao nh???t!');
        }
        if (!response.error) {
          toast.success('?????t bid th??nh c??ng!');
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
      toast.error('B???n c???n c?? ??i???m ????nh gi?? cao m???i c?? th???m gia ?????u gi??!');
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
      toast.error('Gi?? bid kh??ng h???p l???');
      return;
    }

    UIKit.modal.labels = { ok: '?????ng ??', cancel: 'Kh??ng' };
    UIKit.modal
      .confirm('B???n c?? ch???c ch???n mu???n bid t??? ?????ng v???i s??? ti???n n??y?')
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
            toast.error('B???n ???? b??? c???m ?????u gi?? s???n ph???m n??y');
          }
          if (response.error && response.message === 'CURRENT_BIDDER') {
            toast.error('B???n ??ang l?? ng?????i ?????u gi?? cao nh???t!');
          }
          if (!response.error) {
            toast.success('?????t bid t??? ?????ng th??nh c??ng!');
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
            ???? h???t h???n
          </p>
        );
      case PRODUCT_STATUS.SOLD:
        return (
          <p className="uk-text-bold uk-text-large uk-text-success">???? b??n</p>
        );
      case PRODUCT_STATUS.CANCELED:
        return (
          <p className="uk-text-bold uk-text-large uk-text-success">
            ???? b??? h???y
          </p>
        );
      default:
        return (
          <p className="uk-text-small">
            Th???i h???n c??n l???i: {timeLeft} |{' '}
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
        toast.success('S???n ph???m ???? ???????c th??m v??o Watch list');
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
        toast.success('S???n ph???m ???? ???????c x??a kh???i Watch list');
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
                    Ng??y ????ng:{' '}
                    {dayjs(product.createdAt || '').format(
                      'HH:mm - DD/MM/YYYY',
                    )}
                  </p>
                  {renderStatus()}
                  <p className="uk-text-small uk-flex uk-flex-between">
                    <span>L?????t bid: {product.bidCount}</span>
                    <HistoryButton
                      className="uk-text-primary"
                      onClick={openBidHistory}
                    >
                      L???ch s??? ?????u gi??
                    </HistoryButton>
                  </p>
                </div>
                <Divider />
                <div className="uk-flex uk-flex-row uk-margin-top uk-margin-bottom">
                  <div className="uk-width-expand">
                    <span className="uk-margin-right uk-margin-bottom uk-text-bold uk-text-large uk-width-expand">
                      Gi?? hi???n t???i:{' '}
                      {Number(product.currentPrice || 0).toLocaleString()} ??
                    </span>
                    {!isOwner && status === PRODUCT_STATUS.NORMAL && (
                      <div className="uk-flex uk-flex-bottom uk-flex-column uk-margin-top">
                        <div>
                          <div>
                            <BidInput
                              className="uk-input"
                              placeholder="Nh???p bid"
                              value={bidAmount}
                              onChange={onAmountBidChange}
                            />
                            <Button
                              className="uk-button uk-button-primary"
                              onClick={onPlaceBid}
                              disabled={loading}
                            >
                              ?????t bid
                            </Button>
                          </div>
                          <small>
                            B?????c gi??:{' '}
                            {Number(product.stepPrice || 0).toLocaleString()} ??
                            - Gi?? ????? ngh???:{' '}
                            <SuggestedPriceButton
                              className="uk-text-primary"
                              onClick={onClickSuggestedPrice}
                            >
                              {Number(
                                (product.currentPrice || 0) +
                                  (product.stepPrice || 0),
                              ).toLocaleString()}{' '}
                              ??
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
                          ?????u gi?? t??? ?????ng
                        </span>
                        <div className="uk-flex uk-flex-bottom uk-flex-column uk-margin-top">
                          <div>
                            <div>
                              <BidInput
                                className="uk-input"
                                placeholder="Nh???p gi?? cao nh???t"
                                value={autoBidAmount}
                                onChange={onAutoBidAmountChange}
                              />
                              <Button
                                className="uk-button uk-button-primary"
                                onClick={onPlaceAutoBid}
                                disabled={loading}
                              >
                                X??c nh???n
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
                        Gi?? mua ngay:{' '}
                        {Number(product.buyPrice || 0).toLocaleString()} ??
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
                      {isFavouriteProduct ? '???? y??u th??ch' : 'Y??u th??ch'}{' '}
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
                  Th??ng tin c??c ng?????i ?????u gi??
                </p>
                <table className="uk-table uk-table-divider uk-table-striped">
                  <thead>
                    <tr>
                      <th className="uk-width-large">Ng?????i ?????u gi??</th>
                      <th className="uk-width-large">Email</th>
                      <th className="uk-width-large">S??? ti???n</th>
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
                            {Number(bid.price).toLocaleString()} ??
                          </td>
                          <td>
                            <button
                              className="uk-button uk-button-danger"
                              style={{ width: '120px' }}
                              disabled={loading}
                              onClick={() => onTerminateBid(bid._id)}
                            >
                              T??? ch???i
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
              {/*Th??ng tin ng?????i b??n*/}
              <div className="uk-flex-1">
                <p className="uk-text-bold uk-text-large">
                  Th??ng tin ng?????i b??n
                </p>
                <p>H??? t??n: {product.seller?.name || ''}</p>
                <p>Email: {product.seller?.email || ''}</p>
                <p>
                  ??i???m ????nh gi??: {sellerScore.pos}/{sellerScore.total}
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
              {/*Th??ng tin bidder cao nh???t*/}
              <div className="uk-flex-1">
                <p className="uk-text-bold uk-text-large">
                  Th??ng tin bidder cao nh???t
                </p>
                {product.currentBidder ? (
                  <>
                    <p>H??? t??n: {product.currentBidder?.name || ''}</p>
                    <p>
                      ??i???m ????nh gi??: {currentBidderScore.pos ?? 0}/
                      {currentBidderScore.total ?? 0}
                    </p>
                  </>
                ) : (
                  <p>Ch??a c?? ng?????i bid</p>
                )}
              </div>
            </div>
            <div className="uk-margin-top">
              <p className="uk-text-bold uk-text-large">M?? t??? s???n ph???m</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.descriptions?.join('') || '',
                }}
              />
            </div>
            <div className="uk-margin-top">
              <p className="uk-text-bold uk-text-large">S???n ph???m kh??c</p>
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
          <Modal modalID={bidHistoryModalID} title="L???ch s??? ?????u gi??">
            <div>
              <table className="uk-table uk-table-divider uk-table-striped">
                <thead>
                  <tr>
                    <th>Th???i ??i???m</th>
                    <th>Ng?????i ?????u gi??</th>
                    <th>S??? ti???n</th>
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
                        <td>{Number(row.price).toLocaleString()} ??</td>
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
