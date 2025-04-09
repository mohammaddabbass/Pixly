import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    images: [], 
    loading: false,
};

export const imageSlice = createSlice({
    name: 'image',
    initialState,

    reducers: {
        // Action to start loading images
        setLoading: (state) => {
          state.loading = true;
        },
    
        // Action to set images
        setImages: (state, action) => {
          const images = action.payload;

          return {
            ...state,
            loading: false,
            images: images
          }
        },
    
        // Action to add a new image
        addImage: (state, action) => {
          const newImage = action.payload;
          const updated = [newImage, ...state.images ];

          return {
            ...state,   
            loading: false,
            images: updated
          }
        },
    
        // Action to delete an image
        removeImage: (state, action) => {
          const removed = action.payload;
          const updated = state.images.filter((image) => image.path != removed.path);

          return {
            ...state,
            loading: false,
            images: updated
          }
        },

        // Action to edit an image
        editImage: state => {},
    }

});

export const { setLoading, setImages, addImage, removeImage, editImage } = imageSlice.actions;
export default imageSlice.reducer;