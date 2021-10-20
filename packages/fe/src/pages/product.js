import React from 'react';
import { Router } from '@reach/router';

import ProductDetailPage from '../components/common/ProductDetailPage';
import CommonLayout from '../components/common/Layout/CommonLayout';

const Product = () => {
  return (
    <CommonLayout>
      <Router>
        <ProductDetailPage path="/:productId" />
      </Router>
    </CommonLayout>
  );
};

export default Product;
