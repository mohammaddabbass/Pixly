import React from 'react';
import './styles.css'
import Button from '../Button';

const EditCard = () => {
    return (
        <div className='edit-card flex '>
            <div className="image-edit">
                <img src="https://picsum.photos/400/300" alt="Uploaded content" className="card-image" />
            </div>
            <div className="edit-options flex column justify-between">
                <h2>Edit</h2>

                <div className="edit-buttons flex justify-between">
                    <Button variant='cancel' buttonText={'Cancel'}/>
                    <Button buttonText={'Save'}/>
                </div>
            </div>
        </div>
    );
};

export default EditCard;