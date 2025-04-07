import React from 'react';
import './styles.css';

const Button = ({onClick, className = '', variant= "primary", buttonText}) => {
    return (
        <button className={`button ${variant} ${className}`} onClick={onClick}>{buttonText}</button>
    );
};

export default Button;