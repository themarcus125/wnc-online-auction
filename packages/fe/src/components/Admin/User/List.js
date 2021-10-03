import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'gatsby';
import { navigate } from 'gatsby-link';
import UIKit from 'uikit/dist/js/uikit.min.js';
import * as dayjs from 'dayjs';
import styled from 'styled-components';

import Modal, { showModal } from '../../common/Modal';

import { getAPIWithToken, deleteAPIWithToken } from '../../../utils/api';
import { getToken } from '../../../utils/auth';
import { BIDDER_VALUE } from '../../../utils/constants/role';

const userDetailModalID = 'userDetailModal';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token = await getToken();
    const response = await getAPIWithToken('/api/admin/user', token);
    if (response.error) {
      toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
      return;
    }
    setUserList(response);
  };

  const onAdd = () => {
    navigate('add');
  };

  const onDelete = (userId) => {
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn xóa người dùng này?').then(
      async () => {
        const token = await getToken();
        const response = await deleteAPIWithToken(
          `/api/admin/user/${userId}`,
          token,
        );
        console.log();
        if (response.error) {
          toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
          return;
        }
        loadData();
      },
      () => {},
    );
  };

  const onDetails = async (userId) => {
    showModal(userDetailModalID);
    const token = await getToken();
    const response = await getAPIWithToken(`/api/admin/user/${userId}`, token);
    if (response.error) {
      return;
    }
    setSelectedUser(response);
  };

  return (
    <div>
      <h3 className="uk-text-primary uk-text-bold">Danh sách người dùng</h3>
      <button className="uk-button uk-button-primary" onClick={onAdd}>
        Thêm mới
      </button>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div className="uk-flex">
        <table className="uk-table uk-table-divider uk-table-striped">
          <thead>
            <tr>
              <th className="uk-table-shrink">STT</th>
              <th className="uk-width-large">Họ tên</th>
              <th className="uk-width-large">Email</th>
              <th className="uk-width-small">Phân hệ</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === BIDDER_VALUE ? 'BIDDER' : 'SELLER'}</td>
                  <td>
                    <span
                      uk-icon="plus-circle"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onDetails(user._id)}
                    ></span>
                    <Link to={`edit/${user._id}`}>
                      <span className="uk-margin-left" uk-icon="pencil"></span>
                    </Link>
                    <span
                      className="uk-margin-left"
                      uk-icon="trash"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => onDelete(user._id)}
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal modalID={userDetailModalID} title={`Thông tin chi tiết`}>
          <div>
            <table className="uk-table">
              <thead hidden>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Họ tên</td>
                  <td>{selectedUser.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="uk-flex uk-flex-between">
                    {selectedUser.email}{' '}
                    <Badge isVerified={selectedUser.isVerified}>
                      {selectedUser.isVerified
                        ? 'Đã xác thực email'
                        : 'Chưa xác thực email'}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>Phân hệ</td>
                  <td>
                    {selectedUser.role === BIDDER_VALUE ? 'BIDDER' : 'SELLER'}
                  </td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>{selectedUser.address}</td>
                </tr>
                <tr>
                  <td>Ngày sinh</td>
                  <td>{dayjs(selectedUser.dob).format('DD/MM/YYYY')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;

const Badge = styled.span`
  padding: 0px 10px;
  color: #fff;
  background-color: ${(props) => (props.isVerified ? '#32d296' : '#f0506e')};
`;
