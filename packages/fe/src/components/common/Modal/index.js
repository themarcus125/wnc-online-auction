import React from 'react';
import ModalPortal from './ModalPortal';
import UIKit from 'uikit/dist/js/uikit.min.js';

export const showModal = (modalID) => {
  UIKit.modal(`#${modalID}`).show();
};

export const hideModal = (modalID) => {
  UIKit.modal(`#${modalID}`).hide();
};

const Modal = ({ modalID, title, description, children, buttonRow }) => {
  return (
    <ModalPortal modalID={modalID}>
      <div className="uk-modal-dialog uk-modal-body">
        {title ? (
          <h4 className="uk-text-bold uk-text-primary">{title}</h4>
        ) : null}
        {description ? <p>{description}</p> : null}
        {children}
        <p className="uk-text-left">{buttonRow ? buttonRow : null}</p>
      </div>
    </ModalPortal>
  );
};

export default Modal;
