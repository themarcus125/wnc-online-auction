import React from 'react';
import { Router } from '@reach/router';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import AdminLayout from '../components/common/Layout/AdminLayout';

import CategoryList from '../components/Admin/Category/List';
import CategoryForm from '../components/Admin/Category/CategoryForm';

import UserList from '../components/Admin/User/List';
import UserForm from '../components/Admin/User/UserForm';
import UpdateUserForm from '../components/Admin/User/UpdateUserForm';

import ProductList from '../components/Admin/Product/List';

import { ADMIN } from '../utils/constants/role';

const Admin = () => {
  return (
    <AdminLayout>
      <div className="uk-width-1-1">
        <Router>
          <PrivateWrapper
            title={'Danh sách danh mục'}
            path="/category"
            component={CategoryList}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Thêm danh mục'}
            path="/category/add"
            component={CategoryForm}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Chỉnh sửa danh mục'}
            path="/category/edit/:id"
            component={CategoryForm}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Danh sách người dùng'}
            path="/user"
            component={UserList}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Thêm người dùng'}
            path="/user/add"
            component={UserForm}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Chỉnh sửa thông tin người dùng'}
            path="/user/edit/:id"
            component={UpdateUserForm}
            role={ADMIN}
          />
          <PrivateWrapper
            title={'Danh sách sản phẩm'}
            path="/product"
            component={ProductList}
            role={ADMIN}
          />
        </Router>
      </div>
    </AdminLayout>
  );
};

export default Admin;
