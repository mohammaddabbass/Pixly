import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.css'
import ImageCard from '../../components/ImageCard'
const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.electronAPI.getSavedImages().then((paths) => {
      setImages(paths);
      console.log(images);
    });
  }, []);

  return (
    <div className="page flex column">
      <Header />
      <div className="page-content image-gallery">
        {images.map((imgPath, idx) => (
          <ImageCard key={idx}
          src={`${imgPath}`}/>
          // console.log(imgPath);

))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
