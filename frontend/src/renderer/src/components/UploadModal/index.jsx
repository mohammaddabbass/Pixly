import React from 'react';
import './styles.css';
import Button from '../Button';

const UploadModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay flex align-center justify-center">
      <div className="upload-modal">
        <div className="modal-header">
          <h3 className="modal-title">Upload Image</h3>
        </div>
        
        <div className="modal-content">
          <input className='upload-input' type="file" name="" id="" />
        </div>

        <div className="modal-actions">
          <Button variant='cancel' buttonText={"Cancel"}onClick={onClose}/>
          <Button buttonText={"Upload"}/>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;