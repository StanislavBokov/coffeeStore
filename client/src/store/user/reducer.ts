import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, orderState } from '../../types';
import localStorageService from '../../services/localStorage.service';

const initialState: UserState = localStorageService.getAccessToken()
  ? {
    auth: { userId: localStorageService.getUserId(), isAdmin: localStorageService.getRole() },
    isLoggedIn: true,
    orders: [],
    loading: false,
    successRequest: false
    
  }
  : {
    auth: null,
    isLoggedIn: false,
    orders: [],
    loading: false,
    successRequest: false
  };

export const UserReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    authRequestSuccess: (state, action: PayloadAction<{userId: string, isAdmin: string}>) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.auth = null;
      state.isLoggedIn = false;
      localStorageService.removeAuthData();
      localStorageService.removeAdminData();
    },
    fetchLoadingOrder: (state) => ({
      ...state,
      loading: true
    }),
    fetchOrdersSuccess: (state, action: PayloadAction<orderState[]>) => ({
      ...state,
      orders: action.payload,
      loading: false
    }),
    successReqest:(state, action: PayloadAction<boolean>) => ({
      ...state,
      successRequest:action.payload
    })
  }
});
export const { authRequestSuccess, userLoggedOut, fetchLoadingOrder, fetchOrdersSuccess, successReqest } = UserReducer.actions;
export default UserReducer.reducer;