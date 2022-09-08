import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import { fetchSuccessAllOrders } from '../reducer';
import { deliveredOrderAction } from '../actions';
import axios, { AxiosResponse } from 'axios';

export function* deliveredOrderWorker({ payload }: ReturnType<typeof deliveredOrderAction>) {
  try {

    const { data } = yield axios.put(`http://localhost:5566/api/orders`, {
      ...payload
    });
    yield put(fetchSuccessAllOrders(data.allOrders[0].orders))
        
  } catch (err) {
    console.error(err);  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.DELIVERED_ORDER, deliveredOrderWorker);

}
