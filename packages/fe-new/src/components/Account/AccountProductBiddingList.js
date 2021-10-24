import React, { useEffect, useState, useRef } from 'react';

import ProductItem from '../common/ProductItem';
import PaginationButtonGroup from '../common/PaginationButtonGroup';

import { getAPI } from '../../utils/api';

import { PRODUCTS_PER_PAGE } from '../../utils/constants/product';

const AccountProductBiddingList = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numOfPage = useRef(0);

  useEffect(() => {
    loadProducts();
  }, []);

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

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">
        Danh sách sản phẩm đang đấu giá
      </h3>
      {loading ? (
        <div uk-spinner="" />
      ) : (
        <>
          <div>
            {productList.map((product) => {
              return <ProductItem key={product._id} productData={product} />;
            })}
          </div>
          <PaginationButtonGroup
            onChangePage={onChangePage}
            onNext={onNext}
            onPrev={onPrev}
            numOfPage={numOfPage.current}
            currentPage={currentPage}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default AccountProductBiddingList;
