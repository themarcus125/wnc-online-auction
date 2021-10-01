import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  patchAPIWithToken,
  getAPIWithToken,
  postAPIWithToken,
} from '../../utils/api';
import { getToken, setUser } from '../../utils/auth';
import Modal, { showModal, hideModal } from '../common/Modal';

const isEmail = Yup.string().email('Email không hợp lệ');
const passwordModalID = 'passwordModal';
const emailOtpModalID = 'emailOtpModal';

const AccountInfo = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date('1/1/1979'));
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const originalEmail = useRef('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailOtp, setEmailOtp] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken('/api/user', token);
    if (response.error) {
      toast.error('Đã có lỗi xảy ra!');
      return;
    }

    setUser({ ...response, token });
    setFullName(response.name);
    setAddress(response.address);
    setEmail(response.email);
    setIsEmailVerified(response.isVerified);
    originalEmail.current = response.email;
    if (response.bod) {
      setBirthDate(response.bod);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSave = async () => {
    if (!email || !fullName || !address) {
      toast.error('Không được để trống thông tin');
      return;
    }
    setIsSubmitting(true);
    const token = await getToken();

    let isValidEmail = true;
    try {
      await isEmail.validate(email);
    } catch (err) {
      toast.error(err.message);
      isValidEmail = false;
      setIsSubmitting(false);
    }
    if (!isValidEmail) {
      return;
    }

    if (email !== originalEmail.current) {
      const checkEmailResponse = await postAPIWithToken(
        '/api/user/email',
        {
          email,
        },
        token,
      );
      if (checkEmailResponse.error) {
        toast.error('Email đã tồn tại. Xin vui lòng sử dụng email khác');
        setIsSubmitting(false);
        return;
      }
    }

    let apiRequests = [
      patchAPIWithToken(
        '/api/user',
        {
          name: fullName,
          address,
          dob: birthDate,
        },
        token,
      ),
    ];

    if (email !== originalEmail.current) {
      apiRequests = [
        ...apiRequests,
        patchAPIWithToken(
          '/api/user/email',
          {
            email,
          },
          token,
        ),
      ];
    }

    const [updateUserResponse, updateEmailResponse] = await Promise.all(
      apiRequests,
    );

    if (updateEmailResponse?.error || updateUserResponse.error) {
      toast.error('Đã có lỗi xảy ra. Xin vui lòng thử lại sau');
      setIsSubmitting(false);
      return;
    }

    loadData();
    setIsSubmitting(false);
  };

  const onChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Không được để trống thông tin');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Mật khẩu mới không hợp lệ');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không giống nhau');
      return;
    }

    const token = await getToken();
    const response = await patchAPIWithToken(
      '/api/user/password',
      {
        oldPassword: currentPassword,
        newPassword,
      },
      token,
    );
    if (response.error) {
      toast.error('Đã có lỗi xảy ra. Xin vui lòng thử lại sau');
      return;
    }
    toast.success('Cập nhật mật khẩu thành công');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    hideModal(passwordModalID);
  };

  const openOtpModal = async () => {
    const token = await getToken();
    const response = await getAPIWithToken('/api/user/email/verify/otp', token);
    if (response.error) {
      toast.error('Đã có lỗi xảy ra. Xin vui lòng thử lại sau');
      return;
    }
    if (response.status === 'SEND_FAIL') {
      toast.error('Gửi mã OTP thất bại');
      return;
    }
    showModal(emailOtpModalID);
  };

  const onVerifyEmailOtp = async () => {
    if (emailOtp.length > 7) {
      toast.error('Mã OTP không hợp lệ');
      return;
    }

    const token = await getToken();
    const response = await patchAPIWithToken(
      '/api/user/email/verify/otp',
      {
        otp: emailOtp,
      },
      token,
    );
    if (response.error) {
      toast.error('Đã có lỗi xảy ra. Xin vui lòng thử lại sau');
      return;
    }

    hideModal(emailOtpModalID);
    toast.success('Email đã được xác nhận!');
    loadData();
  };

  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Email</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <input
                  className="uk-input uk-width-expand"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailVerified && (
                  <button
                    className="uk-button uk-button-danger uk-width-auto uk-flex"
                    onClick={openOtpModal}
                  >
                    Xác thực Email
                  </button>
                )}
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Địa chỉ</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <input
                  className="uk-input uk-width-expand"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Ngày sinh</td>
              <td className="uk-width-4-5 uk-padding-remove-right uk-flex uk-flex-stretch">
                <DatePicker
                  className="uk-input uk-width-1-1"
                  style={{
                    border: 'solid 0.5px #666',
                  }}
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="dd/MM/yyyy"
                  onChangeRaw={(e) => e.preventDefault()}
                />
              </td>
            </tr>
            <tr className="uk-flex uk-flex-middle">
              <td className="uk-width-1-5 uk-padding-remove-left">Mật khẩu</td>
              <td className="uk-width-4-5 uk-text-right uk-padding-remove-right">
                <button
                  className="uk-button uk-button-secondary"
                  onClick={() => showModal(passwordModalID)}
                >
                  Đổi mật khẩu
                </button>
              </td>
            </tr>
            <tr>
              <td className="uk-padding-remove-left">
                <button
                  className="uk-button uk-button-primary"
                  type="button"
                  onClick={onSave}
                  disabled={isSubmitting}
                >
                  Cập nhật
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Modal
          modalID={passwordModalID}
          title="Đổi mật khẩu"
          buttonRow={
            <React.Fragment>
              <button
                className="uk-button uk-button-default uk-margin-right"
                type="button"
                onClick={() => hideModal(passwordModalID)}
              >
                Hủy
              </button>
              <button
                className="uk-button uk-button-primary"
                type="button"
                onClick={onChangePassword}
              >
                Cập nhật
              </button>
            </React.Fragment>
          }
        >
          <div>
            <input
              className="uk-input uk-margin-bottom"
              type="password"
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              className="uk-input uk-margin-bottom"
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="uk-input uk-margin-bottom"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </Modal>
        <Modal
          modalID={emailOtpModalID}
          title="Nhập mã OTP"
          description="Mã OTP 7 kí tự đã được gửi về email của bạn."
          buttonRow={
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={onVerifyEmailOtp}
            >
              Xác nhận
            </button>
          }
        >
          <div>
            <input
              className="uk-input uk-margin-bottom"
              type="text"
              placeholder="Mã OTP"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
            />
          </div>
        </Modal>
      </div>
      {isLoading && (
        <div
          className="uk-flex uk-flex-center uk-flex-middle"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            top: 0,
            left: 0,
          }}
        >
          <span uk-spinner="ratio: 3"></span>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
