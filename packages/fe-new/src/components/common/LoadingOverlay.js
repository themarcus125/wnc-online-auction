import React, { useEffect, useRef } from 'react';

const LoadingOverlay = ({ isLoading }) => {
  const loadingOverlayEl = useRef(null);

  useEffect(() => {
    if (loadingOverlayEl.current) {
      isLoading
        ? loadingOverlayEl.current.classList.remove('uk-animation-fade')
        : loadingOverlayEl.current.classList.add(
            'uk-animation-fade',
            'uk-animation-reverse',
          );
    }
  }, [isLoading]);

  const onTransitionEnd = () => {
    if (loadingOverlayEl.current) {
      loadingOverlayEl.current.classList.add('uk-hidden');
    }
  };
  return (
    <div
      ref={loadingOverlayEl}
      id="loading-overlay"
      className="uk-animation-fade uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle"
      onAnimationEnd={onTransitionEnd}
      style={{ zIndex: 10 }}
    >
      <span uk-spinner="ratio: 4.5"></span>
    </div>
  );
};

export default LoadingOverlay;
