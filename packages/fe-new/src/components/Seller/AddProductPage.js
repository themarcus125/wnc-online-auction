import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import FormErrorMessage from '../common/Form/ErrorMessage';
import RichTextEditor from '../common/RichTextEditor';

import { getAPI, postFileAPIWithToken } from '../../utils/api';
import { getToken } from '../../utils/auth';

import {
  DEFAULT_ERROR,
  INVALID_BUY_NOW_PRICE,
  INVALID_EXPIRED_TIME,
} from '../../utils/constants/error';
import { PRODUCT_CREATED } from '../../utils/constants/success';

const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required('*Bắt buộc'),
  startPrice: Yup.number().min(1, 'Hãy thêm giá khởi điểm'),
  stepPrice: Yup.number().min(1, 'Hãy thêm bước giá'),
  buyPrice: Yup.number(),
  description: Yup.string().required('*Bắt buộc'),
  autoRenew: Yup.boolean(),
  images: Yup.array().min(3, '*Phải từ 3 ảnh trở lên'),
  category: Yup.string().required('*Bắt buộc'),
  expiredDate: Yup.date().min(
    dayjs().add(1, 'day').toDate(),
    'Ngày không hợp lệ',
  ),
  expiredTime: Yup.string(),
});

const Thumb = ({ image }) => {
  const [thumb, setThumb] = useState(null);
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumb(reader.result);
    };
    reader.readAsDataURL(image);
  }, []);
  return <Img className="uk-margin-right" src={thumb} />;
};

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const imageRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await getAPI('/api/category?mode=child');
    if (response.error) {
      return;
    }
    setCategories(response);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const {
      images,
      name,
      startPrice,
      stepPrice,
      buyPrice,
      description,
      autoRenew,
      allowNoRatingBid,
      category,
      expiredDate,
      expiredTime,
    } = values;

    if (buyPrice !== 0 && buyPrice < startPrice) {
      toast.error(INVALID_BUY_NOW_PRICE);
      setSubmitting(false);
      return;
    }

    const expiredInHours = dayjs(
      `${expiredTime} ${dayjs(expiredDate).format('YYYY-MM-DD')}`,
    ).diff(dayjs().format('HH:mm YYYY-MM-DD'), 'hour');
    if (expiredInHours < 24) {
      toast.error(INVALID_EXPIRED_TIME);
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startPrice', startPrice);
    formData.append('stepPrice', stepPrice);
    formData.append('buyPrice', buyPrice);
    formData.append('autoRenew', autoRenew);
    formData.append('allowNoRatingBid', allowNoRatingBid);
    formData.append('category', category);
    formData.append('expiredIn', expiredInHours);
    images.forEach((image) => {
      formData.append(`productImages`, image);
    });
    const token = await getToken();
    const response = await postFileAPIWithToken(
      '/api/product/user',
      formData,
      token,
    );

    if (response.error) {
      toast.error(DEFAULT_ERROR);
      setSubmitting(false);
      return;
    }

    toast.success(PRODUCT_CREATED);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="page uk-margin-auto uk-padding uk-padding-remove-top uk-padding-remove-left uk-padding-remove-right">
      <Link to={'/'} className="uk-text-uppercase">
        <span className="uk-icon" uk-icon="icon: arrow-left"></span>
        Trang chủ
      </Link>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        theme="colored"
      />
      <h3 className="uk-text-primary uk-text-bold uk-text-center uk-margin-remove-top">
        Thêm sản phẩm
      </h3>
      <div>
        <Formik
          initialValues={{
            name: '',
            startPrice: 0,
            stepPrice: 0,
            buyPrice: 0,
            description: '',
            autoRenew: false,
            allowNoRatingBid: false,
            images: [],
            category: categories?.[0]?._id ?? '',
            expiredTime: dayjs().format('HH:mm'),
            expiredDate: dayjs().add(1, 'day').toDate(),
          }}
          enableReinitialize
          validationSchema={CreateProductSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue, handleChange }) => (
            <Form className="uk-grid-small" uk-grid="">
              <div className="uk-width-2-3">
                <small>Tên sản phẩm</small>
                <Field className="uk-input" type="text" name="name" />
                <ErrorMessage name="name" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-3">
                <small>Danh mục</small>
                <Field className="uk-select" as="select" name="category">
                  {categories.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="category" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-1">
                <small>Hình ảnh</small>
                <ImgContainer uk-form-custom="">
                  <input
                    ref={imageRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple
                    onChange={(event) => {
                      setFieldValue(
                        'images',
                        values.images.concat(event.target.files[0]),
                      );
                    }}
                  />
                  {values.images.map((image, index) => {
                    return <Thumb key={index} image={image} />;
                  })}
                  <ButtonAddImg
                    className="uk-flex-middle uk-flex-center uk-border-rounded"
                    onClick={() => imageRef.current.click()}
                  >
                    <span uk-icon="icon: plus; ratio: 3.5"></span>
                  </ButtonAddImg>
                </ImgContainer>
                <ErrorMessage name="images" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-3@s">
                <small>Giá khởi điểm</small>
                <Field className="uk-input" type="number" name="startPrice" />
                <ErrorMessage name="startPrice" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-3@s">
                <small>Bước giá</small>
                <Field className="uk-input" type="number" name="stepPrice" />
                <ErrorMessage name="stepPrice" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-3@s">
                <small>
                  Giá mua ngay{' '}
                  <span className="uk-text-danger">(Không bắt buộc)</span>
                </small>
                <Field className="uk-input" type="number" name="buyPrice" />
                <ErrorMessage name="buyPrice" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-4">
                <small>Giờ kết thúc</small>
                <Field className="uk-input" type="time" name="expiredTime" />
                <ErrorMessage name="expiredTime" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-4">
                <small>Ngày kết thúc</small>
                <DatePicker
                  className="uk-input uk-width-1-1"
                  style={{
                    border: 'solid 0.5px #666',
                  }}
                  selected={values.expiredDate}
                  onChange={(date) => {
                    handleChange({
                      target: { name: 'expiredDate', value: date },
                    });
                  }}
                  dateFormat="dd/MM/yyyy"
                  onChangeRaw={(e) => e.preventDefault()}
                />
                <ErrorMessage name="expiredDate" component={FormErrorMessage} />
              </div>
              <div className="uk-width-1-5 uk-flex uk-flex-left uk-flex-column">
                <small>Tự động gia hạn</small>
                <div>
                  <Field
                    className="uk-checkbox"
                    type="checkbox"
                    name="autoRenew"
                  />
                </div>
              </div>
              <div className="uk-width-auto uk-flex uk-flex-left uk-flex-column">
                <small>Cho phép người chưa được đánh giá đấu giá</small>
                <div>
                  <Field
                    className="uk-checkbox"
                    type="checkbox"
                    name="allowNoRatingBid"
                  />
                </div>
              </div>
              <div className="uk-width-1-1" style={{ zIndex: 0 }}>
                <small>Mô tả sản phẩm</small>
                <RichTextEditor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onEditorChange={(e) => {
                    handleChange({ target: { name: 'description', value: e } });
                  }}
                  name="description"
                  value={values.description}
                />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </div>

              <div className="uk-width-1-1 uk-text-center">
                <button
                  className="uk-button uk-button-primary"
                  disabled={isSubmitting}
                >
                  Tạo sản phẩm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductPage;

const Img = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  background-color: #f2f3f2;
`;

const ButtonAddImg = styled.div`
  width: 300px;
  height: 300px;
  display: inline-flex;
  cursor: pointer;
  background-color: #f2f3f2;
`;

const ImgContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  max-width: 1000px;
  white-space: nowrap;
`;
