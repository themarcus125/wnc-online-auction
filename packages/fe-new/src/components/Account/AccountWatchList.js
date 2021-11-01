import React, { useEffect, useState } from 'react';

import ProductItem from '../common/ProductItem';
import LoadingOverlay from '../common/LoadingOverlay';

import { getToken } from '../../utils/auth';
import { getAPIWithToken } from '../../utils/api';

const AccountWatchList = () => {
  const [watchListItems, setWatchListItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWatchList();
  }, []);

  const loadWatchList = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      '/api/user/watchlist/product',
      token,
    );

    if (!response.error) {
      setWatchListItems(response.reverse());
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Sản phẩm yêu thích</h3>
      <div>
        {watchListItems.map((item) => {
          return (
            <ProductItem
              key={item._id}
              productData={item.product}
              isWatchListScreen
            />
          );
        })}
      </div>
      <LoadingOverlay isLoading={loading} />
    </React.Fragment>
  );
};

export default AccountWatchList;
