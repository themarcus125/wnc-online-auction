import React from 'react';

import ProductItem from '../common/ProductItem';

const AccountWatchList = () => {
  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Sản phẩm yêu thích</h3>
      <div>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </React.Fragment>
  );
};

export default AccountWatchList;
