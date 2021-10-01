import React from 'react';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import LoginPage from '../components/LoginPage';

import { NOT_LOGIN } from '../utils/constants/role';

const Login = (props) => {
  return (
    <PrivateWrapper
      title={'Đăng nhập'}
      component={LoginPage}
      role={NOT_LOGIN}
      {...props}
    />
  );
};

export default Login;
