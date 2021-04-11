import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteOrder } from '../../actionCreators/orderAC';
import { DELETE_ORDER_SAGA } from '../../types/orderTypes';

const deleteOrderOnServer = (id) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/${id}`, {
    credentials: 'include',
    method: 'DELETE', 
  })
}


function* orderSagaWorker(action) {
  try {
    const status = yield call(deleteOrderOnServer, action.payload);
    if (status === 200) yield put(deleteOrder());
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* deleteOrderSagaWatcher() {
  yield takeLatest(DELETE_ORDER_SAGA, orderSagaWorker);
}

export default deleteOrderSagaWatcher;
