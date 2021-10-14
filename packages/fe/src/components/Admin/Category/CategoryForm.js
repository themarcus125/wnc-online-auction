import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'gatsby';
import { navigate } from 'gatsby-link';

import LoadingOverlay from '../../common/LoadingOverlay';

import {
  postAPIWithToken,
  getAPI,
  patchAPIWithToken,
} from '../../../utils/api';
import { getToken } from '../../../utils/auth';

const CategoryForm = ({ id }) => {
  const [category, setCategory] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubCategory, setHasSubCategory] = useState(false);

  useEffect(() => {
    if (id) {
      loadCategoryDetails();
    }
    onLoadParentCategories();
  }, []);

  const onLoadParentCategories = async () => {
    const response = await getAPI('/api/category?mode=parent');
    if (response.error) {
      toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
      return;
    }
    setParentCategories(response);
  };

  const loadCategoryDetails = async () => {
    setLoading(true);
    const [categoryDetailsResponse, subCategoryResponse] = await Promise.all([
      getAPI(`/api/category/${id}`),
      getAPI(`/api/category?mode=child&&parent=${id}`),
    ]);
    if (categoryDetailsResponse.error || categoryDetailsResponse.isDel) {
      navigate('/admin/category');
      return;
    }
    if (!subCategoryResponse.error) {
      setHasSubCategory(!!subCategoryResponse.length);
    }
    setCategory(categoryDetailsResponse.name);
    setSelectedParentCategory(categoryDetailsResponse.parent || '');
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

  const onEdit = async (e) => {
    e.preventDefault();
    // Check if category has product or not before delete
    const token = await getToken();
    const data = {
      name: category,
      ...(!selectedParentCategory
        ? {}
        : {
            parent: selectedParentCategory,
          }),
    };
    const response = await patchAPIWithToken(
      `/api/category/${id}`,
      data,
      token,
    );
    if (response.error) {
      toast.error('Đã có lỗi xày ra, xin vui lòng thử lại sau!');
      return;
    }

    navigate('/admin/category');
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
              <label className="uk-form-label">Tên danh mục</label>
              <input
                className="uk-input"
                type="text"
                placeholder="Tên danh mục"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Danh mục cha</label>
              <select
                className="uk-select"
                value={selectedParentCategory}
                onChange={(e) => setSelectedParentCategory(e.target.value)}
                disabled={id && hasSubCategory}
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
            <button
              className="uk-button uk-button-primary"
              disabled={!category}
              onClick={id ? onEdit : onCreate}
            >
              {id ? 'Lưu' : 'Tạo'}
            </button>
          </fieldset>
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default CategoryForm;
