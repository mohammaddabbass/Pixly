import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.css'
import ImageCard from '../../components/ImageCard'
const Home = () => {
  return (
    <div className="page flex column">
      <Header />
      <div className="page-content image-gallery">
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
      </div>
      <Footer />
    </div>
  )
}

export default Home
