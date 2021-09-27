import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

import FormErrorMessage from '../components/common/Form/ErrorMessage';

import { postAPI } from '../utils/api';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('*Bắt buộc'),
  email: Yup.string().required('*Bắt buộc').email('Email không hợp lệ'),
  address: Yup.string().required('*Bắt buộc'),
  password: Yup.string().required('*Bắt buộc'),
  confirmPassword: Yup.string()
    .required('*Bắt buộc')
    .oneOf([Yup.ref('password'), null], 'Password không trùng'),
});

const RegisterPage = () => {
  const [verifiedWithRecaptcha, setVerifiedWithRecaptcha] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    const { fullName, email, address, password } = values;
    const res = await postAPI('/api/auth/register', {
      email,
      name: fullName,
      address,
      password,
    });
    setSubmitting(false);
    if (res.error) {
      // Error handling here
    } else {
      // Log the user in or navigate to login screen
    }
  };

  const recaptchaCallback = (recaptchaToken) => {
    if (recaptchaToken) {
      setVerifiedWithRecaptcha(true);
    }
  };

  return (
    <div
      className="uk-flex uk-flex-middle uk-flex-center"
      style={{ height: '100vh', backgroundColor: 'gray' }}
    >
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
                    ref={null}
                    className="uk-input"
                    type="text"
                    placeholder="Họ tên"
                    name="fullName"
                  />
                  <ErrorMessage name="fullName" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    ref={null}
                    className="uk-input"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <ErrorMessage name="email" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    ref={null}
                    className="uk-input"
                    type="text"
                    placeholder="Địa chỉ"
                    name="address"
                  />
                  <ErrorMessage name="address" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    ref={null}
                    className="uk-input"
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                  />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </div>
                <div className="uk-margin">
                  <Field
                    ref={null}
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
                  sitekey="6LctLpQcAAAAABDK1rWNlDL7ph21c8jgTtJ_45Hl"
                  onChange={recaptchaCallback}
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
