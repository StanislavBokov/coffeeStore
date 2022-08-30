import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';
import { signInAction } from '../actions';
import { errorsignIn } from '../reducer';
import { setModalRegister } from '../../modal/reducer';
import { authRequestSuccess } from '../../user/reducer';
import axios, { AxiosError } from 'axios';
import localStorageService from '../../../services/localStorage.service';

export function* signInUserWorker({ payload }: ReturnType<typeof signInAction>) {
  try {

    const { data } = yield axios.post('http://localhost:5566/api/auth/signInWithPassword', {
      email: payload.email,
      password: payload.password
    });;

    localStorageService.setTokens({ 
      accessToken:data.accessToken,
      refreshToken:data.refreshToken,
      userId:data.userId,
      expiresIn:data.expiresIn
    });
    localStorageService.setIsAdmin(data.isAdmin);
    yield put(authRequestSuccess({ userId: data.userId, isAdmin: data.isAdmin }));
    
    yield put(errorsignIn(''));
    yield put(setModalRegister(false));

  } catch (err) {
    if(err instanceof AxiosError){
      yield put(errorsignIn(err.response?.data.error?.message));
      yield delay(3000);
      yield put(errorsignIn(''));
        
    }
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.SIGNI_IN, signInUserWorker);
}
