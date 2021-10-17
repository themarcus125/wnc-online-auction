import React, { useEffect } from 'react';
import UIKit from 'uikit/dist/js/uikit.min.js';
import { Link } from 'gatsby';

import AccountInfo from './Account/AccountInfo';
import AccountReview from './Account/AccountReview';
import AccountWatchList from './Account/AccountWatchList';
import AccountBidHistory from './Account/AccountBidHistory';
import AccountProductList from './Account/AccountProductList';
import AccountProductSoldList from './Account/AccountProductSoldList';

import { getUser } from '../utils/auth';
import { SELLER_VALUE } from '../utils/constants/role';

const AccountPage = () => {
  const { role = 0 } = getUser();

  useEffect(() => {
    UIKit.tab('#tabbar');
    UIKit.switcher('#detail-tabs');
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div className="uk-padding uk-height-1-1">
        <div className="uk-flex uk-flex-row page uk-margin-auto uk-height-1-1">
          <div className="uk-width-1-5">
            <Link to={'/'} className="uk-text-uppercase">
              <span
                className="uk-icon uk-margin-small-left"
                uk-icon="icon: arrow-left"
              ></span>
              Trang chủ
            </Link>
            <ul
              id="tabbar"
              className="uk-tab-left"
              uk-tab="connect: #detail-tabs; animation: uk-animation-fade"
            >
              <li className="uk-active">
                <a href="#">Tài khoản</a>
              </li>
              {role === SELLER_VALUE && (
                <>
                  <li>
                    <a href="#">Sản phẩm đang bán</a>
                  </li>
                  <li>
                    <a href="#">Sản phẩm đã bán</a>
                  </li>
                </>
              )}
              <li>
                <a href="#">Đánh giá</a>
              </li>
              <li>
                <a href="#">Sản phẩm yêu thích</a>
              </li>
              <li>
                <a href="#">Lịch sử đấu giá</a>
              </li>
            </ul>
          </div>
          <div
            className="uk-width-expand uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: 'auto', overflowX: 'hidden' }}
          >
            <ul id="detail-tabs" className="uk-switcher">
              <li>
                <AccountInfo />
              </li>
              {role === SELLER_VALUE && (
                <>
                  <li>
                    <AccountProductList />
                  </li>
                  <li>
                    <AccountProductSoldList />
                  </li>
                </>
              )}
              <li>
                <AccountReview />
              </li>
              <li>
                <AccountWatchList />
              </li>
              <li>
                <AccountBidHistory />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
