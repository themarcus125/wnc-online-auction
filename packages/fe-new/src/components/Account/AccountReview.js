import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LoadingOverlay from '../common/LoadingOverlay';

import { getToken, getUser } from '../../utils/auth';
import { getAPIWithToken, getAPI } from '../../utils/api';
import dayjs from 'dayjs';

const AccountReview = () => {
  const { _id: userId } = getUser();
  const [reviews, setReviews] = useState([]);
  const [score, setScore] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const token = await getToken();
    const [ratingsResponse, scoreResponse] = await Promise.all([
      getAPIWithToken(`/api/rating`, token),
      getAPI(`/api/rating/score/${userId}`),
    ]);

    if (!ratingsResponse.error) {
      setReviews(ratingsResponse.reverse());
    }
    if (!scoreResponse.error) {
      setScore(scoreResponse);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h3 className="uk-text-primary uk-text-bold">Đánh giá</h3>
      <div>
        <p className="uk-text-bold">
          Điểm: {score.pos ?? 0}/{score.total ?? 0}
        </p>
        {reviews.map((review) => {
          return (
            <ReviewContainer key={review._id}>
              <p className="uk-margin-small-bottom uk-flex uk-flex-between">
                <span className="uk-text-bold">{review.createUser.name}</span>
                <span
                  className={
                    review.score ? 'uk-text-primary' : 'uk-text-danger'
                  }
                >
                  <b>{review.score ? '+1' : '-1'}</b>
                </span>
              </p>
              <p className="uk-margin-small-bottom uk-flex uk-flex-between">
                <span className="uk-flex" style={{ flex: 3 }}>
                  {review.product.name}
                </span>
                <span
                  className="uk-flex"
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  {dayjs(review.createdAt).format('HH:mm - DD/MM/YYYY')}
                </span>
              </p>
              <textarea
                className="uk-textarea uk-margin-small-top"
                readOnly
                rows="5"
                value={review.feedback}
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
