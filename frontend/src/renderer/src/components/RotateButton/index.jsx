import React from 'react';
import './styles.css';

const RotateButton = ({buttonText}) => {
    return (
        <button className='rotate-button'>
            {buttonText}
        </button>
    );
};

export default RotateButton;