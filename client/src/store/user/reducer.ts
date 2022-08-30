import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import localStorageService from '../../services/localStorage.service';

const initialState: UserState = localStorageService.getAccessToken()
  ? {
    auth: { userId: localStorageService.getUserId(), isAdmin: localStorageService.getRole() },
    isLoggedIn: true
  }
  : {
    auth: null,
    isLoggedIn: false
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
    }
  }
});
export const { authRequestSuccess, userLoggedOut } = UserReducer.actions;
export default UserReducer.reducer;