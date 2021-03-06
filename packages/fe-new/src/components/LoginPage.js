import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from '../hooks/useNavigate';
import useStore from '../store/useStore';

import FormErrorMessage from '../components/common/Form/ErrorMessage';

import { postAPIForm, getAPIWithToken } from '../utils/api';
import { setUser } from '../utils/auth';

import { LOGIN_INFO_INCORRECT, DEFAULT_ERROR } from '../utils/constants/error';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('*Bắt buộc').email('*Email không hợp lệ'),
  password: Yup.string().required('*Bắt buộc'),
});

const LoginPage = () => {
  const location = useLocation();
  const { toastMsg, toastType } = location.state || {};
  const { navigate } = useNavigate();
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    if (toastMsg && toastType) {
      toast[toastType](toastMsg);
    }
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {
    const res = await postAPIForm('/api/auth/login', values);
    if (res.error) {
      toast.error(LOGIN_INFO_INCORRECT);
    } else {
      const user = await getAPIWithToken('/api/user', res.accessToken);
      if (user.error) {
        toast.error(DEFAULT_ERROR);
      } else {
        setUser({ ...user, token: res.accessToken });
        setIsLoggedIn(true);
        navigate('/');
      }
    }
    setSubmitting(false);
  };

  return (
    <div
      className="uk-flex uk-flex-middle uk-flex-center"
      style={{ height: '100vh', backgroundColor: 'gray' }}
    >
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default uk-border-rounded uk-padding">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="uk-form">
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">Đăng nhập vào Biddly</legend>
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
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                  />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </div>
                <div className="uk-flex uk-flex-between uk-flex-middle">
                  <button
                    className="uk-button uk-button-primary"
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </button>
                  <small className="uk-text-right uk-flex uk-flex-column">
                    <Link
                      className="uk-margin-small-bottom"
                      to="/reset-password"
                    >
                      Quên mật khẩu
                    </Link>
                    <Link to="/register">Tạo tài khoản</Link>
                  </small>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
