import React from 'react';
import './styles.css';

const RotateButton = ({buttonText, onClick}) => {
    return (
        <button className='rotate-button' onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default RotateButton;