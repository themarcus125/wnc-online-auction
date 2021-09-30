import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = (props) => {
  const modalRoot = useMemo(() => document.createElement('div'), []);
  modalRoot.setAttribute('uk-modal', '');
  modalRoot.id = props.modalID;

  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  return ReactDOM.createPortal(props.children, modalRoot);
};

export default ModalPortal;
