import * as React from 'react';
import { Router } from '@reach/router';

import CategoryPage from '../components/CategoryPage';
import CategoryProductPage from '../components/CategoryProductPage';
import CommonLayout from '../components/common/Layout/CommonLayout';

const CategoryHomePage = () => {
  return (
    <CommonLayout>
      <Router basepath="/category">
        <CategoryPage path="/:categoryId" />
        <CategoryProductPage path="/:categoryId/:subCategoryId" />
      </Router>
    </CommonLayout>
  );
};

export default CategoryHomePage;
