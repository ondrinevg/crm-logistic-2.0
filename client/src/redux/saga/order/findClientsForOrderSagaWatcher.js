import { call, put, debounce } from 'redux-saga/effects';
import { findClientsForOrder } from "../../actionCreators/orderAC";
import { FIND_CLIENTS_FOR_NEW_ORDER_SAGA } from "../../types/orderTypes";


const getClientsFromServer = (text) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/all/?lastName=${text}`)
    .then(response => response.json())
}


function* orderSagaWorker(action) {
  try {
    const clients = yield call(getClientsFromServer, action.payload);
    yield put(findClientsForOrder(clients));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* findClientsForOrderSagaWatcher() {
  yield debounce(400, FIND_CLIENTS_FOR_NEW_ORDER_SAGA, orderSagaWorker);
}

export default findClientsForOrderSagaWatcher;
