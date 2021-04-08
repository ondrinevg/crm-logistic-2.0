import { all } from 'redux-saga/effects';
import showClientSaga from './client/showClientSaga';
import showAllClientsSaga from './clients/showAllClientsSaga';
import showOrderSaga from './order/showOrderSaga';
import showAllOrdersSaga from './orders/showAllOrdersSaga';

export default function* rootSaga() {
  yield all([
    showClientSaga(),
    showAllClientsSaga(),
    showOrderSaga(),
    showAllOrdersSaga(),
  ])
};
