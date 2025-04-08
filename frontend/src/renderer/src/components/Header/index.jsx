// Navbar.jsx
import React, { useState } from 'react';
import { Aperture } from 'lucide-react';
import './styles.css';
import InputGroup from '../InputGroup';
import Button from '../Button';
import DeleteModal from '../DeleteModal';
import UploadModal from '../UploadModal';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);


  return (
    <nav className="navbar flex justify-between align-center">
          {showUploadModal && (
      <UploadModal 
        onClose={() => setShowUploadModal(false)}
        onConfirm={() => {
          // Handle delete logic
          setShowUploadModal(false);
        }}
      />
    )}
      <div className="navbar-left flex align-center">
        <Aperture color="#9B72E8" size={35} />
        <div className="logo">Pixly</div>

      </div>
        <button className="nav-link">Home</button>

        <InputGroup type={'text'} placeholder={"Search images..."}/>

      <div className="navbar-right flex align-center">
        <Button buttonText={"Upload"} onClick={() => setShowUploadModal(true)}/>
        <div className="user-avatar flex align-center justify-center">MA</div>
      </div>
    </nav>
  );
};

export default Header;