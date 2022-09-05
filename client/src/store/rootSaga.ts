import { fork } from "@redux-saga/core/effects";

import fetchCoffeeSaga from './coffee/sagas/fetchCoffee';
import buyCoffeeSaga from './basket/sagas/buyCoffee';
import  removeCoffeeItemSaga from "./basket/sagas/removeCoffeeItem";
import registerUserWorker from './register/sagas/registerUser';
import signInUserWorker from "./signIn/sagas/signIn";
import fetchBasketSaga from './basket/sagas/fetchItemsInBasket';
import refreshSaga from "./refresh/saga/refresh";
import removeLotSaga from './admin/saga/removeLot';
import upDateLotSaga from "./admin/saga/upDateLot";
import addLotSaga from './admin/saga/addLot'
import uploadedFilesSaga from "./admin/saga/uploadFiles";
import setAvailabilityLotSaga from "./admin/saga/setAvailabilityLot";
import todoOrderSaga from "./user/sagas/todoOrder";

export default function* rootSaga() {
  yield fork(buyCoffeeSaga);
  yield fork(fetchCoffeeSaga);
  yield fork(removeCoffeeItemSaga);
  yield fork(registerUserWorker);
  yield fork(signInUserWorker);
  yield fork(fetchBasketSaga);
  yield fork(refreshSaga);
  yield fork(removeLotSaga);
  yield fork(upDateLotSaga);
  yield fork(addLotSaga);
  yield fork(uploadedFilesSaga);
  yield fork(setAvailabilityLotSaga);
  yield fork(todoOrderSaga);
}