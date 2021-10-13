import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby-link';

import LoadingOverlay from './common/LoadingOverlay';

import { getAPI } from '../utils/api';

const CategoryPage = ({ categoryId }) => {
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      loadData();
    }
  }, [categoryId]);

  const loadData = async () => {
    setLoading(true);
    const [categoryResponse, subCategoriesResponse] = await Promise.all([
      getAPI(`/api/category/${categoryId}`),
      getAPI(`/api/category?mode=child&&parent=${categoryId}`),
    ]);

    if (!categoryResponse.error) {
      setCategory(categoryResponse);
    }

    if (!subCategoriesResponse.error) {
      setSubCategories(subCategoriesResponse);
    }
    setLoading(false);
  };

  const onLoadSubCategory = (subCategoryId) => {
    navigate(`${subCategoryId}`);
  };

  return (
    <Wrapper className="uk-padding-small">
      <div className="page uk-margin-auto">
        <div>
          <div className="category-banner uk-background-primary uk-margin-small-bottom">
            <span
              className="uk-text-large uk-text-bold"
              style={{ color: 'white' }}
            >
              {category.name}
            </span>
          </div>
          <div
            className="uk-child-width-1-2 uk-grid-small uk-text-center"
            uk-grid=""
            uk-height-match=""
          >
            {subCategories.map((subCategory) => {
              return (
                <div key={subCategory._id}>
                  <div
                    onClick={() => onLoadSubCategory(subCategory._id)}
                    className="sub-category-container uk-card uk-card-default uk-background-muted uk-card-body uk-height-1-1 uk-flex uk-flex-center uk-flex-middle"
                  >
                    <p>{subCategory.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <LoadingOverlay isLoading={loading} />
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
  .sub-category-container {
    border: 1px solid black;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    cursor: pointer;
  }
`;
