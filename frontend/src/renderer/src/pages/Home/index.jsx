import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';
import ImageCard from '../../components/ImageCard';
import { setLoading, setImages, removeImage } from '../../../features/imageSlice';


const Home = () => {
  const dispatch = useDispatch();
  const { images, loading } = useSelector((state) => state.images);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchImages = async () => {
    dispatch(setLoading());
    const imageData = await window.electronAPI.getSavedImages();
    console.log(imageData);
    dispatch(setImages(imageData));
  };

  useEffect(() => {
    console.log("hello")
    fetchImages();
  }, []);

  const handleDelete = async (imagePath) => {
    const res = await window.electronAPI.deleteImage(imagePath);
    if (res.success) {
      dispatch(removeImage({ path: imagePath }));
    } else {
      console.error(res.error);
    }
  };

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="page flex column">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="page-content image-gallery">
        {filteredImages?.map((img, idx) => (
          <ImageCard
          image={img}
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
