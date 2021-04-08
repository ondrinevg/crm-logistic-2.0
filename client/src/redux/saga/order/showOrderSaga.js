import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_ORDER_SAGA } from '../../types/orderTypes'
import { showOrder } from '../../actionCreators/orderAC'

const getOrderFromServer = (id) => {
  return fetch(`http://localhost:3002/api/v1/orders/${id}`)
    .then(response => response.json())
}


function* orderSagaWorker(action) {
  try {
    const order = yield call(getOrderFromServer, action.payload);
    yield put(showOrder(order));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showOrderSagaWatcher() {
  yield takeLatest(SHOW_ORDER_SAGA, orderSagaWorker);
}

export default showOrderSagaWatcher
