import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import './styles.css';

const ImageCard = () => {
  return (
    <div className="image-card-wrapper">
      <div className="image-card">
        <div className="card-header">
          <img 
            src="https://picsum.photos/400/300" 
            alt="Uploaded content" 
            className="card-image"
          />
          <div className="card-actions">
            <button className="action-btn delete-btn">
              <Trash2 size={20} color="#ef4444" />
            </button>
            <button className="action-btn edit-btn">
              <Edit size={20} color="#6d28d9" />
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="image-meta">
            <span className="filename">vacation_photo.jpg</span>
            <span className="filesize">2.4 MB</span>
          </div>
          <div className="image-date">Uploaded: 2024-03-15</div>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
