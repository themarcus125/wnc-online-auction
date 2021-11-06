import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import ProductItem from './common/ProductItem';
import PaginationButtonGroup from './common/PaginationButtonGroup';
import LoadingOverlay from './common/LoadingOverlay';

import { getAPI } from '../utils/api';

import { PRODUCTS_PER_PAGE } from '../utils/constants/product';

const SearchPage = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const keyword = search.get('s');
  const category = search.get('category');
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('expiredDate');
  const numOfPage = useRef(0);
  const numOfResult = useRef(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  useEffect(() => {
    if (!firstLoad.current) {
      loadProducts(true);
    }
  }, [keyword, category, sort]);

  const loadProducts = async (resetPage = false) => {
    setLoading(true);
    let sortString = '&&price=asc';
    if (sort === 'expiredDate') {
      sortString = '&&end=desc';
    }

    let skipString = `&&skip=${(currentPage - 1) * PRODUCTS_PER_PAGE}`;
    if (resetPage) {
      setCurrentPage(1);
      skipString = '&&skip=0';
    }
    const response = await getAPI(
      `/api/product?mode=search&&productName=${keyword}&&categoryId=${category}&&notExpired=true&&status=true&&limit=${PRODUCTS_PER_PAGE}${skipString}${sortString}`,
    );

    if (!response.error) {
      numOfPage.current = Math.ceil(
        response.page.totalCount / PRODUCTS_PER_PAGE,
      );
      numOfResult.current = response.page.totalCount;
      setProductList(response.products);
    }
    setLoading(false);
    if (firstLoad.current) {
      firstLoad.current = false;
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

  return (
    <Wrapper className="uk-padding-small">
      <div className="page uk-margin-auto">
        <div className="uk-child-width-auto uk-flex uk-flex-between uk-flex-bottom uk-margin-bottom">
          <span>
            <b>{numOfResult.current}</b> kết quả cho <b>{keyword}</b>
          </span>
          <select
            className="uk-select drop-down"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="expiredDate">Thời gian kết thúc giảm dần</option>
            <option value="price">Giá tăng dần</option>
          </select>
        </div>
        <div>
          {productList.map((product) => {
            return <ProductItem key={product._id} productData={product} />;
          })}
        </div>
        {productList.length !== 0 && (
          <PaginationButtonGroup
            onChangePage={onChangePage}
            onNext={onNext}
            onPrev={onPrev}
            numOfPage={numOfPage.current}
            currentPage={currentPage}
          />
        )}
        <LoadingOverlay isLoading={loading} />
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
`;
