import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import ProductItem from './common/ProductItem';

import { getAPI } from '../utils/api';

const CategoryProductPage = ({ categoryId, subCategoryId }) => {
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
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

  return (
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

        <div className="uk-flex uk-flex-right">
          <select className="uk-select drop-down">
            <option>Thời gian kết thúc giảm dần</option>
            <option>Giá tăng dần</option>
          </select>
        </div>
        <div className="uk-margin-top uk-margin-bottom">
          <ProductItem />
        </div>
      </div>
    </Wrapper>
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