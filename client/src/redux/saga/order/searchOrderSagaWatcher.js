import { call, debounce, put } from 'redux-saga/effects';
import { searchOrders } from '../../actionCreators/ordersAC';
import { SEARCH_ORDERS_SAGA } from '../../types/ordersTypes';

const findOrdersFromServer = (text) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/orders/all/`, {
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
    const orders = yield call(findOrdersFromServer, action.payload);
    yield put(searchOrders(orders));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* searchOrderSagaWatcher() {
  yield debounce(400, SEARCH_ORDERS_SAGA, orderSagaWorker);
}

export default searchOrderSagaWatcher;
