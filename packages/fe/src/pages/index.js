import * as React from 'react';

import HomePage from '../components/HomePage';
import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import CommonLayout from '../components/common/Layout/CommonLayout';

const IndexPage = () => {
  return (
    <CommonLayout>
      <BaseWrapper component={HomePage} title="Home" />
    </CommonLayout>
  );
};

export default IndexPage;
