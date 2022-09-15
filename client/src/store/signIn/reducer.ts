import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { errorMessage: string, successRegister: boolean, loading: boolean } = {
  errorMessage: '',
  successRegister: false,
  loading: false
};

export const RegisterReducer = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    errorsignIn: (state, action: PayloadAction<string>) => ({
      ...state, errorMessage: action.payload
    }),
    successSignIn: (state, action:PayloadAction<boolean>) => ({
      ...state, successRegister: action.payload
    }),
    isLoading: (state, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    })
  }
});

export const { errorsignIn, successSignIn, isLoading } = RegisterReducer.actions;
export default RegisterReducer.reducer;