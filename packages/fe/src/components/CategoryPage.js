import React from 'react';
import styled from 'styled-components';

import ProductItem from './common/ProductItem';

const CategoryPage = () => {
  return (
    <Wrapper className="uk-padding-small">
      <div className="page uk-margin-auto">
        <div>
          <ul class="uk-breadcrumb">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Category 1</a>
            </li>
          </ul>
        </div>
        <div className="category-banner uk-background-primary uk-margin-small-bottom">
          <span
            className="uk-text-large uk-text-bold"
            style={{ color: 'white' }}
          >
            Category 1
          </span>
        </div>

        <div className="uk-flex uk-flex-right">
          <select class="uk-select drop-down">
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

export default CategoryPage;

const Wrapper = styled.div`
  .category-banner {
    padding: 15px 10px;
  }
  .drop-down {
    text-overflow: ellipsis;
    width: 150px;
  }
`;
