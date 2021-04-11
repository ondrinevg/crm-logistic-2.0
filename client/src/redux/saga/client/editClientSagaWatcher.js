import { call, put, takeLatest } from 'redux-saga/effects';
import { editClient } from '../../actionCreators/clientAC';
import { EDIT_CLIENT_SAGA } from '../../types/clientTypes';

const editClientToServer = ({client, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/${id}`, {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(client),
  })
    .then(response => response.json())
}


function* clientSagaWorker(action) {
  try {
    const client = yield call(editClientToServer, action.payload);
    yield put(editClient(client));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* editClientSagaWatcher() {
  yield takeLatest(EDIT_CLIENT_SAGA, clientSagaWorker);
}

export default editClientSagaWatcher;
