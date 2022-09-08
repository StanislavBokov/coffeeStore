import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';
import { todoOrderAction } from '../actions';
import { fetchBasketSuccess } from '../../basket/reducer';
import { fetchSuccessAllOrders } from '../../admin/reducer';
import { fetchLoadingOrder, fetchOrdersSuccess, successReqest } from '../reducer';
import axios, { AxiosError } from 'axios';

export function* todoOrderWorker({ payload }: ReturnType<typeof todoOrderAction>) {
  try {
      
    yield put(fetchLoadingOrder());
    const { data } = yield axios.post('http://localhost:5566/api/orders', {
      ...payload
    });
    yield axios.post('http://localhost:5566/api/basket/clearBasket', {
      userId: payload.id
    });
    yield put(fetchBasketSuccess([]))
    yield put(fetchOrdersSuccess(data.userOrders));
    yield put(fetchSuccessAllOrders(data.allOrders))
    yield put(successReqest(true))
    yield delay(2000)
    yield put(successReqest(false))

  } catch (err) {
    if(err instanceof AxiosError) {
    //   yield put(fetchCoffeeError(err.message))
    }
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.TODO_ORDER, todoOrderWorker);

}
