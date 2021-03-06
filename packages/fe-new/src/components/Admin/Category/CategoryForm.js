import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from '../../../hooks/useNavigate';
import { useAdminCategory } from '../../../hooks/useAdminCategory';

import LoadingOverlay from '../../common/LoadingOverlay';

import {
  postAPIWithToken,
  getAPI,
  patchAPIWithToken,
} from '../../../utils/api';
import { getToken } from '../../../utils/auth';

import { DEFAULT_ERROR } from '../../../utils/constants/error';
import { CATEGORY_ADDED } from '../../../utils/constants/success';

const CategoryForm = () => {
  const [category, setCategory] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubCategory, setHasSubCategory] = useState(false);
  const [hasProduct, setHasProduct] = useState(false);
  const { categoryId: id } = useAdminCategory();

  const { navigate } = useNavigate();

  useEffect(() => {
    if (id) {
      loadCategoryDetails();
    }
    onLoadParentCategories();
  }, [id]);

  const onLoadParentCategories = async () => {
    const response = await getAPI('/api/category?mode=parent');
    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }
    let categories = response;
    if (id) {
      categories = categories.filter((category) => category._id !== id);
    }
    setParentCategories(categories);
  };

  const loadCategoryDetails = async () => {
    setLoading(true);
    const [categoryDetailsResponse, subCategoryResponse, productResponse] =
      await Promise.all([
        getAPI(`/api/category/${id}`),
        getAPI(`/api/category?mode=child&&parent=${id}`),
        getAPI(`/api/product?mode=category&&category=${id}`),
      ]);
    if (categoryDetailsResponse.error || categoryDetailsResponse.isDel) {
      navigate('/admin/category');
      return;
    }
    if (!subCategoryResponse.error) {
      setHasSubCategory(!!subCategoryResponse.length);
    }
    if (!productResponse.error) {
      setHasProduct(!!productResponse.products.length);
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
    const response = await postAPIWithToken('/api/admin/category', data, token);

    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }

    toast.success(CATEGORY_ADDED);
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
      `/api/admin/category/${id}`,
      data,
      token,
    );
    if (response.error) {
      toast.error(DEFAULT_ERROR);
      return;
    }

    navigate('/admin/category');
  };

  return (
    <div>
      <Link to={'/admin/category'} className="uk-text-uppercase">
        V??? danh s??ch danh m???c
      </Link>
      <h3 className="uk-text-primary uk-text-bold uk-margin-top-remove">
        {id ? 'Ch???nh s???a danh m???c' : 'Th??m danh m???c'}
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
              <label className="uk-form-label">T??n danh m???c</label>
              <input
                className="uk-input"
                type="text"
                placeholder="T??n danh m???c"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Danh m???c cha</label>
              <select
                className="uk-select"
                value={selectedParentCategory}
                onChange={(e) => setSelectedParentCategory(e.target.value)}
                disabled={id && (hasSubCategory || hasProduct)}
              >
                <option value="">Kh??ng c?? danh m???c cha</option>
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
              {id ? 'L??u' : 'T???o'}
            </button>
          </fieldset>
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default CategoryForm;
