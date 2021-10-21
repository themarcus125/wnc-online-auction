import * as React from 'react';
import { Router } from '@reach/router';

import HomePage from '../components/HomePage';
import Login from './login';
import Account from './account';
import Register from './register';
import ResetPassword from './reset-password';
import Search from './search';
import Category from './category';
import ProductDetail from './product';
import Seller from './seller';
import Admin from './admin';

import BaseWrapper from '../components/common/Wrapper/BaseWrapper';

import CommonLayout from '../components/common/Layout/CommonLayout';

const IndexPage = () => {
  return (
    <Router>
      <CommonLayout path="/">
        <BaseWrapper component={HomePage} title="Trang chủ" path="/" />
      </CommonLayout>
      <Account path="/account" />
      <Login path="/login" />
      <Register path="/register" />
      <ResetPassword path="reset-password" />
      <Search path="/search" />
      <Category path="/category/*" />
      <ProductDetail path="/product/*" />
      <Seller path="/seller/*" />
      <Admin path="/admin/*" />
    </Router>
  );
};

export default IndexPage;
