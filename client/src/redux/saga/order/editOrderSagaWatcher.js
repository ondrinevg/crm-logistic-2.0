import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { editOrder } from '../../actionCreators/orderAC';
import { EDIT_ORDER_SAGA } from '../../types/orderTypes';

const editOrderToServer = ({order, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/${id}`, {
    credentials: 'include',
    method: 'PATCH',
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
    const order = yield call(editOrderToServer, action.payload);
    yield put(editOrder(order));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* editOrderSagaWatcher() {
  yield takeLatest(EDIT_ORDER_SAGA, orderSagaWorker);
}

export default editOrderSagaWatcher;
