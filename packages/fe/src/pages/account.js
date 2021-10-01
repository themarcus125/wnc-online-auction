import React from 'react';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import AccountPage from '../components/AccountPage';

import { LOGIN } from '../utils/constants/role';

const Account = () => {
  return (
    <PrivateWrapper
      title={'Thông tin tài khoản'}
      component={AccountPage}
      role={LOGIN}
    />
  );
};

export default Account;
