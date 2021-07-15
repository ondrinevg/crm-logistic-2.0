import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient } from '../../actionCreators/clientAC';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { ADD_CLIENT_SAGA } from '../../types/clientTypes';

const addClientToServer = async (client) => {
  const response = await fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/new`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });

  return await response.json();
}


function* clientSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const client = yield call(addClientToServer, action.payload);
    yield put(addClient(client));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addClientSagaWatcher() {
  yield takeLatest(ADD_CLIENT_SAGA, clientSagaWorker);
}

export default addClientSagaWatcher;
