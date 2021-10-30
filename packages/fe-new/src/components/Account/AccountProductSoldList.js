import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { FaThumbsUp } from '@react-icons/all-files/fa/FaThumbsUp';
import { FaThumbsDown } from '@react-icons/all-files/fa/FaThumbsDown';
import UIKit from 'uikit/dist/js/uikit.min.js';

import Modal, { hideModal, showModal } from '../common/Modal';

import { getAPIWithToken, postAPIWithToken } from '../../utils/api';
import { getToken } from '../../utils/auth';

const reviewModalID = 'reviewBidderModal';

const AccountProductSoldList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(1);
  const currentUserId = useRef('');
  const currentProductId = useRef('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(`/api/product/seller/sold`, token);
    if (!response.error) {
      setProductList(response.reverse());
    }
    setLoading(false);
  };

  const onReview = (userId, productId) => {
    currentUserId.current = userId;
    currentProductId.current = productId;
    setFeedback('');
    setScore(1);
    showModal(reviewModalID);
  };

  const onSend = async () => {
    const token = await getToken();
    const response = await postAPIWithToken(
      `/api/rating/product/${currentProductId.current}/seller`,
      {
        targetUser: currentUserId.current,
        feedback,
        score: score === 1,
      },
      token,
    );
    if (!response.error) {
      hideModal(reviewModalID);
      toast.success('Gửi đánh giá thành công');
      const index = productList.findIndex(
        (product) => product._id === currentProductId.current,
      );

      if (index !== -1) {
        setProductList([
          ...productList.slice(0, index),
          response.updatedProduct,
          ...productList.slice(index + 1),
        ]);
      }
    }
  };

  const onTerminate = (userId, productId) => {
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn hủy giao dịch?').then(
      async () => {
        const token = await getToken();
        const response = await postAPIWithToken(
          `/api/rating/product/${productId}/seller`,
          {
            targetUser: userId,
            feedback: 'Người thắng không thanh toán',
            score: false,
          },
          token,
        );
        if (!response.error) {
          toast.success('Gửi đánh giá thành công');
          const index = productList.findIndex(
            (product) => product._id === productId,
          );

          if (index !== -1) {
            setProductList([
              ...productList.slice(0, index),
              response.updatedProduct,
              ...productList.slice(index + 1),
            ]);
          }
        }
      },
      () => {},
    );
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">
        Danh sách sản phẩm đã bán
      </h3>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div>
        {loading ? (
          <div uk-spinner="" />
        ) : (
          <table className="uk-table uk-table-divider uk-table-striped">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>Người mua</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {Number(product.currentPrice).toLocaleString()} đ
                    </TableCell>
                    <TableCell>{product.currentBidder?.name}</TableCell>
                    <TableCell>{product.currentBidder?.email}</TableCell>
                    <TableCell>
                      {!product?.sellerRating && (
                        <p className="uk-flex uk-flex-column">
                          <Button
                            className="uk-button uk-button-primary uk-margin-bottom"
                            onClick={() =>
                              onReview(product.currentBidder?._id, product._id)
                            }
                          >
                            Đánh giá
                          </Button>
                          <Button
                            className="uk-button uk-button-danger"
                            onClick={() =>
                              onTerminate(
                                product.currentBidder?._id,
                                product._id,
                              )
                            }
                          >
                            Hủy giao dịch
                          </Button>
                        </p>
                      )}
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Modal
          modalID={reviewModalID}
          isContainer
          title="Đánh giá người mua"
          buttonRow={
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={onSend}
              disabled={!feedback}
            >
              Cập nhật
            </button>
          }
        >
          <>
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-radio"
                  type="radio"
                  name="radio"
                  value={1}
                  checked={score === 1}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
                <FaThumbsUp className="uk-margin-small-left" />
              </label>
              <label>
                <input
                  className="uk-radio"
                  type="radio"
                  name="radio"
                  value={-1}
                  checked={score === -1}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
                <FaThumbsDown className="uk-margin-small-left" />
              </label>
            </div>
            <div>
              <small>Lời nhận xét</small>
              <textarea
                className="uk-textarea uk-margin-small-top"
                rows="5"
                style={{ resize: 'none' }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AccountProductSoldList;

const TableCell = styled.td`
  vertical-align: middle !important;
`;

const Button = styled.button`
  width: 170px;
`;
