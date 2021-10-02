import React from 'react';

import AdminNavBar from '../../Admin/NavBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="uk-flex uk-flex-row" style={{ height: '100vh' }}>
      <AdminNavBar />
      <div className="uk-flex uk-width-1-1 uk-padding">{children}</div>
    </div>
  );
};

export default AdminLayout;
