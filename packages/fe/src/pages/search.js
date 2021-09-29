import * as React from 'react';

import SearchPage from '../components/SearchPage';
import BaseWrapper from '../components/common/Wrapper/BaseWrapper';
import CommonLayout from '../components/common/Layout/CommonLayout';

const Search = () => {
  return (
    <CommonLayout>
      <BaseWrapper component={SearchPage} title="Search" />
    </CommonLayout>
  );
};

export default Search;
