/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState } from '../../types';
const initialState:AdminState = {
  images: [],
  uploaded: false,
  loading: false,
  successReqest: false,
  successRemove: false
};

export const AdminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    uploadFies: (state, action: PayloadAction<string[]>) => ({
      ...state,
      images: [...action.payload],
      uploaded:true
    }),
    uploadedFalse: (state) => ({
      ...state,
      uploaded: false
    }),
    loading:(state, action: PayloadAction<boolean>) => ({
      ...state,
      loading:action.payload
    }),
    successReqest:(state, action: PayloadAction<boolean>) => ({
      ...state,
      successReqest:action.payload
    }),
    successRemove: (state, action: PayloadAction<boolean>) => ({
      ...state,
      successRemove: action.payload
    })
  }
});
export const { uploadFies, uploadedFalse, loading, successReqest, successRemove } = AdminReducer.actions;
export default AdminReducer.reducer;