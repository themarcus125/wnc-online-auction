import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import dayjs from 'dayjs';
import UIKit from 'uikit/dist/js/uikit.min.js';
import { ToastContainer, toast } from 'react-toastify';
import { navigate } from 'gatsby-link';

import LoadingOverlay from './LoadingOverlay';
import CarouselItems from './Carouseltems';
import MostPopularProduct from '../common/Carousel/MostPopularProduct';
import Modal, { showModal } from './Modal';

import { getAPI } from '../../utils/api';
import { hoursToString } from '../../utils/time';
import { getUser } from '../../utils/auth';

const API_URL = process.env.API_URL;
const bidHistoryModalID = 'bidHistoryModal';

const ProductDetailPage = ({ productId }) => {
  const { _id: userId } = getUser();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [otherProducts, setOtherProducts] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    const response = await getAPI(`/api/product/${productId}`);
    if (response && !response.error) {
      setProduct(response);
      setIsOwner(userId === response.seller._id);
      loadOtherProduct(response.category._id);
    }
    setLoading(false);
    if (!response) {
      navigate('/');
    }
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
    showModal(bidHistoryModalID);
  };

  const onTerminateBid = () => {
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn hủy lượt ra giá này?').then(
      () => {
        console.log('yes');
      },
      () => {},
    );
  };

  const onBuyNow = () => {
    if (!userId) {
      toast.error('Cần phải đăng nhập!');
      return;
    }
  };

  const onPlaceBid = () => {
    if (!userId) {
      toast.error('Cần phải đăng nhập!');
      return;
    }
  };

  const hourDiff = dayjs(product.expiredAt || '').diff(dayjs(), 'hour');
  const timeLeft = hoursToString(hourDiff);

  return (
    <>
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
                  <p className="uk-text-small">
                    Thời hạn còn lại: {timeLeft} |{' '}
                    <b>
                      {dayjs(product.expiredAt || '').format(
                        'HH:mm - DD/MM/YYYY',
                      )}
                    </b>
                  </p>
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
                    {!isOwner && (
                      <div className="uk-flex uk-flex-bottom uk-flex-column uk-margin-top">
                        <div>
                          <div>
                            <BidInput
                              className="uk-input"
                              placeholder="Nhập bid"
                            />
                            <Button
                              className="uk-button uk-button-primary"
                              onClick={onPlaceBid}
                            >
                              Đặt bid
                            </Button>
                          </div>
                          <small>
                            Bước giá:{' '}
                            {Number(product.stepPrice || 0).toLocaleString()} đ
                            - Giá đề nghị:{' '}
                            <SuggestedPriceButton className="uk-text-primary">
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
                {product.buyPrice > 0 && (
                  <>
                    <Divider />
                    <div className="uk-flex uk-flex-row uk-margin-top uk-margin-bottom">
                      <span className="uk-margin-right uk-text-bold uk-text-large uk-width-expand">
                        Giá mua ngay:{' '}
                        {Number(product.buyPrice || 0).toLocaleString()} đ
                      </span>
                      {!isOwner && (
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
                    <Button className="uk-button uk-flex uk-flex-middle uk-flex-center uk-text-right uk-button-danger">
                      Yêu thích{' '}
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
                    <tr>
                      <td>***Khoa</td>
                      <td>nva@gmail.com</td>
                      <td>7.000.000đ</td>
                      <td>
                        <button
                          className="uk-button uk-button-danger"
                          style={{ width: '120px' }}
                          onClick={onTerminateBid}
                        >
                          Từ chối
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>***Minh</td>
                      <td>nva@gmail.com</td>
                      <td>6.000.000đ</td>
                      <td>
                        <button
                          className="uk-button uk-button-danger"
                          style={{ width: '120px' }}
                          onClick={onTerminateBid}
                        >
                          Từ chối
                        </button>
                      </td>
                    </tr>
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
                <p>Điểm đánh giá: ???</p>
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
                <p>Họ tên: ???</p>
                <p>Điểm đánh giá: ???</p>
              </div>
            </div>
            <div className="uk-margin-top">
              <p className="uk-text-bold uk-text-large">Mô tả sản phẩm</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.descriptions?.[0] || '',
                }}
              />
            </div>
            <div>
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
                  <tr>
                    <td>19:40 - 20/10/2021</td>
                    <td>***Khoa</td>
                    <td>7.000.000đ</td>
                  </tr>
                  <tr>
                    <td>18:40 - 20/10/2021</td>
                    <td>***Minh</td>
                    <td>6.000.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal>
        </div>
      </div>
    </>
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
  width: 180px;
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
