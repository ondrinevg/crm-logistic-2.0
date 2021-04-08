import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_CLIENT_SAGA } from '../../types/clientTypes'
import { showClient } from '../../actionCreators/clientAC'

const getClientFromServer = (id) => {
  return fetch(`http://localhost:3002/api/v1/clients/${id}`)
    .then(response => response.json())
};

function* clientSagaWorker(action) {
  try {
    const client = yield call(getClientFromServer, action.payload);
    yield put(showClient(client));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showClientSagaWatcher() {
  yield takeLatest(SHOW_CLIENT_SAGA, clientSagaWorker);
}

export default showClientSagaWatcher;
