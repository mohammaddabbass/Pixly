import React from 'react'
import './styles.css'
import Button from '../Button'
import RotateButton from '../RotateButton'
import { RotateCcw, RotateCw } from 'lucide-react'
import ToggleButton from '../toggleButton'
import InputGroup from '../InputGroup'
import SelectGroup from '../SelectGroup'
import { useSelector } from 'react-redux'

const EditCard = () => {
  const {selected} = useSelector((state) => state.images);

  console.log(selected)
  return (
    <div className="edit-card flex ">
      <div className="image-edit">
        <img src={selected.src} alt="Uploaded content" className="card-image" />
      </div>
      <div className="edit-options flex column justify-evenly">
        <h2>Edit</h2>
        <div className="rotate-buttons flex ">
          <RotateButton buttonText={<RotateCcw />} />
          <RotateButton buttonText={<RotateCw />} />
        </div>
        <SelectGroup
          label="Image Size"
          name="imageSize"
          options={[
            { label: 'Free (Low Quality)', value: 'free' },
            { label: 'Small (640x480)', value: 'small' },
            { label: 'Medium (1280x720)', value: 'medium' },
            { label: 'Large (1920x1080)', value: 'large' },
            { label: 'Original (Full Size)', value: 'original' }
          ]}
          placeholder="Select image size"
          onChange={(e) => setSelectedSize(e.target.value)}
        />{' '}
        <InputGroup label={'Watermark'} placeholder={'Add a watermark'} />
        <div className="opacity-slider">
          <InputGroup label={'Opacity'} type={'range'} />
        </div>
        <ToggleButton />
        <div className="edit-buttons flex justify-between">
          <Button variant="cancel" buttonText={'Cancel'} />
          <Button buttonText={'Save'} />
        </div>
      </div>
    </div>
  )
}

export default EditCard
