import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
// import { fetchCoffeeInBasket } from '../reducer';
// import { removeCoffeeItemAction } from '../actions';
import axios, { AxiosResponse } from 'axios';
import { removeLotAction } from '../actions';
// import { removeCoffee } from '../reducer';
import { fetchCofeeSuccess } from '../../coffee/reducer';
// import localStorageService from '../../../services/localStorage.service';
// import localStorageCoffeeService from '../../../services/localStorageCoffee.service';

export function* removeLotWorker({ payload }: ReturnType<typeof removeLotAction>) {
  try {
    // console.log(payload);
    console.log(payload);
    
    const { data } = yield axios.delete(`http://localhost:5566/api/coffee`, {
      data: {
        id: payload
      }
    });
    console.log(data);
    
    yield put(fetchCofeeSuccess(data));
 
    // yield put(removeCoffee(data.product));
    // localStorageCoffeeService.setCoffee(data);
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.REMOVE_LOT, removeLotWorker);

}
