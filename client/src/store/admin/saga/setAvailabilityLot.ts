import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios, { AxiosResponse } from 'axios';
import { fetchCofeeSuccess } from '../../coffee/reducer';
import { setAvailabilityLotAction } from '../actions';

export function* setAvailabilityLotWorker({ payload }: ReturnType<typeof setAvailabilityLotAction>) {
  try {
    
    const { data } = yield axios.put(`http://localhost:5566/api/coffee/setAvailabilityLot`, {
      id: payload
    });
    yield put(fetchCofeeSuccess(data));
    
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.SET_AVAILABILITY_LOT, setAvailabilityLotWorker);

}
