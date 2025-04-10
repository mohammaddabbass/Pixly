import React, { useEffect, useState } from 'react';
import { Aperture } from 'lucide-react';
import './styles.css';
import InputGroup from '../InputGroup';
import Button from '../Button';
import UploadModal from '../UploadModal';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setImages, addImage } from '../../../features/imageSlice';
import { useNavigate } from 'react-router-dom';


const Header = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { images, loading } = useSelector((state) => state.images);  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      console.log(file.name);
      setSelectedFile(file);
    }
  };
  
  const handleUploadConfirm = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    
    reader.onload = async () => {
      try {
        const savedImage = await window.electronAPI.saveImage({
          name: selectedFile.name,
          buffer: reader.result
        });

        dispatch(addImage(savedImage));

        setShowUploadModal(false);
        setSelectedFile(null);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

    const fetchImages = async () => {
      dispatch(setLoading()); 
      try {
        const imageData = await window.electronAPI.getSavedImages();
        console.log("Fetched images:", imageData);
        dispatch(setImages(imageData));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
  
    useEffect(() => {
      fetchImages();
    }, [dispatch]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
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
        <button className="nav-link" onClick={navigate('/')}>Home</button>

        <InputGroup type="text" 
        placeholder="Search images..."
        value={searchTerm}
        onChange={handleSearchChange}/>

      <div className="navbar-right flex align-center">
        <Button buttonText={"Upload"} onClick={() => setShowUploadModal(true)}/>
        <div className="user-avatar flex align-center justify-center">MA</div>
      </div>
    </nav>
  );
};

export default Header;