import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import localStorageService from '../../../services/localStorage.service';
import axios, { AxiosResponse } from 'axios';

export function* refreshWorker() {
  try {    
    const { data } = yield axios.post(`http://localhost:5566/api/auth/token`, {
      grant_type: "refreshToken",
      refreshToken: localStorageService.getRefreshToken()
    });
    localStorageService.setTokens(data);
    console.log('TESTETTST');
    
    // yield put(fetchCofeeSuccess(data.data));

  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.REFRESH, refreshWorker);

}
