import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_ALL_CLIENTS_SAGA } from '../../types/clientsTypes'
import { showAllClients } from '../../actionCreators/clientsAC'
import { changeLoadStatus } from '../../actionCreators/loadAC';

const getAllClientsFromServer = () => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/`, {
    credentials: "include",
  })
    .then(response => response.json())
};

function* clientsSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const clients = yield call(getAllClientsFromServer, action.payload);
    yield put(showAllClients(clients));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showAllClientsSagaWatcher() {
  yield takeLatest(SHOW_ALL_CLIENTS_SAGA, clientsSagaWorker);
}

export default showAllClientsSagaWatcher;
