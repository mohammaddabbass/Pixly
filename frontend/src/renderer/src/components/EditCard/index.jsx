import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './styles.css'
import Button from '../Button'
import RotateButton from '../RotateButton'
import { RotateCcw, RotateCw } from 'lucide-react'
import ToggleButton from '../toggleButton'
import InputGroup from '../InputGroup'
import { useSelector } from 'react-redux'

const EditCard = () => {
  const { selected } = useSelector((state) => state.images);
  
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [watermark, setWatermark] = useState('');
  const [opacity, setOpacity] = useState(100);
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100 });

  const handleRotation = (angle) => {
    setRotation(prev => prev + angle);
  };

  const handleReset = () => {
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
    setOpacity(100);
    setCrop({ unit: '%', width: 100, height: 100 });
  };

  const getImageStyle = () => ({
    transform: `rotate(${rotation}deg)`,
    filter: `
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      saturate(${saturation}%) 
      grayscale(${grayscale}%)
    `,
    opacity: `${opacity}%`
  });

  const handleSave = () => {
    console.log('Image saved with settings:', {
      rotation,
      brightness,
      contrast,
      saturation,
      grayscale,
      watermark,
      opacity,
      crop
    });
  };

  if (!selected) {
    return <div>No image selected</div>;
  }

  return (
    <div className="edit-card flex ">
      <div className="image-edit">
        <ReactCrop
          crop={crop}
          onChange={c => setCrop(c)}
          aspect={undefined}
        >
          <img 
            src={selected.src} 
            alt="Uploaded content" 
            className="card-image" 
            style={getImageStyle()}
          />
        </ReactCrop>
      </div>
      <div className="edit-options flex column justify-evenly">
        <h2>Edit</h2>
        
        <div className="crop-controls">
          <InputGroup
            label="Crop Width (%)"
            type="range"
            min="10"
            max="100"
            value={crop.width}
            onChange={e => setCrop(prev => ({ ...prev, width: Number(e.target.value) }))}
          />
          <InputGroup
            label="Crop Height (%)"
            type="range"
            min="10"
            max="100"
            value={crop.height}
            onChange={e => setCrop(prev => ({ ...prev, height: Number(e.target.value) }))}
          />
        </div>

        <div className="rotate-buttons flex ">
          <RotateButton buttonText={<RotateCcw />} onClick={() => handleRotation(-90)} />
          <RotateButton buttonText={<RotateCw />} onClick={() => handleRotation(90)} />
        </div>
        
        {/* <InputGroup 
          label={'Watermark'} 
          placeholder={'Add a watermark'} 
          value={watermark}
          onChange={(e) => setWatermark(e.target.value)}
        /> */}
        
        <div className="opacity-slider">
          <InputGroup 
            label={`Opacity (${opacity}%)`} 
            type={'range'} 
            value={opacity}
            max="100"
            onChange={(e) => setOpacity(Number(e.target.value))}
          />
        </div>
        
        <div className="contrast-slider">
          <InputGroup 
            label={`Contrast (${contrast}%)`} 
            type={'range'} 
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
        </div>
        
        <div className="brightness-slider">
          <InputGroup 
            label={`Brightness (${brightness}%)`} 
            type={'range'} 
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </div>

        {/* <div className="saturation-slider">
          <InputGroup 
            label={`Saturation (${saturation}%)`} 
            type={'range'} 
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
          />
        </div> */}
        
        <ToggleButton 
          checked={grayscale > 0}
          onChange={(e) => setGrayscale(e.target.checked ? 100 : 0)}
        />
        
        <div className="edit-buttons flex justify-between">
          <Button variant="cancel" buttonText={'Reset'} onClick={handleReset} />
          <Button buttonText={'Save'} onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default EditCard