import { refreshAction } from './../store/refresh/action';
import { useDispatch } from 'react-redux';
import axios from "axios";
import localStorageService from './localStorage.service';

axios.interceptors.request.use( async (config) => {
  const expiresDate = localStorageService.getTokenExpiresDate();
  const refreshToken = localStorageService.getRefreshToken();
  const isExpired = refreshToken && Number(expiresDate) < Date.now(); 
  const dispatch = useDispatch();
  // if (isExpired) {
  //   dispatch(refreshAction());
  // }
  dispatch(refreshAction());

  const accessToken = localStorageService.getAccessToken();
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return config;
});

axios.interceptors.response.use((res) => { 
  res.data = { content: res.data };
  return res;
}
 
);