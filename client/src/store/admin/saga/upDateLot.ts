import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
// import { fetchCoffeeInBasket } from '../reducer';
// import { removeCoffeeItemAction } from '../actions';
import axios, { AxiosResponse } from 'axios';
import { upDateLotAction } from '../actions';
// import { removeCoffee } from '../reducer';
import { fetchCofeeSuccess } from '../../coffee/reducer';
// import localStorageService from '../../../services/localStorage.service';
// import localStorageCoffeeService from '../../../services/localStorageCoffee.service';

export function* upDateLotWorker({ payload }: ReturnType<typeof upDateLotAction>) {
  try {
   
    console.log(payload.formData);
    
    // const { data } = yield axios.post(`http://localhost:5566/api/coffee/test`, {
    //   ...payload
    // });

    // console.log(data);
    
    // yield put(fetchCofeeSuccess(data));
 
    // yield put(removeCoffee(data.product));
    // localStorageCoffeeService.setCoffee(data);
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.UPDATE_LOT, upDateLotWorker);

}
