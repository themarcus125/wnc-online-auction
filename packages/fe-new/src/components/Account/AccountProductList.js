import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from '../../hooks/useNavigate';
import dayjs from 'dayjs';

import Modal, { hideModal, showModal } from '../common/Modal';
import RichTextEditor from '../common/RichTextEditor';

import { getAPI, getAPIWithToken, patchAPIWithToken } from '../../utils/api';
import { getToken } from '../../utils/auth';

import { DEFAULT_ERROR } from '../../utils/constants/error';
import { PRODUCT_DESCRIPTION_UPDATED } from '../../utils/constants/success';

const descriptionModalID = 'descriptionModal';

const AccountProductList = () => {
  const editorRef = useRef(null);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [loading, setLoading] = useState(false);
  const selectedProduct = useRef('');

  const { navigate } = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const onAdd = () => {
    navigate('/seller/add-product');
  };

  const onDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onUpdate = (productId) => {
    selectedProduct.current = productId;
    editorRef.current.setContent('');
    showModal(descriptionModalID);
  };

  const onSave = async () => {
    if (editorRef.current) {
      const token = await getToken();
      const response = await patchAPIWithToken(
        `/api/user/product/description`,
        {
          description: `<div><br/>✏️ ${dayjs().format(
            'DD/MM/YYYY - HH:mm',
          )}<br/>${editorRef.current.getContent().trim()}</div>`,
          productId: selectedProduct.current,
        },
        token,
      );
      if (!response.error) {
        toast.success(PRODUCT_DESCRIPTION_UPDATED);
        hideModal(descriptionModalID);
      } else {
        toast.error(DEFAULT_ERROR);
      }
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      `/api/product/seller/selling`,
      token,
    );
    if (!response.error) {
      setProductList(response.reverse());
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const response = await getAPI('/api/category');

    if (!response.error) {
      const obj = response.reduce(
        (obj, category) => ((obj[category._id] = category.name), obj),
        {},
      );
      setCategoryList(obj);
    }
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">
        Danh sách sản phẩm đang bán
      </h3>
      <button className="uk-button uk-button-primary" onClick={onAdd}>
        Thêm mới
      </button>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div>
        {loading ? (
          <div uk-spinner="" />
        ) : (
          <table className="uk-table uk-table-divider uk-table-striped">
            <thead>
              <tr>
                <th style={{ width: '140px' }}>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá hiện tại</th>
                <th>Ngày hết hạn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{categoryList[product.category]}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {Number(product.currentPrice).toLocaleString()} đ
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {dayjs(product.expiredAt).format('HH:mm')}
                      <br />
                      {dayjs(product.expiredAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <p className="uk-flex uk-flex-column">
                        <Button
                          className="uk-button uk-button-primary uk-margin-bottom"
                          onClick={() => onDetail(product._id)}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          className="uk-button uk-button-secondary"
                          onClick={() => onUpdate(product._id)}
                        >
                          Cập nhật
                        </Button>
                      </p>
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Modal
          modalID={descriptionModalID}
          isContainer
          title="Cập nhật mô tả sản phẩm"
          buttonRow={
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={onSave}
            >
              Cập nhật
            </button>
          }
        >
          <RichTextEditor
            onInit={(evt, editor) => (editorRef.current = editor)}
          />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AccountProductList;

const TableCell = styled.td`
  vertical-align: middle !important;
`;

const Button = styled.button`
  width: 130px;
`;
