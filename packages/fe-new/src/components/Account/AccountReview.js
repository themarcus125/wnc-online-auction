import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LoadingOverlay from '../common/LoadingOverlay';

import { getToken } from '../../utils/auth';
import { getAPIWithToken } from '../../utils/api';

const AccountReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(`/api/rating`, token);

    if (!response.error) {
      setReviews(response);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Đánh giá</h3>
      <div>
        {reviews.map((review) => {
          return (
            <ReviewContainer key={review._id}>
              <p className="uk-margin-small-bottom uk-flex uk-flex-between">
                <span className="uk-text-bold">Nguyễn Văn A</span>
                <span>
                  Điểm <b>8</b> /10
                </span>
              </p>
              <span>17:00 - 29/09/2021</span>
              <textarea
                className="uk-textarea uk-margin-small-top"
                readOnly
                rows="5"
                value={'Đánh giá của bạn'}
                style={{ resize: 'none' }}
              />
            </ReviewContainer>
          );
        })}
        <LoadingOverlay isLoading={loading} />
      </div>
    </React.Fragment>
  );
};

export default AccountReview;

const ReviewContainer = styled.div`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;
