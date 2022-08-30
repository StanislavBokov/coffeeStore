import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '../../types';

const initialState:ModalState = {
  isModalRegister: false,
  isModalBought: false
};

export const ModalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalRegister: (state, action:PayloadAction<boolean>) => ({
      ...state,
      isModalRegister: action.payload
    }),
    setModalBought: (state, action:PayloadAction<boolean>) => ({
      ...state,
      isModalBought: action.payload
    })
  }
});
export const { setModalRegister, setModalBought } = ModalReducer.actions;
export default ModalReducer.reducer;