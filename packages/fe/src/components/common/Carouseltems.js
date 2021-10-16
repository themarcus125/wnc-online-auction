import React, { useEffect } from 'react';
import UIKit from 'uikit/dist/js/uikit.min.js';

const CarouselItems = ({ data, renderItem, itemsPerPage = 3 }) => {
  useEffect(() => {
    UIKit.slider('#slider');
  }, []);

  if (data.length === 0) {
    return <div />;
  }

  return (
    <div
      id="slider"
      className="uk-slider-container-offset"
      uk-slider="finite: true"
    >
      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        tabIndex={-1}
      >
        <ul
          className={`uk-slider-items uk-child-width-1-${
            itemsPerPage > 3 ? 3 : itemsPerPage
          }@s uk-grid`}
        >
          {data.map((item) => {
            return <li key={item._id || item}>{renderItem(item)}</li>;
          })}
        </ul>

        <a
          className="uk-position-center-left"
          href="#"
          uk-slider-item="previous"
          style={ArrowButton}
          uk-icon="chevron-left"
        ></a>
        <a
          className="uk-position-center-right"
          href="#"
          uk-slider-item="next"
          style={ArrowButton}
          uk-icon="chevron-right"
        ></a>
      </div>
    </div>
  );
};

export default CarouselItems;

const ArrowButton = {
  height: 50,
  width: 50,
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.3)',
};
