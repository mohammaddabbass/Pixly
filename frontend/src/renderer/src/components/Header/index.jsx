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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      console.log(file.name);
      setSelectedFile(file);
    }
  };
  
  const handleUploadConfirm = () => {
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = function () {
        const arrayBuffer = reader.result;
  
        window.electronAPI.saveImage({
          name: selectedFile.name,
          buffer: arrayBuffer
        });
  
        setShowUploadModal(false);
        setSelectedFile(null);
      };
  
      reader.readAsArrayBuffer(selectedFile); // 👈 this is the magic
    }
  };

  return (
    <nav className="navbar flex justify-between align-center">
          {showUploadModal && (
      <UploadModal 
        onClose={() => setShowUploadModal(false)}
        onChange={handleFileChange}
        onConfirm={handleUploadConfirm}
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