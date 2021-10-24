import React from 'react';

import NavBar from '../NavBar';

const CommonLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default CommonLayout;
