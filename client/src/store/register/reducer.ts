import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterState } from '../../types';
// import { useNavigation } from '../../utils/navigate';

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
      ...state, errorMessage: action.payload
    }),
    // successRegister: (state, action:PayloadAction<boolean>) => ({
    //   ...state, successRegister: action.payload
    // }),
    successRegister: (state, action:PayloadAction<boolean>) => {
      state.successRegister = action.payload;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // useNavigation('/');

    },
    isLoading: (state, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    })
    // signUp: (state, action:PayloadAction<RegisterState>) => ({
    //   ...state,
    //   ...action.payload
    // }),

  }
});

export const { errorRegister, successRegister, isLoading } = RegisterReducer.actions;
export default RegisterReducer.reducer;