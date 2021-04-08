import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_ALL_ORDERS_SAGA } from '../../types/ordersTypes'
import { showAllOrders } from '../../actionCreators/ordersAC'

const getAllOrdersFromServer = () => {
  return fetch(`http://localhost:3002/api/v1/orders/`)
    .then(response => response.json())
};

function* ordersSagaWorker(action) {
  try {
    const orders = yield call(getAllOrdersFromServer, action.payload);
    yield put(showAllOrders(orders));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showAllOrdersSagaWatcher() {
  yield takeLatest(SHOW_ALL_ORDERS_SAGA, ordersSagaWorker);
}

export default showAllOrdersSagaWatcher;
