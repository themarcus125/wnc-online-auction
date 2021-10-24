import React from 'react';

const FormErrorMessage = ({ children }) => {
  return <small className="uk-text-danger">{children}</small>;
};

export default FormErrorMessage;
