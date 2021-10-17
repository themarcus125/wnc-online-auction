import React from 'react';
import { Link } from 'gatsby';

const AccountBidHistory = () => {
  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Lịch sử đấu giá</h3>
      <div>
        <select className="uk-select uk-width-auto">
          <option>Tất cả</option>
          <option>Đã thắng</option>
        </select>
        <table className="uk-table uk-table-divider uk-table-striped">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Ngày đấu giá</th>
              <th>Số tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sản phẩm 1</td>
              <td>24/2/2021</td>
              <td>1.000.000đ</td>
              <td className="uk-flex uk-flex-middle">
                <a
                  title="Chỉnh sửa"
                  className="uk-icon-link"
                  uk-icon="file-edit"
                ></a>
              </td>
            </tr>
            <tr>
              <td>Sản phẩm 2</td>
              <td>19/02/2021</td>
              <td>2.000.000đ</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default AccountBidHistory;
