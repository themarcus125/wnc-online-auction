import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <div className="uk-background-muted uk-padding uk-width-1-6">
      <Link to={'/'} className="uk-text-uppercase">
        <span className="uk-icon" uk-icon="icon: arrow-left"></span>
        Trang chủ
      </Link>
      <ul className="uk-nav uk-margin-top">
        <li className="uk-parent">
          <Link className="uk-text-secondary" to="/admin/category">
            Danh mục
          </Link>
        </li>
        <li className="uk-parent">
          <Link className="uk-text-secondary" to="/admin/product">
            Sản phẩm
          </Link>
        </li>
        <li className="uk-parent">
          <Link className="uk-text-secondary" to="/admin/user">
            Người dùng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavBar;
