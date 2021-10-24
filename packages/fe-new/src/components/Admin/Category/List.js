import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from '../../../hooks/useNavigate';
import { Link } from 'react-router-dom';
import UIKit from 'uikit/dist/js/uikit.min.js';

import Modal, { showModal, hideModal } from '../../common/Modal';

import { getAPI, deleteAPIWithToken } from '../../../utils/api';
import { getToken } from '../../../utils/auth';

import { DEFAULT_ERROR } from '../../../utils/constants/error';

const categoryDetailModalID = 'categoryDetailModal';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  const { navigate } = useNavigate();

  const loadCategories = async () => {
    const response = await getAPI('/api/category?mode=parent');
    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    setCategories(response);
  };

  const onAdd = () => {
    navigate('add');
  };

  const onDetails = async (categoryId, categoryName) => {
    showModal(categoryDetailModalID);
    setSelectedCategoryName(categoryName);
    const response = await getAPI(
      `/api/category?mode=child&&parent=${categoryId}`,
    );
    if (response.error) {
      return;
    }
    setSubCategories(response);
  };

  const onDelete = (categoryId) => {
    hideModal(categoryDetailModalID);
    UIKit.modal.labels = { ok: 'Đồng ý', cancel: 'Không' };
    UIKit.modal.confirm('Bạn có chắc chắn muốn xóa danh mục?').then(
      async () => {
        const token = await getToken();
        const response = await deleteAPIWithToken(
          `/api/admin/category/${categoryId}`,
          token,
        );
        if (response.error) {
          toast.error(DEFAULT_ERROR);
          return;
        }
        loadCategories();
      },
      () => {},
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h3 className="uk-text-primary uk-text-bold">Danh sách danh mục</h3>
      <button className="uk-button uk-button-primary" onClick={onAdd}>
        Thêm mới
      </button>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div>
        <table className="uk-table uk-table-divider uk-table-striped">
          <thead>
            <tr>
              <th className="uk-table-shrink">STT</th>
              <th className="uk-width-2xlarge">Tên danh mục</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <span
                      uk-icon="plus-circle"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onDetails(category._id, category.name)}
                    ></span>
                    <Link to={`edit/${category._id}`}>
                      <span className="uk-margin-left" uk-icon="pencil"></span>
                    </Link>
                    <span
                      className="uk-margin-left"
                      uk-icon="trash"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => onDelete(category._id)}
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          modalID={categoryDetailModalID}
          isContainer
          title={`Category con của ${selectedCategoryName}`}
        >
          <div>
            <table className="uk-table uk-table-divider uk-table-striped">
              <thead>
                <tr>
                  <th className="uk-table-shrink">STT</th>
                  <th className="uk-width-2xlarge">Tên danh mục</th>
                  <th className="uk-width-small"></th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((category, index) => {
                  return (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        <Link to={`category/edit/${category._id}`}>
                          <span
                            className="uk-margin-left"
                            uk-icon="pencil"
                          ></span>
                        </Link>
                        <span
                          className="uk-margin-left"
                          uk-icon="trash"
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => onDelete(category._id)}
                        ></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
