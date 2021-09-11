import React from 'react';
import styled from 'styled-components';

import ProductItem from './common/ProductItem';

const SearchPage = () => {
  return (
    <Wrapper className="uk-padding">
      <div className="page uk-margin-auto">
        <div className="uk-flex uk-flex-between uk-margin-bottom">
          <input className="uk-input black-border" type="text" />
          <select class="uk-select drop-down black-border">
            <option>Category 01</option>
            <option>Categoryyyyyy 02</option>
          </select>
          <button className="uk-button uk-button-primary button">
            Tìm kiếm
          </button>
        </div>
        <div className="uk-child-width-auto uk-flex uk-flex-between uk-flex-bottom uk-margin-bottom">
          <span>
            <b>2,261</b> results for ps5
          </span>
          <select class="uk-select drop-down">
            <option>Thời gian kết thúc giảm dần</option>
            <option>Giá tăng dần</option>
          </select>
        </div>
        <div>
          <ProductItem />
        </div>
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
