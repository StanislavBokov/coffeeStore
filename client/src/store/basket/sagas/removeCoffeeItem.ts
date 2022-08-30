import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionsTypes';

import { removeCoffeeItemAction } from '../actions';
import axios, { AxiosResponse } from 'axios';
import { removeCoffee } from '../reducer';

export function* removeCoffeeItemWorker({ payload }: ReturnType<typeof removeCoffeeItemAction>) {
  try {
   
    const { data } = yield axios.delete(`http://localhost:5566/api/basket`, {
      data: {
        ...payload
      }
    });
 
    yield put(removeCoffee(data.product));
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.REMOVE_COFFEEITEM, removeCoffeeItemWorker);

}
