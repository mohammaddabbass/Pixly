import { configureStore } from '@reduxjs/toolkit';
import { imageSlice } from '../features/imageSlice';

export default configureStore({
  reducer: {
    images: imageSlice.reducer,
  }
})