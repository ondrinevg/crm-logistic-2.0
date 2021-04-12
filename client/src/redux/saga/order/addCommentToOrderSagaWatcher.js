import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { addCommentToOrder } from '../../actionCreators/orderAC'; //
import { ADD_COMMENT_ORDER_SAGA } from '../../types/orderTypes';

const addCommentOrderToServer = ({text, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/${id}/comments`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({text}),
  })
    .then(response => response.json())
}


function* orderSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const order = yield call(addCommentOrderToServer, action.payload);
    yield put(addCommentToOrder(order));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addCommentToOrderSagaWatcher() {
  yield takeLatest(ADD_COMMENT_ORDER_SAGA, orderSagaWorker);
}

export default addCommentToOrderSagaWatcher;
