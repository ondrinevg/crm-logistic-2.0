import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_ORDER_SAGA } from '../../types/orderTypes'
import { showOrder } from '../../actionCreators/orderAC'

const getOrderFromServer = (id) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/${id}`, {
    credentials: 'include',
  })
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

export default showOrderSagaWatcher;
