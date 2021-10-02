import React from 'react';
import { Router } from '@reach/router';

import PrivateWrapper from '../components/common/Wrapper/PrivateWrapper';
import AdminLayout from '../components/common/Layout/AdminLayout';
import CategoryList from '../components/Admin/Category/List';
import CategoryForm from '../components/Admin/Category/CategoryForm';

import { ADMIN } from '../utils/constants/role';

const Admin = () => {
  return (
    <AdminLayout>
      <div className="uk-width-1-1">
        <Router basepath={'/admin'}>
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
        </Router>
      </div>
    </AdminLayout>
  );
};

export default Admin;
