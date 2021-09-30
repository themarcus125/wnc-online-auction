import React from 'react';

const AccountInfo = () => {
  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Thông tin tài khoản</h3>
      <div>
        <table className="uk-table uk-width-4-5">
          <tbody>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Họ tên</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <input
                  className="uk-input uk-width-expand"
                  type="text"
                  value={'Hồng Quốc Lâm'}
                />
                <button className="uk-button uk-padding-remove-left uk-padding-remove-right uk-width-auto uk-flex">
                  <span
                    className="uk-icon uk-padding-small uk-padding-remove-top uk-padding-remove-bottom"
                    uk-icon="icon: check"
                    style={{ alignSelf: 'center' }}
                  ></span>
                </button>
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Email</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <input
                  className="uk-input uk-width-expand"
                  type="text"
                  value={'hqlam2@gmail.com'}
                />
                <button className="uk-button uk-button-danger uk-width-auto uk-flex">
                  Xác thực Email
                </button>
                <button className="uk-button uk-padding-remove-left uk-padding-remove-right uk-width-auto uk-flex">
                  <span
                    className="uk-icon uk-padding-small uk-padding-remove-top uk-padding-remove-bottom"
                    uk-icon="icon: check"
                    style={{ alignSelf: 'center' }}
                  ></span>
                </button>
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Địa chỉ</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <input
                  className="uk-input uk-width-expand"
                  type="text"
                  value={'257 Nguyễn Văn Cừ phường 4 Quận 5'}
                />
                <button className="uk-button uk-padding-remove-left uk-padding-remove-right uk-width-auto uk-flex">
                  <span
                    className="uk-icon uk-padding-small uk-padding-remove-top uk-padding-remove-bottom"
                    uk-icon="icon: check"
                    style={{ alignSelf: 'center' }}
                  ></span>
                </button>
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Mật khẩu</td>
              <td className="uk-width-4-5 uk-text-right uk-padding-remove-right">
                <button
                  className="uk-button uk-button-secondary"
                  uk-toggle="target: #modal-example"
                >
                  Đổi mật khẩu
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="modal-example" uk-modal="">
          <div className="uk-modal-dialog uk-modal-body">
            <h4 className="uk-text-bold uk-text-primary">Đổi mật khẩu</h4>
            <div>
              <input
                className="uk-input uk-margin-bottom"
                type="password"
                placeholder="Mật khẩu hiện tại"
              />
              <input
                className="uk-input uk-margin-bottom"
                type="password"
                placeholder="Mật khẩu mới"
              />
              <input
                className="uk-input uk-margin-bottom"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <p>
              <button
                className="uk-button uk-button-default uk-modal-close uk-margin-right"
                type="button"
              >
                Hủy
              </button>
              <button className="uk-button uk-button-primary" type="button">
                Cập nhật
              </button>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;
