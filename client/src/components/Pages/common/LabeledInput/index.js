import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const LabeldInput = ({
  htmlFor,
  label,
  id,
  type,
  className,
  placeHolder,
  name,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="input-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`input-filed ${className}`}
        placeholder={placeHolder}
        name={name}
      />
    </div>
  );
};

LabeldInput.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default LabeldInput;
