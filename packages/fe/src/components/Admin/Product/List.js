import dayjs from 'dayjs';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { navigate } from 'gatsby-link';
import UIKit from 'uikit/dist/js/uikit.min.js';

import PaginationButtonGroup from '../../common/PaginationButtonGroup';

import { getAPI, deleteAPIWithToken } from '../../../utils/api';
import { getToken } from '../../../utils/auth';

import { PRODUCTS_PER_PAGE } from '../../../utils/constants/product';
import { DEFAULT_ERROR } from '../../../utils/constants/error';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numOfPage = useRef(0);

  useEffect(() => {
    loadCategories();
  }, []);

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
      setProductList(response.products);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const response = await getAPI('/api/category');

    if (!response.error) {
      const obj = response.reduce(
        (obj, category) => ((obj[category._id] = category.name), obj),
        {},
      );
      setCategoryList(obj);
    }
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

  const onDelete = (productId) => {
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn xóa sản phẩm?').then(
      async () => {
        const token = await getToken();
        const response = await deleteAPIWithToken(
          `/api/admin/product/${productId}`,
          token,
        );
        if (response.error) {
          toast.error(DEFAULT_ERROR);
          return;
        }
        loadProducts();
      },
      () => {},
    );
  };

  return (
    <div>
      <h3 className="uk-text-primary uk-text-bold">Danh sách sản phẩm</h3>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div>
        <table className="uk-table uk-table-divider uk-table-striped">
          <thead>
            <tr>
              <th className="uk-table-shrink">STT</th>
              <th style={{ width: '300px' }}>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá hiện tại</th>
              <th>Giá mua ngay</th>
              <th>Ngày hết hạn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div uk-spinner="" />
            ) : (
              productList.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{categoryList[product.category]}</TableCell>
                    <TableCell>
                      {Number(product.currentPrice).toLocaleString()} đ
                    </TableCell>
                    <TableCell>
                      {product.buyPrice
                        ? `${Number(product.buyPrice).toLocaleString()} đ`
                        : 'Không có'}
                    </TableCell>
                    <TableCell>
                      {dayjs(product.expiredAt).format('HH:mm - DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <button
                        className="uk-button uk-button-primary uk-margin-right"
                        onClick={() => onDetails(product._id)}
                      >
                        Chi tiết
                      </button>
                      <button
                        className="uk-button uk-button-danger"
                        onClick={() => onDelete(product._id)}
                      >
                        Gỡ bỏ
                      </button>
                    </TableCell>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <PaginationButtonGroup
          onChangePage={onChangePage}
          onNext={onNext}
          onPrev={onPrev}
          numOfPage={numOfPage.current}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;

const TableCell = styled.td`
  vertical-align: middle !important;
`;
