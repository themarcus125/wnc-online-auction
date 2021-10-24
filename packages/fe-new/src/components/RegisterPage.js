import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from '../hooks/useNavigate';

import FormErrorMessage from '../components/common/Form/ErrorMessage';

import { postAPIForm } from '../utils/api';

import { DEFAULT_ERROR } from '../utils/constants/error';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('*Bắt buộc'),
  email: Yup.string().required('*Bắt buộc').email('*Email không hợp lệ'),
  address: Yup.string().required('*Bắt buộc'),
  password: Yup.string().required('*Bắt buộc').min(8, '*Phải dài hơn 8 kí tự'),
  confirmPassword: Yup.string()
    .required('*Bắt buộc')
    .oneOf([Yup.ref('password'), null], '*Password không trùng'),
});

const RegisterPage = () => {
  const [verifiedWithRecaptcha, setVerifiedWithRecaptcha] = useState(false);
  const recaptchaRef = useRef(null);
  const { navigate } = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const { fullName, email, address, password } = values;
    const res = await postAPIForm('/api/auth/register', {
      email,
      name: fullName,
      address,
      password,
    });
    setSubmitting(false);
    if (res.error) {
      toast.error(DEFAULT_ERROR);
    } else {
      navigate('/login', {
        toastMsg:
          'Tạo tài khoản thành công. Hãy đăng nhập với tài khoản vừa tạo',
        toastType: 'success',
      });
    }
  };

  const recaptchaCallback = (recaptchaToken) => {
    if (recaptchaToken) {
      setVerifiedWithRecaptcha(true);
    }
  };

  const onRecaptchaExpire = () => {
    setVerifiedWithRecaptcha(false);
    recaptchaRef.current.reset();
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
                <legend className="uk-legend">Tạo tài khoản Biddly</legend>
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
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LctLpQcAAAAABDK1rWNlDL7ph21c8jgTtJ_45Hl"
                  onChange={recaptchaCallback}
                  onExpired={onRecaptchaExpire}
                />
                <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-top">
                  <button
                    className="uk-button uk-button-primary"
                    disabled={isSubmitting || !verifiedWithRecaptcha}
                  >
                    Tạo tài khoản
                  </button>
                  <small className="uk-text-right">
                    <Link to="/login">Đăng nhập</Link>
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

export default RegisterPage;
