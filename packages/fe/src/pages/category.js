import * as React from 'react';
import { Router } from '@reach/router';

import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import CategoryPage from '../components/CategoryPage';
import CategoryProductPage from '../components/CategoryProductPage';
import CommonLayout from '../components/common/Layout/CommonLayout';

const CategoryHomePage = () => {
  return (
    <CommonLayout>
      <Router basepath="/category">
        <BaseWrapper
          path="/:categoryId"
          title={'Category'}
          component={CategoryPage}
        />
        <BaseWrapper
          path="/:categoryId/:subCategoryId"
          title={'Category'}
          component={CategoryProductPage}
        />
      </Router>
    </CommonLayout>
  );
};

export default CategoryHomePage;
