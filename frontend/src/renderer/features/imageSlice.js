import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
    name: 'image',

    initialState: {
        images: [],
    },

    reducers: {
        fetchImages: state => {},
        uploadImage: state => {},
        deleteImage: state => {},
        editImage: state => {},
    }

});

export const {fetchImages, uploadImage, deleteImage, editImage} = imageSlice.actions;
export default imageSlice.reducer;