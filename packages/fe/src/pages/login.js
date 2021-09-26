import React from 'react';
import { Link } from 'gatsby';

const LoginPage = () => {
  return (
    <div
      className="uk-flex uk-flex-middle uk-flex-center"
      style={{ height: '100vh', backgroundColor: 'gray' }}
    >
      <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form">
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Đăng nhập vào Bootleg Ebay</legend>
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
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <button className="uk-button uk-button-primary">Đăng nhập</button>
              <small className="uk-text-right">
                <Link to="/register">Tạo tài khoản</Link>
              </small>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
