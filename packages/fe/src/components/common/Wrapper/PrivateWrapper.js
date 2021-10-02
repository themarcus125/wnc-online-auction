import React from 'react';
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby-link';

import { getUser } from '../../../utils/auth';
import { NOT_LOGIN, LOGIN, ADMIN } from '../../../utils/constants/role';

const PrivateWrapper = ({ component: Component, title, role, ...rest }) => {
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
    case ADMIN:
      if (Object.keys(user).length === 0 || user.role !== 2) {
        navigate('/');
        return null;
      }
      break;
    default:
  }

  return (
    <>
      <Helmet title={`${title}`} defer={false} />
      <Component {...rest} />
    </>
  );
};

export default PrivateWrapper;
