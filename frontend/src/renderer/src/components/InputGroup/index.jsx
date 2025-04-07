import React from 'react';
import './styles.css';

const InputGroup = ({ label, id, type, placeholder, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        className="input-field"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputGroup;