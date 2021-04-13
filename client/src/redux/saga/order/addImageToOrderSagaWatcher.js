import { call, put, takeLatest } from 'redux-saga/effects';
import { addImageToOrder } from '../../actionCreators/orderAC'; //
import { ADD_IMAGE_ORDER_SAGA } from '../../types/orderTypes';

const addImageOrderToServer = ({url, id, fileName}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/${id}`, {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({url, fileName}),
  })
    .then(response => response.json())
}


function* orderSagaWorker(action) {
  try {
    const order = yield call(addImageOrderToServer, action.payload);
    yield put(addImageToOrder(order));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addImageToOrderSagaWatcher() {
  yield takeLatest(ADD_IMAGE_ORDER_SAGA, orderSagaWorker);
}

export default addImageToOrderSagaWatcher;
