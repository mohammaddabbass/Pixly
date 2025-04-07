import React, { useState } from 'react';
import './styles.css';
import UploadModal from '../UploadModal';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <nav className="header flex align-center">
        <div className="header-content flex align-center justify-between">
          <div className="header-title">Trackify</div>
          <div className="nav-buttons flex justify-between align-center ">
            <button className="nav-button">Dashboard</button>
            <button className="nav-button" onClick={() => setModalOpen(true)}>Upload</button>
            <button className="nav-button" style={{ color: '#86868b' }}>•••</button>
          </div>
        </div>
      </nav>
    </>
  );
};  

export default Header;
