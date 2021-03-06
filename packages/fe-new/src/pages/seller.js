import React from 'react';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import SellerLayout from '../components/common/Layout/SellerLayout';

import AddProductPage from '../components/Seller/AddProductPage';

import { SELLER } from '../utils/constants/role';

const Seller = () => {
  return (
    <SellerLayout>
      <div className="uk-width-1-1">
        <PrivateWrapper
          title={'Thêm sản phẩm'}
          path="/add-product"
          component={AddProductPage}
          role={SELLER}
        />
      </div>
    </SellerLayout>
  );
};

export default Seller;
