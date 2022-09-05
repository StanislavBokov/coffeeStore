import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios, { AxiosResponse } from 'axios';
import { addLotAction } from '../actions';
import { fetchCofeeSuccess } from '../../coffee/reducer';
import { loading, successReqest } from '../reducer';

export function* addLotWorker({ payload }: ReturnType<typeof addLotAction>) {
  try {
    yield put(loading(true))
    const { data } = yield axios.post(`http://localhost:5566/api/coffee/addLot`, payload);
    yield put(fetchCofeeSuccess(data))
    yield put(successReqest(true))
    yield put(loading(false))
    yield delay(2000)
    yield put(successReqest(false))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.ADD_LOT, addLotWorker);

}
