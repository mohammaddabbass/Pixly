// Navbar.jsx
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import './styles.css';
import InputGroup from '../InputGroup';
import Button from '../Button';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav className="navbar flex justify-between align-center">
      <div className="navbar-left flex align-center">
        <Camera color="#9B72E8" size={30} />
        <div className="logo">Pixly</div>

      </div>
        <button className="nav-link">Home</button>

        <InputGroup type={'text'} placeholder={"Search images..."}/>

      <div className="navbar-right flex align-center">
        <Button buttonText={"Upload"}/>
        <div className="user-avatar flex align-center justify-center">MA</div>
      </div>
    </nav>
  );
};

export default Header;