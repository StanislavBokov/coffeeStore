/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState } from '../../types/store/basket';

const initialState:BasketState = {
  basket:[],
  loading: false,
  error: ''
};

export const BasketReducer = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    fetchLoading: (state) => ({
      ...state,
      loading:true
    }),
    fetchBasketSuccess: (state, action) => ({
      ...state,
      basket: action.payload,
      loading: false
    }),
    fetchBasketError: (state, action: PayloadAction<string>) => ({
      ...state, 
      error: action.payload,
      loading: false
    }),
    removeCoffee: (state, action) => ({
      ...state,
      basket: [...action.payload]
    })
  }
});
export const { fetchLoading, fetchBasketSuccess, fetchBasketError , removeCoffee } = BasketReducer.actions;
export default BasketReducer.reducer;