import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import './styles.css';
import DeleteModal from '../DeleteModal';

const ImageCard = ({ src, name, size, date, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="image-card-wrapper">
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            onDelete(); // call delete function
            setShowDeleteModal(false);
          }}
        />
      )}
      <div className="image-card">
        <div className="card-header">
          <img src={src} alt={name} className="card-image" />
          <div className="card-actions flex">
            <button className="action-btn delete-btn" onClick={() => setShowDeleteModal(true)}>
              <Trash2 size={20} color="#ef4444" />
            </button>
            <button className="action-btn edit-btn">
              <Edit size={20} color="#6d28d9" />
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="image-meta flex justify-between align-center">
            <span className="filename">{name}</span>
            <span className="filesize">{size} MB</span>
          </div>
          <div className="image-date">Uploaded: {date}</div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
