import { all } from 'redux-saga/effects';
import editClientSagaWatcher from './client/editClientSagaWatcher';
import addClientSagaWatcher from './client/addClientSagaWatcher';
import showClientSagaWatcher from './client/showClientSagaWatcher';
import showAllClientsSagaWatcher from './clients/showAllClientsSagaWatcher';
import addOrderSagaWatcher from './order/addOrderSagaWatcher';
import showOrderSagaWatcher from './order/showOrderSagaWatcher';
import showAllOrdersSagaWatcher from './orders/showAllOrdersSagaWatcher';
import deleteClientSagaWatcher from './client/deleteClientSagaWatcher';
import deleteOrderSagaWatcher from './order/deleteOrderSagaWatcher';
import addCommentToClientSagaWatcher from './client/addCommentToClientSagaWatcher';
import addCommentToOrderSagaWatcher from './order/addCommentToOrderSagaWatcher';
import editOrderSagaWatcher from './order/editOrderSagaWatcher';
import searchClientSagaWatcher from './client/searchClientSagaWatcher';
import searchOrderSagaWatcher from './order/searchOrderSagaWatcher';
import findClientsForOrderSagaWatcher from './order/findClientsForOrderSagaWatcher';

export default function* rootSaga() {
  yield all([
    showClientSagaWatcher(),
    showAllClientsSagaWatcher(),
    showOrderSagaWatcher(),
    addOrderSagaWatcher(),
    editClientSagaWatcher(),
    editOrderSagaWatcher(),
    showAllOrdersSagaWatcher(),
    addClientSagaWatcher(),
    deleteClientSagaWatcher(),
    deleteOrderSagaWatcher(),
    addCommentToClientSagaWatcher(),
    addCommentToOrderSagaWatcher(),
    searchClientSagaWatcher(),
    searchOrderSagaWatcher(),
    findClientsForOrderSagaWatcher()
  ])
};
