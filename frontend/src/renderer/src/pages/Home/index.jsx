import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';
import ImageCard from '../../components/ImageCard';

const Home = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const paths = await window.electronAPI.getSavedImages();
    setImages(paths);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (imagePath) => {
    console.log("hello")
    const res = await window.electronAPI.deleteImage(imagePath);
    if (res.success) {
      fetchImages(); // refresh after deletion
    } else {
      console.error(res.error);
    }
  };

  return (
    <div className="page flex column">
      <Header />
      <div className="page-content image-gallery">
        {images.map((img, idx) => (
          <ImageCard
            key={idx}
            src={img.src}
            name={img.name}
            size={img.size}
            date={new Date(img.createdAt).toLocaleDateString()}
            onDelete={() => handleDelete(img.path)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
