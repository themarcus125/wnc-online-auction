import React from 'react';
import { Switch } from 'react-router-dom'

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
        <Switch>
          <PrivateWrapper
            exact
            title={'Danh sách danh mục'}
            path="/admin/category"
            component={CategoryList}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Thêm danh mục'}
            path="/admin/category/add"
            component={CategoryForm}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Chỉnh sửa danh mục'}
            path="/admin/category/edit/:id"
            component={CategoryForm}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Danh sách người dùng'}
            path="/admin/user"
            component={UserList}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Thêm người dùng'}
            path="/admin/user/add"
            component={UserForm}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Chỉnh sửa thông tin người dùng'}
            path="/admin/user/edit/:id"
            component={UpdateUserForm}
            role={ADMIN}
          />
          <PrivateWrapper
            exact
            title={'Danh sách sản phẩm'}
            path="/admin/product"
            component={ProductList}
            role={ADMIN}
          />
        </Switch>
      </div>
    </AdminLayout>
  );
};

export default Admin;
