import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_ORDER_SAGA } from '../../types/orderTypes'
import { addOrder } from '../../actionCreators/orderAC'

const addOrderToServer = (order) => {
  return fetch(`http://localhost:3002/api/v1/orders/new`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then(response => response.json())
}


function* orderSagaWorker(action) {
  try {
    const order = yield call(addOrderToServer, action.payload);
    yield put(addOrder(order));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addOrderSagaWatcher() {
  yield takeLatest(ADD_ORDER_SAGA, orderSagaWorker);
}

export default addOrderSagaWatcher;
