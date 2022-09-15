import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterState } from '../../types';

const initialState: RegisterState = {
  errorMessage: '',
  successRegister: false,
  loading: false
};

export const RegisterReducer = createSlice({
  name: 'register',
  initialState,
  reducers: {

    errorRegister: (state, action: PayloadAction<string>) => ({
      ...state, 
      errorMessage: action.payload,
      loading: false

    }),
    isLoading: (state, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    })
  }
});

export const { errorRegister, isLoading } = RegisterReducer.actions;
export default RegisterReducer.reducer;