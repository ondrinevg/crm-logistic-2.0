import { all } from 'redux-saga/effects';
import showClientSagaWatcher from './client/showClientSagaWatcher';
import showAllClientsSagaWatcher from './clients/showAllClientsSagaWatcher';
import addOrderSagaWatcher from './order/addOrderSagaWatcher';
import showOrderSagaWatcher from './order/showOrderSagaWatcher';
import showAllOrdersSagaWatcher from './orders/showAllOrdersSagaWatcher';

export default function* rootSaga() {
  yield all([
    showClientSagaWatcher(),
    showAllClientsSagaWatcher(),
    showOrderSagaWatcher(),
    addOrderSagaWatcher(),
    showAllOrdersSagaWatcher(),
  ])
};
