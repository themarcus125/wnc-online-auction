import * as React from 'react';
import { Router } from '@reach/router';

import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import CategoryPage from '../components/CategoryPage';
import CommonLayout from '../components/common/Layout/CommonLayout';

const CategoryHomePage = () => {
  return (
    <CommonLayout>
      <Router basepath="/category">
        <BaseWrapper path="/:id" title={'Category'} component={CategoryPage} />
      </Router>
    </CommonLayout>
  );
};

export default CategoryHomePage;
