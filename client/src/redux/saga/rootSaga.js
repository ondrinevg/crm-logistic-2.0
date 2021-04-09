import { all } from 'redux-saga/effects';
import editClientSagaWatcher from './client/editClientSagaWatcher';
import addClientSagaWatcher from './client/addClientSagaWatcher';
import showClientSagaWatcher from './client/showClientSagaWatcher';
import showAllClientsSagaWatcher from './clients/showAllClientsSagaWatcher';
import addOrderSagaWatcher from './order/addOrderSagaWatcher';
import showOrderSagaWatcher from './order/showOrderSagaWatcher';
import showAllOrdersSagaWatcher from './orders/showAllOrdersSagaWatcher';
import deleteClientSagaWatcher from './client/deleteClientSagaWatcher';

export default function* rootSaga() {
  yield all([
    showClientSagaWatcher(),
    showAllClientsSagaWatcher(),
    showOrderSagaWatcher(),
    addOrderSagaWatcher(),
    editClientSagaWatcher(),
    showAllOrdersSagaWatcher(),
    addClientSagaWatcher(),
    deleteClientSagaWatcher(),
  ])
};
