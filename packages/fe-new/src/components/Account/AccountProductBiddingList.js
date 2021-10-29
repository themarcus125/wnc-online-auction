import React, { useEffect, useState } from 'react';

import ProductItem from '../common/ProductItem';
import LoadingOverlay from '../common/LoadingOverlay';

import { getAPIWithToken } from '../../utils/api';
import { getToken } from '../../utils/auth';

const AccountProductBiddingList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      `/api/product/bidder/placing`,
      token,
    );
    if (!response.error) {
      setProductList(response.reverse());
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">
        Danh sách sản phẩm đang đấu giá
      </h3>
      <>
        <div>
          {productList.map((product) => {
            return <ProductItem key={product._id} productData={product} />;
          })}
        </div>
        <LoadingOverlay isLoading={loading} />
      </>
    </React.Fragment>
  );
};

export default AccountProductBiddingList;
