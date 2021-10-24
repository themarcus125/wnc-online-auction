import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useCategory } from '../hooks/useCategory'
import ProductItem from './common/ProductItem';
import PaginationButtonGroup from './common/PaginationButtonGroup';

import { getAPI } from '../utils/api';

import { PRODUCTS_PER_PAGE } from '../utils/constants/product';
import CommonLayout from './common/Layout/CommonLayout';

const CategoryProductPage = () => {
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState({});
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numOfPage = useRef(0);
  const { categoryId, subCategoryId } = useCategory();

  useEffect(() => {
    if (categoryId && subCategoryId) {
      loadData();
    }
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    if (subCategoryId) {
      loadProducts();
    }
  }, [subCategoryId, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    const productListResponse = await getAPI(
      `/api/product?mode=category&&category=${subCategoryId}&&notExpired=true&&limit=${PRODUCTS_PER_PAGE}&&skip=${(currentPage - 1) * PRODUCTS_PER_PAGE
      }`,
    );

    if (!productListResponse.error) {
      numOfPage.current = Math.ceil(
        productListResponse.page.totalCount / PRODUCTS_PER_PAGE,
      );
      setProductList(productListResponse.products);
    }
    setLoading(false);
  };

  const loadData = async () => {
    const [categoryResponse, subCategoryResponse] = await Promise.all([
      getAPI(`/api/category/${categoryId}`),
      getAPI(`/api/category/${subCategoryId}`),
    ]);

    if (!categoryResponse.error) {
      setCategory(categoryResponse);
    }

    if (!subCategoryResponse.error) {
      setSubCategory(subCategoryResponse);
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
    <CommonLayout>
      <Helmet title={`${subCategory.name || ''} - Biddly`} defer={false} />
      <Wrapper className="uk-padding-small">
        <div className="page uk-margin-auto">
          <div>
            <ul className="uk-breadcrumb">
              <li>
                <Link to={'/'}>Trang chủ</Link>
              </li>
              <li>
                <Link to={`/category/${categoryId}`}>{category.name}</Link>
              </li>
              <li className="uk-disabled">
                <a href="#">{subCategory.name}</a>
              </li>
            </ul>
          </div>
          <div className="category-banner uk-background-primary uk-margin-small-bottom">
            <span
              className="uk-text-large uk-text-bold"
              style={{ color: 'white' }}
            >
              {subCategory.name}
            </span>
          </div>
          {loading ? (
            <div uk-spinner=""></div>
          ) : (
            <>
              <div className="uk-margin-top uk-margin-bottom">
                {productList.map((product) => {
                  return (
                    <ProductItem key={product._id} productData={product} />
                  );
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
        </div>
      </Wrapper>
    </CommonLayout>
  );
};

export default CategoryProductPage;

const Wrapper = styled.div`
  .category-banner {
    padding: 15px 10px;
  }
  .drop-down {
    text-overflow: ellipsis;
    width: 150px;
  }
`;
