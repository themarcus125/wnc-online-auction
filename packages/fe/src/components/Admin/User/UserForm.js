import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'gatsby';

import { postAPIFormWithToken } from '../../../utils/api';

import FormErrorMessage from '../../common/Form/ErrorMessage';
import { getToken } from '../../../utils/auth';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('*Bắt buộc'),
  email: Yup.string().required('*Bắt buộc').email('*Email không hợp lệ'),
  address: Yup.string().required('*Bắt buộc'),
  password: Yup.string().required('*Bắt buộc').min(8, '*Phải dài hơn 8 kí tự'),
  confirmPassword: Yup.string()
    .required('*Bắt buộc')
    .oneOf([Yup.ref('password'), null], '*Password không trùng'),
});

const UserForm = () => {
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = await getToken();
    const { fullName, email, address, password } = values;
    const res = await postAPIFormWithToken(
      '/api/admin/user',
      {
        email,
        name: fullName,
        address,
        password,
      },
      token,
    );
    setSubmitting(false);
    if (res.error) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại');
      return;
    }
    resetForm();
    toast.success('Tạo người dùng thành công!');
  };

  return (
    <div>
      <Link to={'/admin/user'} className="uk-text-uppercase">
        Về danh sách người dùng
      </Link>
      <h3 className="uk-text-primary uk-text-bold uk-margin-top-remove">
        Thêm người dùng
      </h3>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default">
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="uk-form">
              <fieldset className="uk-fieldset">
                <div className="uk-margin">
                  <Field
                    className="uk-input"
                    type="text"
                    placeholder="Họ tên"
                    name="fullName"
                  />
                  <ErrorMessage name="fullName" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    className="uk-input"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <ErrorMessage name="email" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    className="uk-input"
                    type="text"
                    placeholder="Địa chỉ"
                    name="address"
                  />
                  <ErrorMessage name="address" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    className="uk-input"
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                  />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    className="uk-input"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormErrorMessage}
                  />
                </div>
                <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-top">
                  <button
                    className="uk-button uk-button-primary"
                    disabled={isSubmitting}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
