import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_ORDER_SAGA } from '../../types/orderTypes'
import { addOrder } from '../../actionCreators/orderAC'
import { changeLoadStatus } from '../../actionCreators/loadAC';

const addOrderToServer = (order) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/new`, {
    credentials: 'include',
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
    yield put(changeLoadStatus(true));
    const order = yield call(addOrderToServer, action.payload);
    yield put(addOrder(order));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addOrderSagaWatcher() {
  yield takeLatest(ADD_ORDER_SAGA, orderSagaWorker);
}

export default addOrderSagaWatcher;
