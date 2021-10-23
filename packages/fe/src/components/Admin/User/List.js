import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { navigate } from 'gatsby-link';
import UIKit from 'uikit/dist/js/uikit.min.js';
import * as dayjs from 'dayjs';
import styled from 'styled-components';

import Modal, { showModal } from '../../common/Modal';

import {
  getAPIWithToken,
  deleteAPIWithToken,
  patchAPIWithToken,
} from '../../../utils/api';
import { getToken } from '../../../utils/auth';

import { BIDDER_VALUE } from '../../../utils/constants/role';
import { DEFAULT_ERROR } from '../../../utils/constants/error';

const userDetailModalID = 'userDetailModal';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [upgradeRequestList, setUpgradeRequestList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    loadData();
    UIKit.tab('#tabbar');
    UIKit.switcher('#detail-tabs');
  }, []);

  const loadData = async () => {
    const token = await getToken();
    const [userListResponse, requestListResponse] = await Promise.all([
      getAPIWithToken('/api/admin/user', token),
      getAPIWithToken('/api/admin/upgrade-request', token),
    ]);
    if (userListResponse.error || requestListResponse.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    setUserList(userListResponse);
    setUpgradeRequestList(requestListResponse);
  };

  const onAdd = () => {
    navigate('add');
  };

  const onEdit = (userId) => {
    navigate(`edit/${userId}`);
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
        if (response.error) {
          toast.error(DEFAULT_ERROR);
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

  const onApproveRequest = async (requestId) => {
    const token = await getToken();
    const response = await patchAPIWithToken(
      `/api/admin/upgrade-request/${requestId}/approve`,
      {},
      token,
    );

    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    loadData();
  };

  const onRejectRequest = async (requestId) => {
    const token = await getToken();
    const response = await patchAPIWithToken(
      `/api/admin/upgrade-request/${requestId}/reject`,
      {},
      token,
    );

    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    loadData();
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
      <div className="uk-flex uk-flex-column">
        <ul
          id="tabbar"
          className="uk-margin-remove-bottom uk-margin-top"
          uk-tab="connect: #detail-tabs; animation: uk-animation-fade"
        >
          <li className="uk-active">
            <a href="#">Người dùng</a>
          </li>
          <li>
            <a href="#">Yêu cầu nâng cấp</a>
          </li>
        </ul>
        <ul id="detail-tabs" className="uk-switcher">
          <li>
            <table className="uk-table uk-table-divider uk-table-striped uk-margin-remove-top">
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
                      <td>
                        {user.role === BIDDER_VALUE ? 'BIDDER' : 'SELLER'}
                      </td>
                      <td>
                        <span
                          uk-icon="plus-circle"
                          style={{ cursor: 'pointer' }}
                          onClick={() => onDetails(user._id)}
                        ></span>
                        <span
                          className="uk-margin-left"
                          uk-icon="pencil"
                          style={{ cursor: 'pointer' }}
                          onClick={() => onEdit(user._id)}
                        ></span>
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
          </li>
          <li>
            <table className="uk-table uk-table-divider uk-table-striped uk-margin-remove-top">
              <thead>
                <tr>
                  <th className="uk-table-shrink">STT</th>
                  <th className="uk-width-large">Họ tên</th>
                  <th className="uk-width-large">Email</th>
                  <th className="uk-width-large uk-text-danger">
                    Ngày hết hạn
                  </th>
                  <th className="uk-width-large"></th>
                </tr>
              </thead>
              <tbody>
                {upgradeRequestList.map((request, index) => {
                  return (
                    <tr key={request._id}>
                      <RequestTableCell>{index + 1}</RequestTableCell>
                      <RequestTableCell>{request.user.name}</RequestTableCell>
                      <RequestTableCell>{request.user.email}</RequestTableCell>
                      <RequestTableCell>
                        {dayjs(request.createdAt)
                          .add(request.expiredIn * 1000, 'millisecond')
                          .format('DD/MM/YYYY - HH:mm')}
                      </RequestTableCell>
                      <td>
                        <button
                          className="uk-button uk-button-primary uk-margin-right"
                          onClick={() => onApproveRequest(request._id)}
                        >
                          Duyệt
                        </button>
                        <button
                          className="uk-button uk-button-danger"
                          onClick={() => onRejectRequest(request._id)}
                        >
                          Từ chối
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </li>
        </ul>
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

const RequestTableCell = styled.td`
  vertical-align: middle !important;
`;
