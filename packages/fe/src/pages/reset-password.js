import React from 'react';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import ResetPasswordPage from '../components/ResetPasswordPage';

import { NOT_LOGIN } from '../utils/constants/role';

const ResetPassword = (props) => {
  return (
    <PrivateWrapper
      title={'Quên mật khẩu'}
      component={ResetPasswordPage}
      role={NOT_LOGIN}
      {...props}
    />
  );
};

export default ResetPassword;
