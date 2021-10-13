import React from 'react';

const SellerLayout = ({ children }) => {
  return (
    <div className="uk-flex uk-flex-row" style={{ height: '100vh' }}>
      <div
        className="uk-flex uk-padding uk-width-1-1"
        style={{ overflow: 'auto', height: '100vh' }}
      >
        {children}
      </div>
    </div>
  );
};

export default SellerLayout;
