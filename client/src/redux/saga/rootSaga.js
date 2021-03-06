import { all } from 'redux-saga/effects';
import addClientSagaWatcher from './client/addClientSagaWatcher';
import addOrderSagaWatcher from './order/addOrderSagaWatcher';
import showClientSagaWatcher from './client/showClientSagaWatcher';
import showAllClientsSagaWatcher from './clients/showAllClientsSagaWatcher';
import showOrderSagaWatcher from './order/showOrderSagaWatcher';
import showAllOrdersSagaWatcher from './orders/showAllOrdersSagaWatcher';
import deleteClientSagaWatcher from './client/deleteClientSagaWatcher';
import deleteOrderSagaWatcher from './order/deleteOrderSagaWatcher';
import addCommentToClientSagaWatcher from './client/addCommentToClientSagaWatcher';
import addCommentToOrderSagaWatcher from './order/addCommentToOrderSagaWatcher';
import editClientSagaWatcher from './client/editClientSagaWatcher';
import editOrderSagaWatcher from './order/editOrderSagaWatcher';
import searchClientSagaWatcher from './client/searchClientSagaWatcher';
import searchOrderSagaWatcher from './order/searchOrderSagaWatcher';
import findClientsForOrderSagaWatcher from './order/findClientsForOrderSagaWatcher';
import showUsersSagaWatcher from './users/showUsersSagaWatcher';
import initUserSagaWatcher from './user/initUserSaga';
import addImageToOrderSagaWatcher from './order/addImageToOrderSagaWatcher'
import deleteMailSagaWatcher from './users/deleteMailSagaWatcher';
import editUserSagaWatcher from './users/editUserSagaWatcher';
import addUserSagaWatcher from './user/addUserSagaWatcher';
import editEventSagaWatcher from './event/editEventSagaWatcher';
import getEventsSagaWatcher from './events/getEventsSagaWatcher';
import addEventSagaWatcher from './event/addEventSagaWatcher';

export default function* rootSaga() {
  yield all([
    showClientSagaWatcher(),
    showOrderSagaWatcher(),
    editClientSagaWatcher(),
    editOrderSagaWatcher(),
    showAllClientsSagaWatcher(),
    showAllOrdersSagaWatcher(),
    addClientSagaWatcher(),
    addOrderSagaWatcher(),
    deleteClientSagaWatcher(),
    deleteOrderSagaWatcher(),
    addCommentToClientSagaWatcher(),
    addCommentToOrderSagaWatcher(),
    searchClientSagaWatcher(),
    searchOrderSagaWatcher(),
    findClientsForOrderSagaWatcher(),
    showUsersSagaWatcher(),
    initUserSagaWatcher(),
    addImageToOrderSagaWatcher(),
    deleteMailSagaWatcher(),
    editUserSagaWatcher(),
    addUserSagaWatcher(),
    editEventSagaWatcher(),
    getEventsSagaWatcher(),
    addEventSagaWatcher(),
  ])
};
