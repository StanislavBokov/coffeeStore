import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import { fetchSuccessAllOrders } from '../reducer';
import axios, { AxiosResponse } from 'axios';

export function* fetchAllOrdersWorker() {
  try {

    const { data } = yield axios.get(`http://localhost:5566/api/orders`);
    console.log(data);
    
    yield put(fetchSuccessAllOrders(data[0].orders))
    
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.FETCH_ALL_ORDERS, fetchAllOrdersWorker);

}
