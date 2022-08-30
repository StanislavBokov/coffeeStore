import { takeLatest } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';

import axios from 'axios';
import { buyCoffeeAction } from '../actions';

export function* buyCoffeeWorker({ payload }: ReturnType<typeof buyCoffeeAction>) {
  try {
    const { data } = yield axios.post('http://localhost:5566/api/basket', {
      userId: payload.userId,
      product: payload.product
    });

  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.BUY_COFFEE, buyCoffeeWorker);

}
