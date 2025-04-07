import React from 'react';
import './styles.css';
import Button from '../Button';

const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay flex align-center justify-center">
      <div className="delete-modal">
        <div className="modal-header">
          <h3 className="modal-title">Delete Image</h3>
        </div>
        
        <div className="modal-content">
          <p className="warning-text">
            Are you sure you want to delete this image? This action cannot be undone.
          </p>
        </div>

        <div className="modal-actions">
          <Button variant='cancel' buttonText={"Cancel"}onClick={onClose}/>
          <Button variant='destructive' buttonText={"Delete"}/>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;