import { takeLatest, put,delay } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios, { AxiosResponse } from 'axios';
import { removeLotAction } from '../actions';
import { successRemove } from '../reducer';
import { fetchCofeeSuccess } from '../../coffee/reducer';

export function* removeLotWorker({ payload }: ReturnType<typeof removeLotAction>) {
  try {

    const { data } = yield axios.delete(`http://localhost:5566/api/coffee`, {
      data: {
        id: payload
      }
    });
    yield put(fetchCofeeSuccess(data));
    yield put(successRemove(true))
    yield delay(2000)
    yield put(successRemove(false))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.REMOVE_LOT, removeLotWorker);

}
