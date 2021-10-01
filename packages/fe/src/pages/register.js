import React from 'react';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import RegisterPage from '../components/RegisterPage';

import { NOT_LOGIN } from '../utils/constants/role';

const Register = (props) => {
  return (
    <PrivateWrapper
      title={'Đăng ký'}
      component={RegisterPage}
      role={NOT_LOGIN}
      {...props}
    />
  );
};

export default Register;
