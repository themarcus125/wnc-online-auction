import React from 'react';
import { Helmet } from 'react-helmet';

import NavBar from '../NavBar';

const BaseWrapper = ({ component: Component, title, ...rest }) => {
  return (
    <>
      <Helmet title={`${title}`} defer={false} />
      <NavBar />
      <Component {...rest} />
    </>
  );
};

export default BaseWrapper;
