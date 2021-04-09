import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient } from '../../actionCreators/clientAC';
import { ADD_CLIENT_SAGA } from '../../types/clientTypes';

const addClientToServer = (client) => {
  console.log(1)
  console.log(process.env.REACT_APP_ADDRESS_TO_FETCH)
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/new`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(client),
  })
    .then(response => response.json())
}


function* clientSagaWorker(action) {
  console.log(1)
  try {
    const client = yield call(addClientToServer, action.payload);
    yield put(addClient(client));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addClientSagaWatcher() {
  yield takeLatest(ADD_CLIENT_SAGA, clientSagaWorker);
}

export default addClientSagaWatcher;
