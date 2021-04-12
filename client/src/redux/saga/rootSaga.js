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
import deleteMailSagaWatcher from './users/deleteMailSagaWatcher';
<<<<<<< HEAD
import editUserSagaWatcher from './users/editUserSagaWatcher';
=======
import addUserSagaWatcher from './user/addUserSagaWatcher';
>>>>>>> 29f1aed8d19753bf728cbc92874c1dbe2b68943a

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
    deleteMailSagaWatcher(),
<<<<<<< HEAD
    editUserSagaWatcher(),
=======
    addUserSagaWatcher(),
>>>>>>> 29f1aed8d19753bf728cbc92874c1dbe2b68943a
  ])
};
