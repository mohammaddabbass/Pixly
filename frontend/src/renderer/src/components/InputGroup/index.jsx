import React from 'react';
import './styles.css';

const InputGroup = ({ label, id, type, placeholder, value, onChange, min= 0, max= 200 }) => {
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
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputGroup;