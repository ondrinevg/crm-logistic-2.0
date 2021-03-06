import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_ALL_ORDERS_SAGA } from '../../types/ordersTypes'
import { showAllOrders } from '../../actionCreators/ordersAC'
import { changeLoadStatus } from '../../actionCreators/loadAC';

const getAllOrdersFromServer = () => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/`, {
    credentials: 'include',
  })
    .then(response => response.json())
};

function* ordersSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const orders = yield call(getAllOrdersFromServer, action.payload);
    yield put(showAllOrders(orders));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showAllOrdersSagaWatcher() {
  yield takeLatest(SHOW_ALL_ORDERS_SAGA, ordersSagaWorker);
}

export default showAllOrdersSagaWatcher;
