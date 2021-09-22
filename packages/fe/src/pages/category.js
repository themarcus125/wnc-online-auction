import * as React from 'react';
import { Router } from '@reach/router';

import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import CategoryPage from '../components/CategoryPage';

const CategoryHomePage = () => {
  return (
    <Router basepath="/category">
      <BaseWrapper path="/:id" title={'Category'} component={CategoryPage} />
    </Router>
  );
};

export default CategoryHomePage;
