import React from 'react';
import { Link } from 'gatsby';

const RegisterPage = () => {
  return (
    <div
      className="uk-flex uk-flex-middle uk-flex-center"
      style={{ height: '100vh', backgroundColor: 'gray' }}
    >
      <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form">
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Tạo tài khoản Bootleg Ebay</legend>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="text"
                placeholder="Họ tên"
              />
            </div>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="text"
                placeholder="Địa chỉ"
              />
            </div>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="password"
                placeholder="Xác nhận mật khẩu"
              />
            </div>
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <button className="uk-button uk-button-primary">
                Tạo tài khoản
              </button>
              <small className="uk-text-right">
                <Link to="/login">Đăng nhập</Link>
              </small>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
