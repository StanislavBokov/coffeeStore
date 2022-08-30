import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';
import { fetchLoading, fetchBasketSuccess, fetchBasketError } from '../reducer';
import { fetchBasketAction } from '../actions';
import axios, { AxiosError } from 'axios';
import localStorageService from '../../../services/localStorage.service';

export function* fetchBasketWorker({ payload }: ReturnType<typeof fetchBasketAction>) {
  try {
    yield put(fetchLoading())
    const { data } = yield axios.get(`http://localhost:5566/api/basket/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`
      }
    });
    yield put(fetchBasketSuccess(data.product));

  } catch (err) {
    if(err instanceof AxiosError) {
      yield put(fetchBasketError(err.message))
    }
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.FETCHING_BASKET, fetchBasketWorker);

}
