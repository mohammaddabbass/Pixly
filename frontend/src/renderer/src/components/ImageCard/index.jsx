import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import './styles.css';
import DeleteModal from '../DeleteModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectImage } from '../../../features/imageSlice';

const ImageCard = ({ src, name, size, date, onDelete, image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {} = useSelector()
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleNavigation = () => {
    console.log("navigated");
    navigate('/edit-image');
    dispatch(selectImage(image));
    console.log("dispatched")
  }

  return (
    <div className="image-card-wrapper">
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            onDelete();
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
            <button className="action-btn edit-btn" onClick={handleNavigation}>
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
