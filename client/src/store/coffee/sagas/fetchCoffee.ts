import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';
import { fetchCofeeSuccess, fetchLoading, fetchCoffeeError } from '../reducer';
import axios, { AxiosError } from 'axios';

export function* fetchCoffeeWorker() {
  try {
    yield put(fetchLoading());
    const { data } = yield axios.get('http://localhost:5566/api/coffee');
    yield put(fetchCofeeSuccess(data));

  } catch (err) {
    if(err instanceof AxiosError) {
      yield put(fetchCoffeeError(err.message))
    }
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.FETCHING_COFFEE, fetchCoffeeWorker);

}
