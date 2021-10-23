import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';

import { getToken } from '../../../utils/auth';
import { getAPIWithToken, patchAPIWithToken } from '../../../utils/api';

import { SELLER_VALUE, BIDDER_VALUE } from '../../../utils/constants/role';
import { DEFAULT_ERROR } from '../../../utils/constants/error';
import { USER_UPDATED } from '../../../utils/constants/success';

const isEmail = Yup.string().email('Email không hợp lệ');

const UpdateUserForm = ({ id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState(new Date('1/1/1979'));
  const [isVerified, setIsVerified] = useState(false);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(BIDDER_VALUE);
  const originalRole = useRef(BIDDER_VALUE);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token = await getToken();
    const response = await getAPIWithToken(`/api/admin/user/${id}`, token);
    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    setName(response.name);
    setEmail(response.email);
    setAddress(response.address);
    setIsVerified(response.isVerified);
    setRole(response.role);
    originalRole.current = response.role;
    if (response.dob) {
      setDOB(response.dob);
    }
  };

  const onUpdate = async () => {
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
    const response = await patchAPIWithToken(
      `/api/admin/user/${id}`,
      {
        name,
        email,
        dob,
        address,
        isVerified,
        role,
      },
      token,
    );
    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    toast.success(USER_UPDATED);
    loadData();
  };

  return (
    <div>
      <Link to={'/admin/user'} className="uk-text-uppercase">
        Về danh sách người dùng
      </Link>
      <h3 className="uk-text-primary uk-text-bold uk-margin-top-remove">
        Chỉnh sửa thông tin người dùng
      </h3>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div className="uk-width-1-2 uk-background-default">
        <table className="uk-table">
          <thead hidden>
            <tr>
              <th className="uk-width-auto">Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Title>Họ tên</Title>
              <td>
                <input
                  className="uk-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <Title>Email</Title>
              <td>
                <input
                  className="uk-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <Title>Xác thực Email</Title>
              <td>
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                />
              </td>
            </tr>
            {originalRole.current === SELLER_VALUE && (
              <tr>
                <Title>Phân hệ</Title>
                <td>
                  <select
                    className="uk-select"
                    value={role}
                    onChange={(e) => setRole(+e.target.value)}
                  >
                    <option value={BIDDER_VALUE}>BIDDER</option>
                    <option value={SELLER_VALUE}>SELLER</option>
                  </select>
                </td>
              </tr>
            )}
            <tr>
              <Title>Địa chỉ</Title>
              <td>
                <input
                  className="uk-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <Title>Ngày sinh</Title>
              <td>
                {dob && (
                  <DatePicker
                    className="uk-input uk-width-1-1"
                    style={{
                      border: 'solid 0.5px #666',
                    }}
                    selected={new Date(dob)}
                    dateFormat="dd/MM/yyyy"
                    onChangeRaw={(e) => e.preventDefault()}
                    onChange={(date) => setDOB(date)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="uk-button uk-button-primary"
          disabled={!name || !email || !address}
          onClick={onUpdate}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default UpdateUserForm;

const Title = styled.td`
  vertical-align: middle !important;
`;
