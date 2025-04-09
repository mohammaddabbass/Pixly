import React from 'react'
import './styles.css'

const ToggleButton = () => {
  return (
    <div className='toggle-button'>
    <h3>Black & White</h3>
    <label className="switch">
      <input type="checkbox"></input>
      <span className="slider round"></span>
    </label>
    </div>
  )
}

export default ToggleButton
