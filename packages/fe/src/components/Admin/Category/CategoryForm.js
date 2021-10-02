import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'gatsby';

import LoadingOverlay from '../../common/LoadingOverlay';

import { postAPIWithToken, getAPI } from '../../../utils/api';
import { getToken } from '../../../utils/auth';

const CategoryForm = ({ id }) => {
  const [category, setCategory] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadCategoryDetails();
    }
    onLoadParentCategories();
  }, []);

  const onLoadParentCategories = async () => {
    const response = await getAPI('/api/category');
    if (response.error) {
      toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
      return;
    }
    setParentCategories(response);
  };

  const loadCategoryDetails = async () => {
    setLoading(true);
    const response = await getAPI(`/api/category/${id}`);
    setCategory(response.name);
    setSelectedParentCategory(response.parent || '');
    setLoading(false);
  };

  const onCreate = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const data = {
      name: category,
      ...(!selectedParentCategory
        ? {}
        : {
            parent: selectedParentCategory,
          }),
    };
    const response = await postAPIWithToken('/api/category', data, token);

    if (response.error) {
      toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
      return;
    }

    toast.success('Đã thêm danh mục thành công!');
    setCategory('');
    setSelectedParentCategory('');
  };

  return (
    <div>
      <Link to={'/admin/category'} className="uk-text-uppercase">
        Về danh sách danh mục
      </Link>
      <h3 className="uk-text-primary uk-text-bold uk-margin-top-remove">
        {id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      </h3>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default">
        <form className="uk-form">
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Tên danh mục"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="uk-margin">
              <select
                className="uk-select"
                value={selectedParentCategory}
                onChange={(e) => setSelectedParentCategory(e.target.value)}
              >
                <option value="">Không có danh mục cha</option>
                {parentCategories.map((parentCategory) => {
                  return (
                    <option key={parentCategory._id} value={parentCategory._id}>
                      {parentCategory.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="uk-button uk-button-primary" onClick={onCreate}>
              Tạo
            </button>
          </fieldset>
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default CategoryForm;
