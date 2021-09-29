import React from 'react';

import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import AccountPage from '../components/AccountPage';

const Account = () => {
  return <BaseWrapper title={'Thông tin tài khoản'} component={AccountPage} />;
};

export default Account;
