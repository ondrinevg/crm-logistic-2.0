import { call, debounce, put } from 'redux-saga/effects';
import { searchClients } from '../../actionCreators/clientsAC';
import { SEARCH_CLIENTS_SAGA } from '../../types/clientsTypes';

const findClientsFromServer = (text) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/all/`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({text}),
  })
    .then(response => response.json())
}


function* clientSagaWorker(action) {
  try {
    const clients = yield call(findClientsFromServer, action.payload);
    yield put(searchClients(clients));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* searchClientSagaWatcher() {
  yield debounce(400, SEARCH_CLIENTS_SAGA, clientSagaWorker);
}

export default searchClientSagaWatcher;
