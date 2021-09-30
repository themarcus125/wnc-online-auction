import React from 'react';
import { Helmet } from 'react-helmet';

const PrivateWrapper = ({ component: Component, title, ...rest }) => {
  // Check authentication here

  // Handle redirect

  return (
    <>
      <Helmet title={`${title}`} defer={false} />
      <Component {...rest} />
    </>
  );
};

export default PrivateWrapper;
