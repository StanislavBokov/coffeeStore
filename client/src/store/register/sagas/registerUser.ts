import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';
import { registerUserAction } from '../actions';
import { errorRegister, successRegister, isLoading } from '../reducer';
import axios, { AxiosError } from 'axios';
import localStorageService from '../../../services/localStorage.service';
import { authRequestSuccess } from '../../user/reducer';

export function* registerUserWorker({ payload }: ReturnType<typeof registerUserAction>) {

  try {

    yield put(isLoading(true));

    const { data } = yield axios.post('http://localhost:5566/api/auth/signUp', {
      name: payload.name,  
      email: payload.email,
      password: payload.password
    });
    localStorageService.setTokens({ 
      accessToken:data.accessToken,
      refreshToken:data.refreshToken,
      userId:data.userId,
      expiresIn:data.expiresIn
    });

    yield put(authRequestSuccess({ userId: data.userId, isAdmin: data.isAdmin }));
    
    yield put(isLoading(false));
    yield put(errorRegister(''));
    yield put(successRegister(true));
    yield delay(3000);
    yield put(successRegister(false));

  } catch (err) {
    if(err instanceof AxiosError){
      yield put(errorRegister(err.response?.data.errorMessage));
      
    }
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.REGISTER_USER, registerUserWorker);

}
