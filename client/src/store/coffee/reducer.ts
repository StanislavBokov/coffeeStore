/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoffeeState, CoffeeItem } from '../../types';

const initialState:CoffeeState = {
  coffee: [],
  loading: false,
  error: ''
};

export const CoffeeReducer = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    fetchLoading: (state) => ({
      ...state,
      loading:true
    }),
    fetchCofeeSuccess: (state, action:PayloadAction<CoffeeItem[]>) => ({
      ...state,
      coffee: action.payload,
      loading: false
    }),
    fetchCoffeeError: (state, action: PayloadAction<string>) => ({
      ...state, 
      error: action.payload,
      loading: false
    })
  }
});
export const { fetchCofeeSuccess, fetchLoading, fetchCoffeeError } = CoffeeReducer.actions;
export default CoffeeReducer.reducer;