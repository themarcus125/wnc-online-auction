import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from '../hooks/useNavigate';
import * as Yup from 'yup';

import { patchAPIWithToken, postAPIWithToken } from '../utils/api';
import { getToken } from '../utils/auth';

import { DEFAULT_ERROR, EMAIL_NOT_EXIST } from '../utils/constants/error';
import { OTP_SENT } from '../utils/constants/success';

const isEmail = Yup.string().email('Email không hợp lệ');

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);
  const { navigate } = useNavigate();

  const onSendOtp = async () => {
    let isValidEmail = true;
    try {
      await isEmail.validate(email);
    } catch (err) {
      toast.error(err.message);
      isValidEmail = false;
    }

    if (!isValidEmail) {
      return;
    }

    const token = await getToken();
    const sendOtpResponse = await postAPIWithToken(
      '/api/user/password/reset/otp',
      {
        email,
      },
      token,
    );
    if (sendOtpResponse.error) {
      toast.error(EMAIL_NOT_EXIST);
      return;
    }
    setSent(true);
    toast.success(`${OTP_SENT} ${email}.`);
  };

  const onUpdate = async () => {
    const token = await getToken();
    const updatePasswordResponse = await patchAPIWithToken(
      '/api/user/password/reset/otp',
      {
        email,
        password,
        otp,
      },
      token,
    );
    if (updatePasswordResponse.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }

    navigate('/login', {
      state: {
        toastMsg: 'Hãy đăng nhập với thông tin tài khoản mới',
        toastType: 'success',
      },
    });
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
        {sent ? (
          <React.Fragment>
            <legend className="uk-legend">Reset mật khẩu</legend>
            <small>{`Mã OTP đã được gửi tới email ${email}`}</small>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="uk-button uk-button-primary"
              onClick={onUpdate}
              disabled={!otp || !password}
            >
              Cập nhật
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <legend className="uk-legend">Email reset mật khẩu</legend>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="uk-button uk-button-primary" onClick={onSendOtp}>
              Gửi mã OTP
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
