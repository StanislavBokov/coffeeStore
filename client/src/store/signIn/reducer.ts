import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { errorMessage: string, successRegister: boolean } = {
  errorMessage: '',
  successRegister: false
  // userId: ''
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
    })
  }
});

export const { errorsignIn, successSignIn } = RegisterReducer.actions;
export default RegisterReducer.reducer;