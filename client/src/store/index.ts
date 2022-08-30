
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ModalReducer from './modal/reducer';
import RegisterReducer from './register/reducer';
import CoffeeReducer from './coffee/reducer';
import signInReducer from './signIn/reducer';
import BasketReducer from './basket/reducer';
import UserReducer from './user/reducer';
import AdminReducer from './admin/reducer';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    modal: ModalReducer,
    register: RegisterReducer,
    signIn: signInReducer,
    coffee: CoffeeReducer,
    basket: BasketReducer,
    user: UserReducer,
    admin: AdminReducer
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(sagaMiddleware)
});
export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(rootSaga);

export default store;