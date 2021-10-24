import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { FaThumbsUp } from '@react-icons/all-files/fa/FaThumbsUp';
import { FaThumbsDown } from '@react-icons/all-files/fa/FaThumbsDown';
import { useNavigate } from '../../hooks/useNavigate';

import PaginationButtonGroup from '../common/PaginationButtonGroup';
import Modal, { showModal } from '../common/Modal';

import { getAPI } from '../../utils/api';

import { PRODUCTS_PER_PAGE } from '../../utils/constants/product';

const reviewModalID = 'reviewModal';

const AccountProductWonList = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numOfPage = useRef(0);

  const { navigate } = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    const response = await getAPI(
      `/api/product?limit=${PRODUCTS_PER_PAGE}&&skip=${
        (currentPage - 1) * PRODUCTS_PER_PAGE
      }`,
    );
    if (!response.error) {
      numOfPage.current = Math.ceil(
        response.page.totalCount / PRODUCTS_PER_PAGE,
      );
      console.log(response.products);
      setProductList(response.products);
    }
    setLoading(false);
  };

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    if (currentPage < numOfPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onReview = () => {
    showModal(reviewModalID);
  };

  const onSendReview = () => {};

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">
        Danh sách sản phẩm đã thắng
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
                <th style={{ width: '130px' }}>Tên sản phẩm</th>
                <th>Giá mua</th>
                <th>Người bán</th>
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
                    <TableCell>Nguyễn Văn A</TableCell>
                    <TableCell>Nva@gmail.com</TableCell>
                    <TableCell>
                      <p className="uk-flex uk-flex-column">
                        <Button
                          className="uk-button uk-button-primary uk-margin-bottom"
                          onClick={() => onDetails(product._id)}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          className="uk-button uk-button-secondary"
                          onClick={onReview}
                        >
                          Đánh giá
                        </Button>
                      </p>
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
          title="Đánh giá người bán"
          buttonRow={
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={onSendReview}
            >
              Gửi đánh giá
            </button>
          }
        >
          <>
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-radio"
                  type="radio"
                  name="radio2"
                  checked
                />
                <FaThumbsUp className="uk-margin-small-left" />
              </label>
              <label>
                <input className="uk-radio" type="radio" name="radio2" />
                <FaThumbsDown className="uk-margin-small-left" />
              </label>
            </div>
            <div>
              <small>Lời nhận xét</small>
              <textarea
                className="uk-textarea uk-margin-small-top"
                rows="5"
                style={{ resize: 'none' }}
              />
            </div>
          </>
        </Modal>
        <PaginationButtonGroup
          onChangePage={onChangePage}
          onNext={onNext}
          onPrev={onPrev}
          numOfPage={numOfPage.current}
          currentPage={currentPage}
        />
      </div>
    </React.Fragment>
  );
};

export default AccountProductWonList;

const TableCell = styled.td`
  vertical-align: middle !important;
`;

const Button = styled.button`
  width: 130px;
`;
