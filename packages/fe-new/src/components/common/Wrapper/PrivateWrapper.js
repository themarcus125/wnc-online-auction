import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from '../../../hooks/useNavigate';

import { getUser } from '../../../utils/auth';
import {
  NOT_LOGIN,
  LOGIN,
  ADMIN,
  SELLER,
  ADMIN_VALUE,
  SELLER_VALUE,
} from '../../../utils/constants/role';

const PrivateWrapper = ({ component: Component, title, role, ...rest }) => {
  const { navigate } = useNavigate();

  const user = getUser();

  switch (role) {
    case NOT_LOGIN:
      if (Object.keys(user).length !== 0) {
        navigate('/');
        return null;
      }
      break;
    case LOGIN:
      if (Object.keys(user).length === 0) {
        navigate('/');
        return null;
      }
      break;
    case SELLER:
      if (Object.keys(user).length === 0 || user.role !== SELLER_VALUE) {
        navigate('/');
        return null;
      }
      break;
    case ADMIN:
      if (Object.keys(user).length === 0 || user.role !== ADMIN_VALUE) {
        navigate('/');
        return null;
      }
      break;
    default:
  }

  return (
    <>
      <Helmet title={`${title} - Biddly`} defer={false} />
      <Component {...rest} />
    </>
  );
};

export default PrivateWrapper;
