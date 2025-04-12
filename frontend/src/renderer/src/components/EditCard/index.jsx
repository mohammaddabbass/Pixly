import React, { useRef, useState } from 'react'
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
  const imgRef = useRef(null);

  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [watermark, setWatermark] = useState('');
  const [opacity, setOpacity] = useState(100);
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100, x: 0, y: 0 });

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
    filter: `
      brightness(${brightness}%) 
      contrast(${contrast}%) 
      saturate(${saturation}%) 
      grayscale(${grayscale}%)
    `,
    opacity: `${opacity}%`,
    transform: `rotate(${rotation}deg)`
  });
  const handleSave = async () => {
    try {
      if (!selected || !imgRef.current) {
        console.log('No file selected');
        return;
      }
  
      // Get the displayed image element
      const displayedImage = imgRef.current;
      
      // Create temporary image for original data
      const tempImage = new Image();
      tempImage.src = selected.src;
      
      await new Promise((resolve, reject) => {
        tempImage.onload = resolve;
        tempImage.onerror = reject;
      });
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      // Get dimensions
      const naturalWidth = tempImage.naturalWidth;
      const naturalHeight = tempImage.naturalHeight;
      const displayedWidth = displayedImage.offsetWidth;
      const displayedHeight = displayedImage.offsetHeight;
  
      // Calculate scale factors
      const scaleX = naturalWidth / displayedWidth;
      const scaleY = naturalHeight / displayedHeight;
  
      // Convert crop coordinates based on unit
      let pixelCrop;
      if (crop.unit === '%') {
        // Handle percentage-based crop (from sliders)
        pixelCrop = {
          x: (crop.x / 100) * naturalWidth,
          y: (crop.y / 100) * naturalHeight,
          width: (crop.width / 100) * naturalWidth,
          height: (crop.height / 100) * naturalHeight
        };
      } else {
        // Handle pixel-based crop (from manual selection)
        pixelCrop = {
          x: crop.x * scaleX,
          y: crop.y * scaleY,
          width: crop.width * scaleX,
          height: crop.height * scaleY
        };
      }
  
      // Ensure valid crop dimensions
      pixelCrop.x = Math.max(0, Math.min(pixelCrop.x, naturalWidth - 1));
      pixelCrop.y = Math.max(0, Math.min(pixelCrop.y, naturalHeight - 1));
      pixelCrop.width = Math.max(1, Math.min(pixelCrop.width, naturalWidth - pixelCrop.x));
      pixelCrop.height = Math.max(1, Math.min(pixelCrop.height, naturalHeight - pixelCrop.y));
  
      // Handle rotation
      const radians = (rotation * Math.PI) / 180;
      const isRotated = rotation % 180 !== 0;
  
      // Set canvas dimensions
      canvas.width = isRotated ? pixelCrop.height : pixelCrop.width;
      canvas.height = isRotated ? pixelCrop.width : pixelCrop.height;
  
      // Setup transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);
  
      // Apply filters
      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        grayscale(${grayscale}%)
        opacity(${opacity / 100})
      `;
  
      // Draw the image
      ctx.drawImage(
        tempImage,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      ctx.restore();
  
      // Verify canvas content
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData.data.every(pixel => pixel === 0)) {
        throw new Error('Canvas is empty - check crop dimensions');
      }
  
      // Convert to blob
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob || blob.size < 1024) {
            reject(new Error('Failed to create valid image blob'));
            return;
          }
          resolve(blob);
        }, 'image/jpeg', 0.9);
      });
  
      // Prepare for saving
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const ext = selected.name.split('.').pop() || 'jpg';
      const newFilename = `${selected.name.replace(/\.[^/.]+$/, '')}_edited_${Date.now()}.${ext}`;
  
      // Save image
      const savedImage = await window.electron.ipcRenderer.invoke('save-image', {
        name: newFilename,
        buffer
      });
  
      console.log('Successfully saved:', savedImage);
    } catch (err) {
      console.error('Save error:', err);
      // Add error handling UI feedback here
    }
  };
  if (!selected) {
    return <div>No image selected</div>;
  }

  return (
    <div className="edit-card flex ">
      <div className="image-edit">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCrop(c)}
        aspect={undefined}
        ruleOfThirds
        unit="px" // Add this line
      >
          <img 
            ref={imgRef}
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