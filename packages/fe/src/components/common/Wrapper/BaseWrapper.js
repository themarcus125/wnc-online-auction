import React from 'react';
import { Helmet } from 'react-helmet';

const BaseWrapper = ({ component: Component, title, ...rest }) => {
  return (
    <>
      <Helmet title={`${title}`} defer={false} />
      <Component {...rest} />
    </>
  );
};

export default BaseWrapper;
